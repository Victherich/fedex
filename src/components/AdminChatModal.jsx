



// import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";
// import { doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
// import { db } from "../firebaseConfig";
// import Swal from 'sweetalert2'
// import { FiPaperclip } from "react-icons/fi";

// const ModalOverlay = styled.div`
//   position: fixed;
//   inset: 0;
//   background: rgba(0,0,0,0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;

// `;

// const ModalContainer = styled.div`
//   background: white;
//   width: 600px;
//   max-height: 80%;
//   border-radius: 10px;
//   display: flex;
//   flex-direction: column;
//   overflow: hidden;





// `;

// const Header = styled.div`
//   background: #4D148C;
//   color: white;
//   padding: 12px 16px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const Messages = styled.div`
//   flex: 1;
//   padding: 10px;
//   overflow-y: auto;
//   display: flex;
//   flex-direction: column;
//   background: #fafafa;
// `;

// const MessageBubbleWrapper = styled.div`
//   display: flex;
//   justify-content: ${(props) => (props.isAdmin ? "flex-end" : "flex-start")};
//   margin-bottom: 8px;
// `;

// const Bubble = styled.div`
//   background: ${(props) => (props.isAdmin ? "#4D148C" : "#eee")};
//   color: ${(props) => (props.isAdmin ? "white" : "black")};
//   padding: 8px 12px;
//   border-radius: 15px;
//   max-width: 70%;
//   word-break: break-word;
// `;

// const InputBox = styled.div`
//   display: flex;
//   border-top: 1px solid #ddd;
//   align-items: center;
//   flex-direction:column;
// `;

// const Input = styled.input`
//   flex: 1;
//   padding: 10px;
//   border: none;
//   outline: none;
// // min-width:200px;
// `;

// const Button = styled.button`
//   background: #4D148C;
//   color: white;
//   border: none;
//   padding: 10px 16px;
//   cursor: pointer;
//   &:hover { background: #3b0f85; }
// `;



// const FileButton = styled.label`
//   background: #4D148C;
//   color: white;
//   padding: 8px 12px;
//   margin-right: 8px;
//   border-radius: 6px;
//   cursor: pointer;
//   font-size: 14px;

//   &:hover { background: #3b0f85; }
// `;

// const FileInput = styled.input`
//   display: none;
// `;

// const AdminChatModal = ({ adminId, chat, onClose }) => {
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const messagesEndRef = useRef(null);
//   const [file, setFile] = useState(null);
// const [previewUrl, setPreviewUrl] = useState(null);
// const [uploadProgress, setUploadProgress] = useState(0);

//   const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

//   useEffect(() => {
//     const chatRef = doc(db, "chats", chat.chatId);
//     const unsub = onSnapshot(chatRef, (snap) => {
//       const data = snap.data();
//       setMessages(data.messages || []);
//       scrollToBottom();
//     });
//     return unsub;
//   }, [chat]);

// //   const sendMessage = async () => {
// //     if (!text.trim()) return;
// //     const chatRef = doc(db, "chats", chat.chatId);
// //     const newMessage = { id: adminId, message: text, time: new Date().toISOString() };
// //     await updateDoc(chatRef, { messages: arrayUnion(newMessage) });
// //     setText("");
// //   };






// const handleFileChange = (e) => {
//   const selectedFile = e.target.files[0];
//   if (!selectedFile) return;

//   const isImage = selectedFile.type.startsWith("image/");
//   const isVideo = selectedFile.type.startsWith("video/");

//   if (isVideo && selectedFile.size > 20 * 1024 * 1024) {
//     return Swal.fire({
//       icon: "error",
//       title: "File too large",
//       text: "Maximum allowed video size is 20MB",
//     });
//   }

//   setFile(selectedFile);
//   setPreviewUrl(URL.createObjectURL(selectedFile));
// };





// const compressImage = async (file, maxSizeKB = 100) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const img = document.createElement("img");
//       img.src = e.target.result;

//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         const MAX_WIDTH = 800;
//         const scale = img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1;

//         canvas.width = img.width * scale;
//         canvas.height = img.height * scale;

