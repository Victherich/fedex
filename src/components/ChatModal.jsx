// import React, { useContext, useEffect, useState } from "react";
// import styled from "styled-components";
// import CustomerAuth from "./CustomerAuth";
// import ChatWindow from "./ChatWindow";
// import { Context } from "./Context";

// import { auth, db } from "../firebaseConfig";
// import { onAuthStateChanged } from "firebase/auth";
// import { collection, query, where, getDocs } from "firebase/firestore";

// const Overlay = styled.div`
//   position: fixed;
//   bottom: 90px;
//   right: 20px;
//   width: 350px;
//   height: 500px;
//   background: white;
//   border-radius: 15px;
//   box-shadow: 0 10px 25px rgba(0,0,0,0.2);
//   overflow: hidden;
//   z-index:3;
// `;

// const Header = styled.div`
//   background: #4D148C;
//   color: white;
//   padding: 10px;
//   border: 2px solid white;
//   border-radius: 15px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;

//   h2 {
//     font-weight: bold;
//   }

//   p {
//     cursor: pointer;
//   }
// `;

// const ChatModal = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { setOpenChatModal } = useContext(Context);

//   console.log(user);

//   // 🔹 Listen to auth state
//  useEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//     if (firebaseUser) {
//       let currentUser = {
//         uid: firebaseUser.uid,
//         email: firebaseUser.email,
//         name: firebaseUser.displayName || "",
//       };

//       // 🔹 Fetch or create permanent chat
//       const q = query(collection(db, "chats"), where("userId", "==", firebaseUser.uid));
//       const snap = await getDocs(q);

//       if (!snap.empty) {
//         currentUser.chatId = snap.docs[0].id;
//       } else {
//         const chatRef = await addDoc(collection(db, "chats"), {
//           userId: firebaseUser.uid,
//           customer: {
//             name: currentUser.name,
//             email: currentUser.email
//           },
//           createdAt: serverTimestamp(),
//           updatedAt: serverTimestamp(),
//           unreadCountAdmin: 0,
//           unreadCountCustomer: 0
//         });
//         currentUser.chatId = chatRef.id;
//       }

//       setUser(currentUser);
//     } else {
//       setUser(null);
//     }

//     setLoading(false);
//   });

//   return () => unsubscribe();
// }, []);





//   if (loading) return <Overlay>Loading...</Overlay>;

//   return (
//     <Overlay>
//       <Header>
//         <h2>Customer Care</h2>
//         <p onClick={() => setOpenChatModal(false)}>Close</p>
//       </Header>

//       {!user ? (
//         <CustomerAuth setUser={setUser} />
//       ) : (
//         <ChatWindow user={user} setUser={setUser} />
//       )}
//     </Overlay>
//   );
// };

// export default ChatModal;





import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import CustomerAuth from "./CustomerAuth";
import ChatWindow from "./ChatWindow";
import { Context } from "./Context";

import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const Overlay = styled.div`
border:2px solid white;
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  overflow: hidden;
  z-index: 12;

  @media(max-width:428px){
  left:1px;
  }
`;

const Header = styled.div`
  background: #4D148C;
  color: white;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-weight: bold;
  }

  p {
    cursor: pointer;
  }
`;

const ChatModal = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setOpenChatModal } = useContext(Context);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user details from Firestore
        const q = query(
          collection(db, "users"), // assuming user details are in "users" collection
          where("uid", "==", firebaseUser.uid)
        );
        const snap = await getDocs(q);

        if (!snap.empty) {
          const userData = snap.docs[0].data();
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: userData.name || "",
          });
        } else {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || "",
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <Overlay>Loading...</Overlay>;

  return (
    <Overlay>
      <Header>
        <h2>Customer Care</h2>
        <p onClick={() => setOpenChatModal(false)}>Close</p>
      </Header>

      {!user ? (
        <CustomerAuth setUser={setUser} />
      ) : (
        <ChatWindow user={user} setUser={setUser} />
      )}
    </Overlay>
  );
};

export default ChatModal;






// import React, { useState, useEffect, useRef, useContext } from "react";
// import styled from "styled-components";
// import { db, auth } from "../firebaseConfig";
// import Swal from "sweetalert2";
// import { FiPaperclip } from "react-icons/fi";
// import {
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   getDocs,
//   collection,
//   query,
//   where,
// } from "firebase/firestore";
// import { signOut } from "firebase/auth";
// import { Context } from "./Context";

