import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CustomerAuth from "./CustomerAuth";
import ChatWindow from "./ChatWindow";
import { Context } from "./Context";

import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

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
  z-index:3;
`;

const Header = styled.div`
  background: #4D148C;
  color: white;
  padding: 10px;
  border: 2px solid white;
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

  // 🔐 Listen for Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || "",
        });
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