//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//         let quality = 0.7;
//         const compressLoop = () => {
//           canvas.toBlob(
//             (blob) => {
//               if (!blob) return reject("Compression failed");
//               if (blob.size / 1024 <= maxSizeKB || quality <= 0.1) resolve(blob);
//               else { quality -= 0.1; compressLoop(); }
//             },
//             "image/jpeg",
//             quality
//           );
//         };
//         compressLoop();
//       };
//       img.onerror = () => reject("Image load failed");
//     };
//     reader.onerror = () => reject("File reading failed");
//     reader.readAsDataURL(file);
//   });
// };





// // const uploadFile = async (file) => {
// //   const data = new FormData();
// //   const isImage = file.type.startsWith("image/");
// //   const isVideo = file.type.startsWith("video/");

// //   if (isImage) {
// //     const compressedBlob = await compressImage(file, 100);
// //     data.append("file", compressedBlob, "chat.jpg");
// //     data.append("upload_preset", "fmc_global");
// //     data.append("folder", "chat_images");

// //     const res = await fetch("https://api.cloudinary.com/v1_1/dyo31jpty/image/upload", {
// //       method: "POST",
// //       body: data,
// //     });
// //     const result = await res.json();
// //     return result.secure_url;
// //   }

// //   if (isVideo) {
// //     data.append("file", file);
// //     data.append("upload_preset", "fmc_global");
// //     data.append("folder", "chat_videos");

// //     return new Promise((resolve, reject) => {
// //       const xhr = new XMLHttpRequest();
// //       xhr.open("POST", "https://api.cloudinary.com/v1_1/dyo31jpty/video/upload");
// //       xhr.onload = () => {
// //         if (xhr.status === 200) resolve(JSON.parse(xhr.response).secure_url);
// //         else reject("Upload failed");
// //       };
// //       xhr.onerror = () => reject("Upload error");
// //       xhr.send(data);
// //     });
// //   }
// // };


// const uploadFile = async (file) => {
//   const data = new FormData();
//   const isImage = file.type.startsWith("image/");
//   const isVideo = file.type.startsWith("video/");

//   if (isImage) {
//     const compressedBlob = await compressImage(file, 100);
//     data.append("file", compressedBlob, "chat.jpg");
//     data.append("upload_preset", "fedclone");
//     data.append("folder", "chat_images");

//     // Use XMLHttpRequest to track image progress
//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.open("POST", "https://api.cloudinary.com/v1_1/deeqakcdx/image/upload");

//       xhr.upload.onprogress = (event) => {
//         if (event.lengthComputable) {
//           const percent = Math.round((event.loaded / event.total) * 100);
//           setUploadProgress(percent);
//         }
//       };

//       xhr.onload = () => {
//         setUploadProgress(0); // reset
//         if (xhr.status === 200) resolve(JSON.parse(xhr.response).secure_url);
//         else reject("Upload failed");
//       };
//       xhr.onerror = () => reject("Upload error");

//       xhr.send(data);
//     });
//   }

//   if (isVideo) {
//     data.append("file", file);
//     data.append("upload_preset", "fedclone");
//     data.append("folder", "chat_videos");

//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.open("POST", "https://api.cloudinary.com/v1_1/deeqakcdx/video/upload");

//       xhr.upload.onprogress = (event) => {
//         if (event.lengthComputable) {
//           const percent = Math.round((event.loaded / event.total) * 100);
//           setUploadProgress(percent);
//         }
//       };

//       xhr.onload = () => {
//         setUploadProgress(0);
//         if (xhr.status === 200) resolve(JSON.parse(xhr.response).secure_url);
//         else reject("Upload failed");
//       };
//       xhr.onerror = () => reject("Upload error");

//       xhr.send(data);
//     });
//   }
// };




// const sendMessage = async () => {
//   if (!text.trim() && !file) return;

//   let attachmentUrl = null;
//   let type = "text";

//   if (file) {
//     attachmentUrl = await uploadFile(file);
//     type = file.type.startsWith("image/") ? "image" : "video";
//   }

//   const newMessage = {
//     id: adminId, // ✅ FIXED
//     message: text,
//     attachment: attachmentUrl,
//     type,
//     time: new Date().toISOString(),
//   };

