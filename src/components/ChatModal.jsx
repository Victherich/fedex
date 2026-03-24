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