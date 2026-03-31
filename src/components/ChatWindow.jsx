


// import React, { useState, useEffect, useRef, useContext } from "react";
// import styled from "styled-components";
// import { db, auth } from "../firebaseConfig";
// import { FiPaperclip } from "react-icons/fi";
// import {
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   getDocs,
//   collection,
//   query,
//   where,setDoc
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
// `;

// const Messages = styled.div`
//   flex: 1;
//   padding: 10px;
//   overflow-y: auto;
//   display: flex;
//   flex-direction: column;
//   // justify-content:flex-end;
  
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
//   border-top: 1px solid #ddd;
//   padding: 5px;
// `;

// const Row = styled.div`
//   display: flex;
//   align-items: center;
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
//   padding: 10px;
//   cursor: pointer;
// `;

// const FileButton = styled.label`
//   background: #4D148C;
//   color: white;
//   padding: 8px;
//   margin-right: 8px;
//   border-radius: 6px;
//   cursor: pointer;
// `;

// const FileInput = styled.input`
//   display: none;
// `;

// const ProgressBar = styled.div`
//   width: 100%;
//   height: 6px;
//   background: #eee;
//   border-radius: 3px;
//   margin-top: 5px;

//   div {
//     height: 100%;
//     background: #4D148C;
//     width: ${(props) => props.progress}%;
//     transition: width 0.2s;
//   }
// `;

// const ChatWindow = ({ user, setUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [chatId, setChatId] = useState(null);
//   const [file, setFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const messagesEndRef = useRef(null);
//   const { setOpenChatModal } = useContext(Context);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // useEffect(() => {
//   //   const fetchChat = async () => {
//   //     const q = query(collection(db, "chats"), where("userId", "==", user.uid));
//   //     const snap = await getDocs(q);

//   //     if (!snap.empty) {
//   //       const docData = snap.docs[0].data();
//   //       setChatId(snap.docs[0].id);
//   //       setMessages(docData.messages || []);
//   //     }
//   //   };

//   //   fetchChat();
//   // }, [user.uid]);



  
//   // 🔹 FETCH OR CREATE CHAT
  
  
  
//   // useEffect(() => {
//   //   const initChat = async () => {
//   //     const q = query(
//   //       collection(db, "chats"),
//   //       where("userId", "==", user.uid)
//   //     );

//   //     const snap = await getDocs(q);

//   //     if (!snap.empty) {
//   //       const docData = snap.docs[0];
//   //       setChatId(docData.id);
//   //       setMessages(docData.data().messages || []);
//   //     } else {
//   //       // CREATE CHAT IF NOT EXISTS
//   //       const newRef = doc(collection(db, "chats"));

//   //       await setDoc(newRef, {
//   //         userId: user.uid,
//   //         messages: [],
//   //       });

//   //       setChatId(newRef.id);
//   //       setMessages([]);
//   //     }
//   //   };

//   //   if (user?.uid) initChat();
//   // }, [user]);




//   const creatingRef = useRef(false);

// useEffect(() => {
//   const initChat = async () => {
//     if (creatingRef.current) return; // ✅ prevent duplicate calls
//     creatingRef.current = true;

//     const q = query(
//       collection(db, "chats"),
//       where("userId", "==", user.uid)
//     );

//     const snap = await getDocs(q);

//     if (!snap.empty) {
//       const docData = snap.docs[0];
//       setChatId(docData.id);
//       setMessages(docData.data().messages || []);
//       creatingRef.current = false;
//       return;
//     }

//     // ✅ create only once
//     const newRef = doc(collection(db, "chats"));

//     await setDoc(newRef, {
//       userId: user.uid,
//       messages: [],
//     });

//     setChatId(newRef.id);
//     setMessages([]);

//     creatingRef.current = false;
//   };

//   if (user?.uid) initChat();
// }, [user]);






//   useEffect(() => scrollToBottom(), [messages]);