//   const chatRef = doc(db, "chats", chat.chatId); // ✅ FIXED
//   await updateDoc(chatRef, { messages: arrayUnion(newMessage) });

//   setText("");
//   setFile(null);
//   setPreviewUrl(null);
//   setUploadProgress(0);
// };





//   return (
//     <ModalOverlay>
//       <ModalContainer>
//         <Header>
//           <h3>Chat with {chat.user?.name}</h3>
//           <button
//             onClick={onClose}
//             style={{ color: "#fff", background: "transparent", border: "none", fontSize: "16px", cursor: "pointer" }}
//           >
//             ✖
//           </button>
//         </Header>

//         <Messages>
//           {messages
//             .sort((a, b) => new Date(a.time) - new Date(b.time))
//             .map((msg, i) => (
//           <MessageBubbleWrapper key={i} isAdmin={msg.id === adminId}>
//   <Bubble isAdmin={msg.id === adminId}>
//     {msg.message && <p>{msg.message}</p>}

//     {msg.type === "image" && (
//       <img src={msg.attachment} alt="sent" style={{ maxWidth: "200px", borderRadius: "10px" }} />
//     )}

//     {msg.type === "video" && (
//       <video controls style={{ maxWidth: "200px", borderRadius: "10px" }}>
//         <source src={msg.attachment} type="video/mp4" />
//       </video>
//     )}
//   </Bubble>
// </MessageBubbleWrapper>
//             ))}
//           <div ref={messagesEndRef} />
//         </Messages>

//         {/* <InputBox>
//           <Input
//             placeholder="Type a message..."
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <Button onClick={sendMessage}>Send</Button>
//         </InputBox> */}


// <InputBox>
//   {/* File preview */}
// {previewUrl && file && (
//   <div style={{
//     padding: "8px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     width: "100%"
//   }}>

//     {/* Progress bar */}
//     {uploadProgress > 0 && (
//       <div style={{
//         width: "100%",
//         marginBottom: "6px",
//         height: "6px",
//         background: "#eee",
//         borderRadius: "3px"
//       }}>
//         <div
//           style={{
//             width: `${uploadProgress}%`,
//             height: "100%",
//             background: "#4D148C",
//             borderRadius: "3px",
//             transition: "width 0.2s"
//           }}
//         />
//       </div>
//     )}

//     {/* Preview */}
//     {file.type.startsWith("image/") && (
//       <img
//         src={previewUrl}
//         alt="preview"
//         style={{ maxWidth: "50px", borderRadius: "10px" }}
//       />
//     )}

//     {file.type.startsWith("video/") && (
//       <video
//         controls
//         src={previewUrl}
//         style={{ maxWidth: "50px", borderRadius: "10px" }}
//       />
//     )}
//   </div>
// )}
// <div>
  
//   {/* File selector */}
//   <FileButton>
//     {/* 📎 Attach */}
//      <FiPaperclip style={{ marginRight: "6px" }} />
//     <FileInput type="file" accept="image/*,video/*" onChange={handleFileChange} />
//   </FileButton>

//   {/* Text input */}
//   <Input
//     placeholder="Type a message..."
//     value={text}
//     onChange={(e) => setText(e.target.value)}
//     onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//   />

//   {/* Send button */}
//   <Button onClick={sendMessage}>Send</Button>
// </div>
// </InputBox>



//       </ModalContainer>
//     </ModalOverlay>
//   );
// };

// export default AdminChatModal;







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

const AdminChatModal = ({ adminId, chat, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const chatRef = doc(db, "chats", chat.chatId);
    const unsub = onSnapshot(chatRef, (snap) => {
      const data = snap.data();
      setMessages(data?.messages || []);
      scrollToBottom();
    });

    return unsub;
  }, [chat]);

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
                    style={{ maxWidth: "100%", width: "180px", borderRadius: "10px" }}
                  />
                )}

                {msg.type === "video" && (
                  <video
                    controls
                    playsInline
                    style={{ maxWidth: "100%", width: "180px", borderRadius: "10px" }}
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
    </ModalOverlay>
  );
};

export default AdminChatModal;