



import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FiPaperclip } from "react-icons/fi";

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  width: 600px;
  max-height: 80%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  /* ✅ FULLSCREEN MOBILE */
  @media (max-width: 428px) {
    width: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: 0;
  }
`;

const Header = styled.div`
  background: #4D148C;
  color: white;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
`;

const Messages = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const MessageBubbleWrapper = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isAdmin ? "flex-end" : "flex-start")};
  margin-bottom: 8px;
`;

const Bubble = styled.div`
  background: ${(props) => (props.isAdmin ? "#4D148C" : "#eee")};
  color: ${(props) => (props.isAdmin ? "white" : "black")};
  padding: 8px 12px;
  border-radius: 15px;
  max-width: 70%;
`;

const InputBox = styled.div`
  border-top: 1px solid #ddd;
  padding: 5px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
`;

const Button = styled.button`
  background: #4D148C;
  color: white;
  border: none;
  padding: 10px;
`;

const FileButton = styled.label`
  background: #4D148C;
  color: white;
  padding: 8px;
  margin-right: 8px;
  border-radius: 6px;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #eee;
  border-radius: 3px;

  div {
    height: 100%;
    background: #4D148C;
    width: ${(props) => props.progress}%;
    transition: width 0.2s;
  }
`;



const PreviewWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 6px;
`;

const RemoveButton = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  background: #ff4d4f;
  color: white;
  width: 18px;
  height: 18px;
  font-size: 12px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.85;

  &:hover {
    opacity: 1;
  }
`;




const AdminChatModal = ({ adminId, chat, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
const [viewer, setViewer] = useState({
  open: false,
  url: "",
  type: "",
});



  const messagesEndRef = useRef(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  // useEffect(() => {
  //   const chatRef = doc(db, "chats", chat.chatId);
  //   const unsub = onSnapshot(chatRef, (snap) => {
  //     const data = snap.data();
  //     setMessages(data?.messages || []);
  //     scrollToBottom();
  //   });

  //   return unsub;
  // }, [chat]);


useEffect(() => {
  if (!chat?.chatId) return;

  const chatRef = doc(db, "chats", chat.chatId);

  const unsub = onSnapshot(chatRef, (snap) => {
    const data = snap.data();
    setMessages(data?.messages || []);
  });

  return () => unsub();
}, [chat?.chatId]);

// separate scroll effect (cleaner)
useEffect(() => {
  scrollToBottom();
}, [messages]);


  // FILE SELECT
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 25 * 1024 * 1024) {
      alert("Max file size is 25MB");
      return;
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  // SAFE IMAGE COMPRESSION
  const compressImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const scale = Math.min(800 / img.width, 1);

          canvas.width = img.width * scale;
          canvas.height = img.height * scale;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          canvas.toBlob((blob) => resolve(blob || file), "image/jpeg", 0.7);
        };
      };
      reader.readAsDataURL(file);
    });
  };

  // UPLOAD (AUTO FORMAT)
  const uploadFile = async (file) => {
    const data = new FormData();
    let uploadData = file;

    if (file.type.includes("image")) {
      try {
        uploadData = await compressImage(file);
      } catch {
        uploadData = file;
      }
    }

    data.append("file", uploadData);
    data.append("upload_preset", "fedclone");
    data.append("resource_type", "auto");

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.cloudinary.com/v1_1/deeqakcdx/upload");

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      xhr.onload = () => {
        setUploadProgress(0);
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.response).secure_url);
        } else reject();
      };

      xhr.onerror = reject;
      xhr.send(data);
    });
  };

  const sendMessage = async () => {
    if (!text.trim() && !file) return;

    let attachmentUrl = null;

    try {
      if (file) {
        attachmentUrl = await uploadFile(file);
      }
    } catch {
      alert("Upload failed");
      return;
    }

    const newMessage = {
      id: adminId,
      message: text,
      attachment: attachmentUrl,
      type: file
        ? file.type.includes("image")
          ? "image"
          : file.type.includes("video")
          ? "video"
          : "file"
        : "text",
      time: new Date().toISOString(),
    };

    await updateDoc(doc(db, "chats", chat.chatId), {
      messages: arrayUnion(newMessage),
    });

    setText("");
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <Header>
          <h3>Chat with {chat.user?.name}</h3>
          <button onClick={onClose}>✖</button>
        </Header>

        <Messages>
          {messages.map((msg, i) => (
            <MessageBubbleWrapper key={i} isAdmin={msg.id === adminId}>
              <Bubble isAdmin={msg.id === adminId}>
                {msg.message && <p>{msg.message}</p>}

                {msg.type === "image" && (
                <img
  src={msg.attachment}
  alt=""
  onClick={() =>
    setViewer({ open: true, url: msg.attachment, type: "image" })
  }
  style={{
    maxWidth: "100%",
    width: "180px",
    borderRadius: "10px",
    cursor: "pointer",
  }}
/>
                )}

                {msg.type === "video" && (
                  <video
  onClick={() =>
    setViewer({ open: true, url: msg.attachment, type: "video" })
  }
  style={{
    maxWidth: "100%",
    width: "180px",
    borderRadius: "10px",
    cursor: "pointer",
  }}
>
  <source src={msg.attachment} />
</video>
                )}
              </Bubble>
            </MessageBubbleWrapper>
          ))}
          <div ref={messagesEndRef} />
        </Messages>

        <InputBox>
          {/* {previewUrl && (
            <>
              {uploadProgress > 0 && (
                <ProgressBar progress={uploadProgress}>
                  <div />
                </ProgressBar>
              )}

              {file?.type.includes("image") && (
                <img src={previewUrl} style={{ width: "60px" }} />
              )}

              {file?.type.includes("video") && (
                <video src={previewUrl} style={{ width: "60px" }} />
              )}
            </>
          )} */}

{previewUrl && (
  <PreviewWrapper>
    {/* ❌ CANCEL BUTTON */}
    <RemoveButton
      onClick={() => {
        setFile(null);
        setPreviewUrl(null);
      }}
    >
      ×
    </RemoveButton>

    {uploadProgress > 0 && (
      <ProgressBar progress={uploadProgress}>
        <div />
      </ProgressBar>
    )}

    {file?.type.includes("image") && (
      <img
        src={previewUrl}
        alt=""
        style={{ width: "60px", borderRadius: "6px" }}
      />
    )}

    {file?.type.includes("video") && (
      <video
        src={previewUrl}
        style={{ width: "60px", borderRadius: "6px" }}
      />
    )}
  </PreviewWrapper>
)}
          <Row>
            <FileButton>
              <FiPaperclip />
              <FileInput type="file" onChange={handleFileChange} />
            </FileButton>

            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <Button onClick={sendMessage}>Send</Button>
          </Row>
        </InputBox>
      </ModalContainer>

      {viewer.open && (
  <div
    onClick={() => setViewer({ open: false })}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.95)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000,
    }}
  >
    {viewer.type === "image" ? (
      <img
        src={viewer.url}
        alt=""
        style={{ maxWidth: "95%", maxHeight: "95%" }}
      />
    ) : (
      <video
        src={viewer.url}
        controls
        autoPlay
        style={{ maxWidth: "95%", maxHeight: "95%" }}
      />
    )}
  </div>
)}
    </ModalOverlay>
  );
};

export default AdminChatModal;