//   const handleLogout = async () => {
//     await signOut(auth);
//     setUser(null);
//   };

//   // FILE SELECT
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) return;

//     if (selectedFile.size > 25 * 1024 * 1024) {
//       alert("Max file size is 25MB");
//       return;
//     }

//     setFile(selectedFile);
//     setPreviewUrl(URL.createObjectURL(selectedFile));
//   };

//   // SAFE IMAGE COMPRESSION
//   const compressImage = async (file) => {
//     return new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const img = new Image();
//         img.src = e.target.result;

//         img.onload = () => {
//           const canvas = document.createElement("canvas");
//           const scale = Math.min(800 / img.width, 1);

//           canvas.width = img.width * scale;
//           canvas.height = img.height * scale;

//           const ctx = canvas.getContext("2d");
//           ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//           canvas.toBlob((blob) => resolve(blob || file), "image/jpeg", 0.7);
//         };
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   // UPLOAD
//   const uploadFile = async (file) => {
//     const data = new FormData();
//     const isImage = file.type.includes("image");

//     let uploadFileData = file;

//     if (isImage) {
//       try {
//         uploadFileData = await compressImage(file);
//       } catch {
//         uploadFileData = file;
//       }
//     }

//     data.append("file", uploadFileData);
//     data.append("upload_preset", "fedclone");
//     data.append("resource_type", "auto");

//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.open("POST", "https://api.cloudinary.com/v1_1/deeqakcdx/upload");

//       xhr.upload.onprogress = (e) => {
//         if (e.lengthComputable) {
//           setUploadProgress(Math.round((e.loaded / e.total) * 100));
//         }
//       };

//       xhr.onload = () => {
//         setUploadProgress(0);
//         if (xhr.status === 200) {
//           resolve(JSON.parse(xhr.response).secure_url);
//         } else reject();
//       };

//       xhr.onerror = reject;
//       xhr.send(data);
//     });
//   };

//   const sendMessage = async () => {
//     if (!text.trim() && !file) return;

//     let attachmentUrl = null;

//     try {
//       if (file) {
//         attachmentUrl = await uploadFile(file);
//       }
//     } catch {
//       alert("Upload failed");
//       return;
//     }

//     const newMessage = {
//       id: user.uid,
//       message: text,
//       attachment: attachmentUrl,
//       type: file
//         ? file.type.includes("image")
//           ? "image"
//           : file.type.includes("video")
//           ? "video"
//           : "file"
//         : "text",
//       time: new Date().toISOString(),
//     };

//     await updateDoc(doc(db, "chats", chatId), {
//       messages: arrayUnion(newMessage),
//     });

//     setMessages((prev) => [...prev, newMessage]);
//     setText("");
//     setFile(null);
//     setPreviewUrl(null);
//   };

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
//         {messages.map((msg, i) => (
//           <MessageBubbleWrapper key={i} isUser={msg.id === user.uid}>
//             <Bubble isUser={msg.id === user.uid}>
//               {msg.message && <p>{msg.message}</p>}

//               {msg.type === "image" && (
//                 <img
//                   src={msg.attachment}
//                   alt=""
//                   style={{ maxWidth: "100%", width: "180px", borderRadius: "10px" }}
//                 />
//               )}

//               {msg.type === "video" && (
//                 <video
//                   controls
//                   playsInline
//                   style={{ maxWidth: "100%", width: "180px", borderRadius: "10px" }}
//                 >
//                   <source src={msg.attachment} />
//                 </video>
//               )}
//             </Bubble>
//           </MessageBubbleWrapper>
//         ))}
//         <div ref={messagesEndRef} />
//       </Messages>

//       <InputBox>
//         {previewUrl && (
//           <div>
//             {uploadProgress > 0 && <ProgressBar progress={uploadProgress}><div /></ProgressBar>}

//             {file?.type.includes("image") && (
//               <img src={previewUrl} alt="" style={{ width: "60px" }} />
//             )}

