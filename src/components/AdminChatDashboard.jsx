





// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { collection, getDocs, doc, getDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";
// import AdminChatModal from "./AdminChatModal";

// const PageContainer = styled.div`
//   padding: 2rem;
//   height: 100vh;
//   overflow-y: auto;

//   h2{
//   color:#4D148C;
//   }
// `;

// const UserCard = styled.div`
//   padding: 15px;
//   border: 1px solid #ddd;
//   border-radius: 10px;
//   margin-bottom: 10px;
//   cursor: pointer;
//   background: white;
//   transition: all 0.2s;
//   &:hover {
//     background: #f0f0f0;
//   }
// `;

// const AdminChatDashboard = ({ adminId }) => {
//   const [usersChats, setUsersChats] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);

//   // useEffect(() => {
//   //   const fetchChats = async () => {
//   //     const snap = await getDocs(collection(db, "chats"));
//   //     setUsersChats(snap.docs.map(doc => ({ chatId: doc.id, ...doc.data() })));
//   //   };
//   //   fetchChats();
//   // }, []);





//   // import { collection, getDocs, doc, getDoc } from "firebase/firestore";

// // useEffect(() => {
// //   const fetchChats = async () => {
// //     const snap = await getDocs(collection(db, "chats"));

// //     const chatsWithUserData = await Promise.all(
// //       snap.docs.map(async (chatDoc) => {
// //         const chatData = chatDoc.data();

// //         // Fetch user details using userId
// //         let userData = {};
// //         if (chatData.userId) {
// //           const userRef = doc(db, "users", chatData.userId);
// //           const userSnap = await getDoc(userRef);

// //           if (userSnap.exists()) {
// //             userData = userSnap.data();
// //           }
// //         }

// //         return {
// //           chatId: chatDoc.id,
// //           ...chatData,
// //           user: userData, // attach user info
// //         };
// //       })
// //     );

// //     setUsersChats(chatsWithUserData);
// //   };

// //   fetchChats();
// // }, []);



// useEffect(() => {
//   const fetchChats = async () => {
//     const snap = await getDocs(collection(db, "chats"));

//     const chatsWithUserData = await Promise.all(
//       snap.docs.map(async (chatDoc) => {
//         const chatData = chatDoc.data();

//         let userData = {};
//         if (chatData.userId) {
//           const userRef = doc(db, "users", chatData.userId);
//           const userSnap = await getDoc(userRef);

//           if (userSnap.exists()) {
//             userData = userSnap.data();
//           }
//         }

//         return {
//           chatId: chatDoc.id,
//           ...chatData,
//           user: userData,
//         };
//       })
//     );

//     // ✅ FILTER HERE
//     setUsersChats(
//       chatsWithUserData.filter(
//         (chat) => chat.messages && chat.messages.length > 0
//       )
//     );
//   };

//   fetchChats();
// }, []);



//   return (
//     <PageContainer>
//       <h2>All User Chats</h2>
//       {usersChats.length === 0 && <p>No chats yet.</p>}
//       {usersChats.map((chat) => (
//        <UserCard key={chat.chatId} onClick={() => setSelectedChat(chat)}>
//   <strong style={{color:"#4D148C"}}>Name:</strong> {chat.user?.name || "N/A"} <br />
//   <strong style={{color:"#4D148C"}}>Email:</strong> {chat.user?.email || "N/A"} <br />
//   <strong style={{color:"#4D148C"}}>Phone:</strong> {chat.user?.phone || "N/A"} <br />
//   <strong style={{color:"#4D148C"}}>Last message:</strong>{" "}
//   {chat.messages?.[chat.messages.length - 1]?.message || "No messages"}
// </UserCard>
//       ))}

//       {selectedChat && (
//         <AdminChatModal
//           adminId={adminId}
//           chat={selectedChat}
//           onClose={() => setSelectedChat(null)}
//         />
//       )}
//     </PageContainer>
//   );
// };

// export default AdminChatDashboard;








import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,deleteDoc
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import AdminChatModal from "./AdminChatModal";

/* ================= STYLES ================= */

const PageContainer = styled.div`
  padding: 2rem;
  height: 100vh;
  overflow-y: auto;

  h2 {
    color: #4D148C;
  }
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

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteBtn = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
`;


/* ================= COMPONENT ================= */

const AdminChatDashboard = ({ adminId }) => {
  const [usersChats, setUsersChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  /* ================= REAL-TIME LISTENER ================= */

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "chats"), async (snapshot) => {
      const chatsWithUserData = await Promise.all(
        snapshot.docs.map(async (chatDoc) => {
          const chatData = chatDoc.data();

          let userData = {};
          if (chatData.userId) {
            try {
              const userRef = doc(db, "users", chatData.userId);
              const userSnap = await getDoc(userRef);

              if (userSnap.exists()) {
                userData = userSnap.data();
              }
            } catch (err) {
              console.error("User fetch error:", err);
            }
          }

          return {
            chatId: chatDoc.id,
            ...chatData,
            user: userData,
          };
        })
      );

      // ✅ FILTER CHATS WITH MESSAGES
      let filtered = chatsWithUserData.filter(
        (chat) => chat.messages && chat.messages.length > 0
      );

      // ✅ SORT BY LATEST MESSAGE (LATEST FIRST)
      filtered.sort((a, b) => {
        const aTime =
          a.messages[a.messages.length - 1]?.time || "1970-01-01";
        const bTime =
          b.messages[b.messages.length - 1]?.time || "1970-01-01";

        return new Date(bTime) - new Date(aTime);
      });

      setUsersChats(filtered);
    });

    return () => unsub();
  }, []);





  const handleDeleteChat = async (chatId) => {
  const confirmDelete = window.confirm("Delete this chat?");
  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, "chats", chatId));

    // close modal if deleted chat is open
    if (selectedChat?.chatId === chatId) {
      setSelectedChat(null);
    }
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Failed to delete chat");
  }
};


  /* ================= UI ================= */

  return (
    <PageContainer>
      <h2>All User Chats</h2>

      {usersChats.length === 0 && <p>No chats yet.</p>}

      {usersChats.map((chat) => (
        <UserCard key={chat.chatId}>
  <CardRow>
    <div onClick={() => setSelectedChat(chat)} style={{ flex: 1 }}>
      <strong style={{ color: "#4D148C" }}>Name:</strong>{" "}
      {chat.user?.name || chat.name || "N/A"} <br />

      <strong style={{ color: "#4D148C" }}>Phone:</strong>{" "}
      {chat.user?.phone || chat.phone || "N/A"} <br />

      <strong style={{ color: "#4D148C" }}>Last message:</strong>{" "}
      {chat.messages?.[chat.messages.length - 1]?.message || "Attachment"}
    </div>

    <DeleteBtn onClick={() => handleDeleteChat(chat.chatId)}>
      Delete
    </DeleteBtn>
  </CardRow>
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