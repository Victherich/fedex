


import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { db, auth } from "../firebaseConfig";
import { FiPaperclip } from "react-icons/fi";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  collection,
  query,
  where,setDoc,onSnapshot
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Context } from "./Context";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  background: #4D148C;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Messages = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  // justify-content:flex-end;
  
`;

const MessageBubbleWrapper = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  margin-bottom: 8px;
`;

const Bubble = styled.div`
  background: ${(props) => (props.isUser ? "#4D148C" : "#eee")};
  color: ${(props) => (props.isUser ? "white" : "black")};
  padding: 8px 12px;
  border-radius: 15px;
  max-width: 70%;
  word-break: break-word;
  font-size: 14px;
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
  cursor: pointer;
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
  margin-top: 5px;

  div {
    height: 100%;
    background: #4D148C;
    width: ${(props) => props.progress}%;
    transition: width 0.2s;
  }
`;

const ChatWindow = ({ user, setUser }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [chatId, setChatId] = useState(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const messagesEndRef = useRef(null);
  const { setOpenChatModal } = useContext(Context);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [viewer, setViewer] = useState({
  open: false,
  url: "",
  type: "",
});

  // useEffect(() => {
  //   const fetchChat = async () => {
  //     const q = query(collection(db, "chats"), where("userId", "==", user.uid));
  //     const snap = await getDocs(q);

  //     if (!snap.empty) {
  //       const docData = snap.docs[0].data();
  //       setChatId(snap.docs[0].id);
  //       setMessages(docData.messages || []);
  //     }
  //   };

  //   fetchChat();
  // }, [user.uid]);



  
  // 🔹 FETCH OR CREATE CHAT
  
  
  
  // useEffect(() => {
  //   const initChat = async () => {
  //     const q = query(
  //       collection(db, "chats"),
  //       where("userId", "==", user.uid)
  //     );

  //     const snap = await getDocs(q);

  //     if (!snap.empty) {
  //       const docData = snap.docs[0];
  //       setChatId(docData.id);
  //       setMessages(docData.data().messages || []);
  //     } else {
  //       // CREATE CHAT IF NOT EXISTS
  //       const newRef = doc(collection(db, "chats"));

  //       await setDoc(newRef, {
  //         userId: user.uid,
  //         messages: [],
  //       });

  //       setChatId(newRef.id);
  //       setMessages([]);
  //     }
  //   };

  //   if (user?.uid) initChat();
  // }, [user]);


useEffect(() => {
  if (!chatId) return;

  const unsubscribe = onSnapshot(doc(db, "chats", chatId), (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      setMessages(data.messages || []);
    }
  });

  return () => unsubscribe(); // cleanup
}, [chatId]);






  const creatingRef = useRef(false);

useEffect(() => {
  const initChat = async () => {
    if (creatingRef.current) return; // ✅ prevent duplicate calls
    creatingRef.current = true;

    const q = query(
      collection(db, "chats"),
      where("userId", "==", user.uid)
    );

    const snap = await getDocs(q);

    if (!snap.empty) {
      const docData = snap.docs[0];
      setChatId(docData.id);
      setMessages(docData.data().messages || []);
      creatingRef.current = false;
      return;
    }

    // ✅ create only once
    const newRef = doc(collection(db, "chats"));

    await setDoc(newRef, {
      userId: user.uid,
      messages: [],
    });

    setChatId(newRef.id);
    setMessages([]);

    creatingRef.current = false;
  };

  if (user?.uid) initChat();
}, [user]);






  useEffect(() => scrollToBottom(), [messages]);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

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
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob((blob) => resolve(blob || file), "image/jpeg", 0.7);
        };
      };
      reader.readAsDataURL(file);
    });
  };

  // UPLOAD
  const uploadFile = async (file) => {
    const data = new FormData();
    const isImage = file.type.includes("image");

    let uploadFileData = file;

    if (isImage) {
      try {
        uploadFileData = await compressImage(file);
      } catch {
        uploadFileData = file;
      }
    }

    data.append("file", uploadFileData);
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
      id: user.uid,
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

    await updateDoc(doc(db, "chats", chatId), {
      messages: arrayUnion(newMessage),
    });

    // setMessages((prev) => [...prev, newMessage]);
    setText("");
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <Wrapper>
      <Header>
        <h3>Customer Care</h3>
        <button onClick={() => setOpenChatModal(false)}>Close</button>
      </Header>

      <Header>
        <h5>Hello, {user.name || "Customer"}</h5>
        <button onClick={handleLogout}>Logout</button>
      </Header>

      <Messages>
        {messages.map((msg, i) => (
          <MessageBubbleWrapper key={i} isUser={msg.id === user.uid}>
            <Bubble isUser={msg.id === user.uid}>
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
        {previewUrl && (
          <div>
            {uploadProgress > 0 && <ProgressBar progress={uploadProgress}><div /></ProgressBar>}

            {file?.type.includes("image") && (
              <img src={previewUrl} alt="" style={{ width: "60px" }} />
            )}

            {file?.type.includes("video") && (
              <video src={previewUrl} style={{ width: "60px" }} />
            )}
          </div>
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
          />

          <Button onClick={sendMessage}>Send</Button>
        </Row>
      </InputBox>




      {viewer.open && (
  <div
    onClick={() => setViewer({ open: false })}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
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
    </Wrapper>
  );
};

export default ChatWindow;




