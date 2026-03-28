

// import React, { useState, useEffect, useRef, useContext } from "react";
// import styled from "styled-components";
// import { db, auth } from "../firebaseConfig";
// import Swal from 'sweetalert2'
// import { FiPaperclip } from "react-icons/fi";
// import {
//   doc,
//   getDoc,
//   setDoc,
//   updateDoc,
//   arrayUnion,
//   serverTimestamp,
//   getDocs,
//   collection,
//   query,
//   where
// } from "firebase/firestore";
// import { signOut } from "firebase/auth";
// import { Context } from "./Context";

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100%;
// `;

// const Header = styled.div`
//   background: #4D148C;
//   color: white;
//   padding: 10px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border-radius: 15px;
//   margin-bottom: 5px;

//   h3, h5 {
//     margin: 0;
//   }

//   button {
//     background: white;
//     color: #4D148C;
//     border: none;
//     padding: 5px 10px;
//     border-radius: 6px;
//     cursor: pointer;
//     font-weight: bold;

//     &:hover {
//       background: #eee;
//     }
//   }
// `;

// const Messages = styled.div`
//   flex: 1;
//   padding: 10px;
//   overflow-y: auto;
//   display: flex;
//   flex-direction: column;
// `;

// const MessageBubbleWrapper = styled.div`
//   display: flex;
//   justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
//   margin-bottom: 8px;
// `;

// const Bubble = styled.div`
//   background: ${(props) => (props.isUser ? "#4D148C" : "#eee")};
//   color: ${(props) => (props.isUser ? "white" : "black")};
//   padding: 8px 12px;
//   border-radius: 15px;
//   max-width: 70%;
//   word-break: break-word;
//   font-size: 14px;
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
// `;

// const Button = styled.button`
//   background: #4D148C;
//   color: white;
//   border: none;
//   padding: 10px 15px;
//   cursor: pointer;

//   &:hover {
//     background: #3b0f85;
//   }
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

// const ChatWindow = ({ user, setUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [chatId, setChatId] = useState(user.chatId || null);
//   const messagesEndRef = useRef(null);
//   const { setOpenChatModal } = useContext(Context);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // Fetch chat if exists
//   useEffect(() => {
//     const fetchChat = async () => {
//       if (!chatId) {
//         const q = query(collection(db, "chats"), where("userId", "==", user.uid));
//         const snap = await getDocs(q);

//         if (!snap.empty) {
//           const docData = snap.docs[0].data();
//           setChatId(snap.docs[0].id);
//           setMessages(docData.messages || []);
//         }
//       } else {
//         const docRef = doc(db, "chats", chatId);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setMessages(docSnap.data().messages || []);
//         }
//       }
//     };

//     fetchChat();
//   }, [chatId, user.uid]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleLogout = async () => {
//     await signOut(auth);
//     setUser(null);
//   };




//   const [file, setFile] = useState(null);
// const [previewUrl, setPreviewUrl] = useState(null);

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
//   if (file) {
//     Swal.fire({ title: "Uploading...", didOpen: () => Swal.showLoading() });
//     attachmentUrl = await uploadFile(file);
//     Swal.close();
//   }

//   const newMessage = {
//     id: user.uid, // or adminId
//     message: text,
//     attachment: attachmentUrl,
//     type: file?.type.startsWith("image/") ? "image" : file?.type.startsWith("video/") ? "video" : "text",
//     time: new Date().toISOString(),
//   };

//   const chatRef = doc(db, "chats", chatId);
//   await updateDoc(chatRef, { messages: arrayUnion(newMessage) });

//   setMessages(prev => [...prev, newMessage]);
//   setText("");
//   setFile(null);
//   setPreviewUrl(null);
// };




//   return (
//     <Wrapper>
//       <Header>
//         <h3>Customer Care</h3>
//         <button onClick={() => setOpenChatModal(false)}>Close</button>
//       </Header>
//       <Header>
//         <h5>Hello, {user.name || "Customer"}</h5>
//         <button onClick={handleLogout}>Logout</button>
//       </Header>

//       <Messages>
//         {messages
//           .sort((a, b) => new Date(a.time) - new Date(b.time))
//           .map((msg, i) => (
//             <MessageBubbleWrapper
//               key={i}
//               isUser={msg.id === user.uid}
//             >
//               {/* <Bubble isUser={msg.id === user.uid}>{msg.message}</Bubble> */}

//               <Bubble isUser={msg.id === user.uid}>
//   {msg.message && <p>{msg.message}</p>}

//   {msg.type === "image" && (
//     <img src={msg.attachment} alt="sent" style={{ maxWidth: "200px", borderRadius: "10px" }} />
//   )}

//   {msg.type === "video" && (
//     <video controls style={{ maxWidth: "200px", borderRadius: "10px" }}>
//       <source src={msg.attachment} type="video/mp4" />
//     </video>
//   )}
// </Bubble>
//             </MessageBubbleWrapper>
//           ))}
//         <div ref={messagesEndRef} />
//       </Messages>



// <InputBox>
//   {/* File preview */}
// {previewUrl && (
//   <div style={{ padding: "8px", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "5px" }}>
//     {uploadProgress > 0 && (
//       <div style={{ width: "100%", marginBottom: "5px", height: "6px", background: "#eee", borderRadius: "3px" }}>
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

//     {file.type.startsWith("image/") && (
//       <img
//         src={previewUrl}
//         alt="preview"
//         style={{ maxWidth: "50px", borderRadius: "10px", objectFit: "cover" }}
//       />
//     )}
//     {file.type.startsWith("video/") && (
//       <video
//         controls
//         src={previewUrl}
//         style={{ maxWidth: "50px", borderRadius: "10px", objectFit: "cover" }}
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


//     </Wrapper>
//   );
// };

// export default ChatWindow;







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
  where
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

  useEffect(() => {
    const fetchChat = async () => {
      const q = query(collection(db, "chats"), where("userId", "==", user.uid));
      const snap = await getDocs(q);

      if (!snap.empty) {
        const docData = snap.docs[0].data();
        setChatId(snap.docs[0].id);
        setMessages(docData.messages || []);
      }
    };

    fetchChat();
  }, [user.uid]);

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

    setMessages((prev) => [...prev, newMessage]);
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
    </Wrapper>
  );
};

export default ChatWindow;