// // ---------------- Styled Components ----------------
// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100%;
// `;

// const Header = styled.div`
//   background: #4d148c;
//   color: white;
//   padding: 10px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border-radius: 15px;
//   margin-bottom: 5px;

//   h3,
//   h5 {
//     margin: 0;
//   }

//   button {
//     background: white;
//     color: #4d148c;
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
//   -webkit-overflow-scrolling: touch;
// `;

// const MessageBubbleWrapper = styled.div`
//   display: flex;
//   justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
//   margin-bottom: 8px;
// `;

// const Bubble = styled.div`
//   background: ${(props) => (props.isUser ? "#4d148c" : "#eee")};
//   color: ${(props) => (props.isUser ? "white" : "black")};
//   padding: 8px 12px;
//   border-radius: 15px;
//   max-width: 70%;
//   word-break: break-word;
//   font-size: 14px;

//   img,
//   video {
//     max-width: 100%;
//     border-radius: 10px;
//     margin-top: 5px;
//   }
// `;

// const InputBox = styled.div`
//   display: flex;
//   border-top: 1px solid #ddd;
//   align-items: center;
//   flex-direction: column;
// `;

// const Input = styled.input`
//   flex: 1;
//   padding: 10px;
//   border: none;
//   outline: none;
// `;

// const Button = styled.button`
//   background: #4d148c;
//   color: white;
//   border: none;
//   padding: 10px 15px;
//   cursor: pointer;

//   &:hover {
//     background: #3b0f85;
//   }
// `;

// const FileButton = styled.label`
//   background: #4d148c;
//   color: white;
//   padding: 8px 12px;
//   margin-right: 8px;
//   border-radius: 6px;
//   cursor: pointer;
//   font-size: 14px;

//   &:hover {
//     background: #3b0f85;
//   }
// `;

// const FileInput = styled.input`
//   display: none;
// `;

// // ---------------- ChatWindow Component ----------------
// const ChatWindow = ({ user, setUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [chatId, setChatId] = useState(user.chatId || null);
//   const messagesEndRef = useRef(null);
//   const { setOpenChatModal } = useContext(Context);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [file, setFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // ---------------- Fetch chat ----------------
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

//   // ---------------- Logout ----------------
//   const handleLogout = async () => {
//     await signOut(auth);
//     setUser(null);
//   };

//   // ---------------- File handling ----------------
//   const handleFileChange = (e) => {
//     try {
//       const selectedFile = e.target.files[0];
//       if (!selectedFile) return;

//       const isImage = selectedFile.type.startsWith("image/");
//       const isVideo = selectedFile.type.startsWith("video/");

//       if (isVideo && selectedFile.size > 20 * 1024 * 1024) {
//         return Swal.fire({
//           icon: "error",
//           title: "File too large",
//           text: "Maximum allowed video size is 20MB",
//         });
//       }

//       if (isImage && selectedFile.size > 5 * 1024 * 1024) {
//         return Swal.fire({
//           icon: "error",
//           title: "Image too large",
//           text: "Maximum allowed image size is 5MB",
//         });
//       }

//       setFile(selectedFile);
//       setPreviewUrl(URL.createObjectURL(selectedFile));

//       e.target.value = null; // reset to allow re-select
//     } catch (err) {
//       console.error("File input error:", err);
//     }
//   };

//   const compressImage = async (file, maxSizeKB = 200) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const img = new Image();
//         img.src = e.target.result;

//         img.onload = () => {
//           const canvas = document.createElement("canvas");
//           const MAX_WIDTH = 600;
//           const scale = img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1;
//           canvas.width = img.width * scale;
//           canvas.height = img.height * scale;

//           const ctx = canvas.getContext("2d");
//           ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//           let quality = 0.7;
//           const compressLoop = () => {
//             canvas.toBlob(
//               (blob) => {
//                 if (!blob) return reject("Compression failed");
//                 if (blob.size / 1024 <= maxSizeKB || quality <= 0.1) resolve(blob);
//                 else {
//                   quality -= 0.1;
//                   compressLoop();
//                 }
//               },
//               "image/jpeg",
//               quality
//             );
//           };
//           compressLoop();
//         };
//         img.onerror = () => reject("Image load failed");
//       };
//       reader.onerror = () => reject("File reading failed");
//       reader.readAsDataURL(file);
//     });
//   };

