


// import React, { useEffect, useState, useContext } from "react";
// import styled from "styled-components";
// import CustomerAuth from "./CustomerAuth";
// import ChatWindow from "./ChatWindow";
// import { Context } from "./Context";
// import Swal from "sweetalert2";
// import { auth, db } from "../firebaseConfig";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { collection, query, where, getDocs } from "firebase/firestore";

// const Overlay = styled.div`
//   border: 2px solid white;
//   position: fixed;
//   bottom: 90px;
//   right: 20px;
//   width: 350px;
//   height: 500px;
//   background: white;
//   border-radius: 15px;
//   box-shadow: 0 10px 25px rgba(0,0,0,0.2);
//   overflow: hidden;
//   z-index: 12;

//   @media (max-width: 428px) {
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;

//     width: 100%;
//     height: 100%;

//     border-radius: 0; // remove rounded corners for full screen
//   }
// `;

// const Header = styled.div`
//   background: #4D148C;
//   color: white;
//   padding: 10px;
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

//   useEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//     if (firebaseUser) {
//       const q = query(
//         collection(db, "users"),
//         where("uid", "==", firebaseUser.uid)
//       );
//       const snap = await getDocs(q);

//       if (!snap.empty) {
//         const userData = snap.docs[0].data();

//        // 🚫 BLOCK + LOGOUT ADMIN
// if (userData.role === "admin") {
//   await signOut(auth); // 🔥 log them out

//   setUser(null);
//   setOpenChatModal(false);

//   Swal.fire({
//     text: "Admins are not allowed in customer chat. Please login as customer",
//     icon: "warning"
//   });

//   return;
// }

//         setUser({
//           uid: firebaseUser.uid,
//           email: firebaseUser.email,
//           name: userData.name || "",
//           role: userData.role || "",
//         });
//       } else {
//         setUser({
//           uid: firebaseUser.uid,
//           email: firebaseUser.email,
//           name: firebaseUser.displayName || "",
//           role: "",
//         });
//       }
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













import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ChatWindow from "./ChatWindow";
import { Context } from "./Context";

/* ================= STYLES ================= */

const Overlay = styled.div`
  border: 2px solid white;
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

  @media (max-width: 428px) {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

const Header = styled.div`
  background: #4D148C;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormWrapper = styled.div`
  padding: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #4D148C;
  color: white;
  border: none;
  cursor: pointer;
`;

/* ================= COMPONENT ================= */

const ChatModal = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const { setOpenChatModal } = useContext(Context);

  // ✅ Load saved user (so chat persists after refresh)
  useEffect(() => {
    const savedUser = localStorage.getItem("chatUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleStartChat = () => {
    if (!name || !phone) {
      alert("Please enter your name and phone");
      return;
    }

    const newUser = {
      uid: "guest_" + Date.now(),
      name,
      phone,
      role: "customer",
    };

    setUser(newUser);

    // ✅ Save to localStorage
    localStorage.setItem("chatUser", JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("chatUser");
  };

  return (
    <Overlay>
      <Header>
        <h3>Customer Care</h3>
        <p style={{ cursor: "pointer" }} onClick={() => setOpenChatModal(false)}>
          Close
        </p>
      </Header>

      {/* ================= FORM ================= */}
      {!user ? (
        <FormWrapper>
          <h4>Start Chat</h4>

          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Button onClick={handleStartChat}>
            Start Chat
          </Button>
        </FormWrapper>
      ) : (
        /* ================= CHAT ================= */
        <ChatWindow user={user} setUser={handleLogout} />
      )}
    </Overlay>
  );
};

export default ChatModal;