//             {file?.type.includes("video") && (
//               <video src={previewUrl} style={{ width: "60px" }} />
//             )}
//           </div>
//         )}

//         <Row>
//           <FileButton>
//             <FiPaperclip />
//             <FileInput type="file" onChange={handleFileChange} />
//           </FileButton>

//           <Input
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Type message..."
//           />

//           <Button onClick={sendMessage}>Send</Button>
//         </Row>
//       </InputBox>
//     </Wrapper>
//   );
// };

// export default ChatWindow;






import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { db } from "../firebaseConfig";
import { FiPaperclip } from "react-icons/fi";
import {
  doc,
  updateDoc,
  arrayUnion,
  getDocs,
  collection,
  query,
  where,
  setDoc,onSnapshot
} from "firebase/firestore";
import { Context } from "./Context";

/* ================= STYLES ================= */

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

const CancelButton = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const FullScreenOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  cursor: zoom-out;

  img, video {
    max-width: 95%;
    max-height: 95%;
    object-fit: contain;
  }
`;


const MessageImage = styled.img`
  width: 100%;
  max-width: 180px;
  height: auto;
  border-radius: 10px;
  display: block;
  object-fit: contain;
`;

/* ================= COMPONENT ================= */

const ChatWindow = ({ user, setUser }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [chatId, setChatId] = useState(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fullMedia, setFullMedia] = useState(null);

  const messagesEndRef = useRef(null);
  const { setOpenChatModal } = useContext(Context);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /* ================= INIT CHAT ================= */

  const creatingRef = useRef(false);


  useEffect(() => {
  const savedChatId = localStorage.getItem("chatId");
  if (savedChatId) {
    setChatId(savedChatId);
  }
}, []);

useEffect(() => {
  if (chatId) {
    localStorage.setItem("chatId", chatId);
  }
}, [chatId]);


// useEffect(() => {
//   if (!user?.uid) return;

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
//       return;
//     }

//     // ✅ CREATE CHAT IF NONE EXISTS
//     const newRef = doc(collection(db, "chats"));

//     await setDoc(newRef, {
//       userId: user.uid,
//       name: user.name,
//       phone: user.phone,
//       messages: [],
//       createdAt: new Date(),
//     });

//     setChatId(newRef.id);
//     setMessages([]);
//   };

//   initChat();
// }, [user]);




// useEffect(() => {
//   if (!user?.uid || chatId) return; // ✅ stop if already have chatId

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
//       return;
//     }

//     const newRef = doc(collection(db, "chats"));

//     await setDoc(newRef, {
//       userId: user.uid,
//       name: user.name,
//       phone: user.phone,
//       messages: [],
//       createdAt: new Date(),
//     });

//     setChatId(newRef.id);
//     setMessages([]);
//   };

//   initChat();
// }, [user, chatId]);




useEffect(() => {
  if (!user?.uid) return;

  const initChat = async () => {
    // ✅ 1. If we already have chatId (from localStorage), use it
    if (chatId) {
      const ref = doc(db, "chats", chatId);
      const snap = await getDocs(query(collection(db, "chats"), where("__name__", "==", chatId)));

      if (!snap.empty) {
        setMessages(snap.docs[0].data().messages || []);
        return;
      }
    }

    // ✅ 2. Otherwise create / find chat
    const q = query(
      collection(db, "chats"),
      where("userId", "==", user.uid)
    );

    const snap = await getDocs(q);

    if (!snap.empty) {
      const existing = snap.docs[0];
      setChatId(existing.id);
      setMessages(existing.data().messages || []);
      return;
    }

    // ✅ 3. Create new chat ONLY if none exists
    const newRef = doc(collection(db, "chats"));

    await setDoc(newRef, {
      userId: user.uid,
      name: user.name,
      phone: user.phone,
      messages: [],
      createdAt: new Date(),
    });

    setChatId(newRef.id);
    setMessages([]);
  };

  initChat();
}, [user]);


useEffect(() => {
  if (!chatId) return;

  const unsubscribe = onSnapshot(doc(db, "chats", chatId), (snap) => {
    if (snap.exists()) {
      setMessages(snap.data().messages || []);
    }
  });

  return () => unsubscribe();
}, [chatId]);



  useEffect(() => scrollToBottom(), [messages]);

  /* ================= FILE HANDLING ================= */

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



const compressImage = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");

        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;

        let width = img.width;
        let height = img.height;

        // ✅ Maintain aspect ratio (NO CROPPING EVER)
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const widthRatio = MAX_WIDTH / width;
          const heightRatio = MAX_HEIGHT / height;
          const ratio = Math.min(widthRatio, heightRatio);

          width = width * ratio;
          height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        // ✅ Better rendering quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => resolve(blob || file),
          "image/jpeg",
          0.8 // better balance (0.7 was a bit aggressive)
        );
      };
    };

    reader.readAsDataURL(file);
  });
};



  const uploadFile = async (file) => {
    const data = new FormData();

    let uploadFileData = file;

    if (file.type.includes("image")) {
      try {
        uploadFileData = await compressImage(file);
      } catch {}
    }

    data.append("file", uploadFileData);
    data.append("upload_preset", "fedclone");

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

  /* ================= SEND MESSAGE ================= */


const sendMessage = async () => {
  if (!chatId) return; // this is now SAFE because chat always exists
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
    name: user.name,
    message: text,
    attachment: attachmentUrl,
    type: file
      ? file?.type?.includes("image")
        ? "image"
        : file?.type?.includes("video")
        ? "video"
        : "file"
      : "text",
    time: new Date().toISOString(),
  };

  try {
    await updateDoc(doc(db, "chats", chatId), {
      messages: arrayUnion(newMessage),
    });
  } catch (err) {
    console.error("Send failed:", err);
    alert("Message not sent (check console)");
    return;
  }

  setText("");
  setFile(null);
  setPreviewUrl(null);
};

  
  /* ================= LOGOUT ================= */

 const handleLogout = () => {
  setUser(null);

  localStorage.removeItem("chatUser");
  localStorage.removeItem("chatId"); // ✅ critical

  setChatId(null);
  setMessages([]);
};



  const handleCancelFile = () => {
  setFile(null);
  setPreviewUrl(null);
};

  /* ================= UI ================= */

  return (
    <Wrapper>
      <Header>
        <h4>Customer Care</h4>
        <button onClick={() => setOpenChatModal(false)}>Close</button>
      </Header>

      <Header>
        <h5>{user.name} ({user.phone})</h5>
        <button onClick={handleLogout}>End Chat</button>
      </Header>

      <Messages>
        {messages.map((msg, i) => (
          <MessageBubbleWrapper key={i} isUser={msg.id === user.uid}>
            <Bubble isUser={msg.id === user.uid}>
              {msg.message && <p>{msg.message}</p>}

             {msg.type === "image" && (
  <MessageImage
  src={msg.attachment}
  alt=""
  onClick={() =>
    setFullMedia({ type: "image", src: msg.attachment })
  }
/>
)}

{msg.type === "video" && (
  <video
    onClick={() =>
      setFullMedia({ type: "video", src: msg.attachment })
    }
    style={{
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
   

    {uploadProgress > 0 && (
  <ProgressBar progress={uploadProgress}>
    <div />
  </ProgressBar>
)}

{previewUrl && (
  <div style={{ position: "relative", display: "inline-block" }}>
    <CancelButton onClick={handleCancelFile}>×</CancelButton>

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
      {fullMedia && (
  <FullScreenOverlay onClick={() => setFullMedia(null)}>
    {fullMedia.type === "image" ? (
      <img src={fullMedia.src} alt="" />
    ) : (
      <video src={fullMedia.src} controls autoPlay />
    )}
  </FullScreenOverlay>
)}
    </Wrapper>
  );
};

export default ChatWindow;