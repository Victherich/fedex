// import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";
// import { db } from "../firebaseConfig";
// import {
//   collection,
//   getDocs,
//   doc,
//   updateDoc,
//   arrayUnion,
//   onSnapshot
// } from "firebase/firestore";

// // ===== STYLED COMPONENTS =====
// const Container = styled.div`
//   display: flex;
//   height: 100vh;
// `;

// const Sidebar = styled.div`
//   width: 250px;
//   border-right: 1px solid #ddd;
//   overflow-y: auto;
// `;

// const UserItem = styled.div`
//   padding: 10px;
//   cursor: pointer;
//   border-bottom: 1px solid #eee;
//   background: ${(props) => (props.selected ? "#f0f0f0" : "white")};
//   &:hover {
//     background: #f9f9f9;
//   }
// `;

// const ChatModal = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
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
//   font-size: 14px;
// `;

// const InputBox = styled.div`
//   display: flex;
//   border-top: 1px solid #ddd;
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
// // ================================

// const AdminChatDashboard = ({ adminId }) => {
//   const [usersChats, setUsersChats] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const messagesEndRef = useRef(null);

//   // Scroll to bottom
//   const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

//   // Fetch all chats
//   useEffect(() => {
//     const fetchChats = async () => {
//       const snap = await getDocs(collection(db, "chats"));
//       setUsersChats(snap.docs.map(doc => ({ chatId: doc.id, ...doc.data() })));
//     };
//     fetchChats();
//   }, []);

//   // Listen for messages in selected chat
//   useEffect(() => {
//     if (!selectedChat) return;
//     const chatRef = doc(db, "chats", selectedChat.chatId);
//     const unsub = onSnapshot(chatRef, (snap) => {
//       const data = snap.data();
//       setMessages(data.messages || []);
//       scrollToBottom();
//     });
//     return unsub;
//   }, [selectedChat]);

//   // Send message
//   const sendMessage = async () => {
//     if (!text.trim() || !selectedChat) return;
//     const chatRef = doc(db, "chats", selectedChat.chatId);
//     const newMessage = {
//       id: adminId,
//       message: text,
//       time: new Date().toISOString()
//     };
//     await updateDoc(chatRef, { messages: arrayUnion(newMessage) });
//     setText("");
//   };

//   return (
//     <Container>
//       <Sidebar>
//         <h3 style={{ textAlign: "center" }}>Chats</h3>
//         {usersChats.map((chat) => (
//           <UserItem
//             key={chat.chatId}
//             selected={selectedChat?.chatId === chat.chatId}
//             onClick={() => setSelectedChat(chat)}
//           >
//             User: {chat.userId}
//             <br />
//             Last message: {chat.messages?.[chat.messages.length - 1]?.message || "No messages"}
//           </UserItem>
//         ))}
//       </Sidebar>

//       {selectedChat && (
//         <ChatModal>
//           <Header>
//             <h3>Chat with {selectedChat.userId}</h3>
//           </Header>

//           <Messages>
//             {messages
//               .sort((a, b) => new Date(a.time) - new Date(b.time))
//               .map((msg, i) => (
//                 <MessageBubbleWrapper key={i} isAdmin={msg.id === adminId}>
//                   <Bubble isAdmin={msg.id === adminId}>{msg.message}</Bubble>
//                 </MessageBubbleWrapper>
//               ))}
//             <div ref={messagesEndRef} />
//           </Messages>

//           <InputBox>
//             <Input
//               placeholder="Type a message..."
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <Button onClick={sendMessage}>Send</Button>
//           </InputBox>
//         </ChatModal>
//       )}
//     </Container>
//   );
// };

// export default AdminChatDashboard;






import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import AdminChatModal from "./AdminChatModal";

const PageContainer = styled.div`
  padding: 2rem;
  height: 100vh;
  overflow-y: auto;
`;

const UserCard = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  background: white;
  transition: all 0.2s;
  &:hover {
    background: #f0f0f0;
  }
`;

const AdminChatDashboard = ({ adminId }) => {
  const [usersChats, setUsersChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      const snap = await getDocs(collection(db, "chats"));
      setUsersChats(snap.docs.map(doc => ({ chatId: doc.id, ...doc.data() })));
    };
    fetchChats();
  }, []);

  return (
    <PageContainer>
      <h2>All User Chats</h2>
      {usersChats.length === 0 && <p>No chats yet.</p>}
      {usersChats.map((chat) => (
        <UserCard key={chat.chatId} onClick={() => setSelectedChat(chat)}>
          <strong>User:</strong> {chat.userId} <br />
          <strong>Last message:</strong> {chat.messages?.[chat.messages.length - 1]?.message || "No messages"}
        </UserCard>
      ))}

      {selectedChat && (
        <AdminChatModal
          adminId={adminId}
          chat={selectedChat}
          onClose={() => setSelectedChat(null)}
        />
      )}
    </PageContainer>
  );
};

export default AdminChatDashboard;