//   const uploadFile = async (file) => {
//     const data = new FormData();
//     const isImage = file.type.startsWith("image/");
//     const isVideo = file.type.startsWith("video/");

//     if (isImage) {
//       const compressedBlob = await compressImage(file, 200);
//       data.append("file", compressedBlob, "chat.jpg");
//       data.append("upload_preset", "fedclone");
//       data.append("folder", "chat_images");
//     } else if (isVideo) {
//       data.append("file", file);
//       data.append("upload_preset", "fedclone");
//       data.append("folder", "chat_videos");
//     }

//     const url = isImage
//       ? "https://api.cloudinary.com/v1_1/deeqakcdx/image/upload"
//       : "https://api.cloudinary.com/v1_1/deeqakcdx/video/upload";

//     const response = await fetch(url, {
//       method: "POST",
//       body: data,
//     });

//     if (!response.ok) throw new Error("Upload failed");
//     const result = await response.json();
//     return result.secure_url;
//   };

//   // ---------------- Send Message ----------------
//   const sendMessage = async () => {
//     if (!text.trim() && !file) return;

//     let attachmentUrl = null;
//     if (file) {
//       Swal.fire({ title: "Uploading...", didOpen: () => Swal.showLoading() });
//       attachmentUrl = await uploadFile(file);
//       Swal.close();
//     }

//     const newMessage = {
//       id: user.uid,
//       message: text,
//       attachment: attachmentUrl,
//       type: file?.type.startsWith("image/")
//         ? "image"
//         : file?.type.startsWith("video/")
//         ? "video"
//         : "text",
//       time: new Date().toISOString(),
//     };

//     const chatRef = doc(db, "chats", chatId);
//     await updateDoc(chatRef, { messages: arrayUnion(newMessage) });

//     setMessages((prev) => [...prev, newMessage]);
//     setText("");
//     setFile(null);
//     setPreviewUrl(null);
//   };




//   // ---------------- Render ----------------
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
//             <MessageBubbleWrapper key={i} isUser={msg.id === user.uid}>
//               <Bubble isUser={msg.id === user.uid}>
//                 {msg.message && <p>{msg.message}</p>}

//                 {msg.type === "image" && (
//                   <img src={msg.attachment} alt="sent" />
//                 )}

//                 {msg.type === "video" && (
//                   <video controls>
//                     <source src={msg.attachment} type="video/mp4" />
//                   </video>
//                 )}
//               </Bubble>
//             </MessageBubbleWrapper>
//           ))}
//         <div ref={messagesEndRef} />
//       </Messages>

//       <InputBox>
//         {/* Preview */}
//         {previewUrl && (
//           <div
//             style={{
//               padding: "8px",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               marginBottom: "5px",
//               width: "100%",
//             }}
//           >
//             {uploadProgress > 0 && (
//               <div
//                 style={{
//                   width: "100%",
//                   marginBottom: "5px",
//                   height: "6px",
//                   background: "#eee",
//                   borderRadius: "3px",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: `${uploadProgress}%`,
//                     height: "100%",
//                     background: "#4D148C",
//                     borderRadius: "3px",
//                     transition: "width 0.2s",
//                   }}
//                 />
//               </div>
//             )}

//             {file?.type.startsWith("image/") && (
//               <img
//                 src={previewUrl}
//                 alt="preview"
//                 style={{
//                   maxWidth: "50px",
//                   borderRadius: "10px",
//                   objectFit: "cover",
//                 }}
//               />
//             )}

//             {file?.type.startsWith("video/") && (
//               <video
//                 controls
//                 src={previewUrl}
//                 style={{
//                   maxWidth: "50px",
//                   borderRadius: "10px",
//                   objectFit: "cover",
//                 }}
//               />
//             )}
//           </div>
//         )}

//         <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
//           <FileButton>
//             <FiPaperclip style={{ marginRight: "6px" }} />
//             <FileInput
//               type="file"
//               accept="image/*,video/*"
//               onChange={handleFileChange}
//             />
//           </FileButton>

//           <Input
//             placeholder="Type a message..."
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />

//           <Button onClick={sendMessage}>Send</Button>
//         </div>
//       </InputBox>
//     </Wrapper>
//   );
// };

// export default ChatWindow;