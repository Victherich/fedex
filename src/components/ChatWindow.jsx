import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { db, auth } from "../firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  doc,
  updateDoc,
  increment
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import MessageBubble from "./MessageBubble";
import { Context } from "./Context";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  
`;


// const Header = styled.div`
//   background: #4D148C;
//   color: white;
//   padding: 10px;
//   border:2px solid white;
//   border-radius: 15px;
//   display:flex;
//   justify-content:space-between;
//   align-items:center;

//   h2{
//     font-weight: bold;
//   }

//   p{
//     cursor:pointer;
//   }
// `;

const Header = styled.div`
  background: #4D148C;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
 border:2px solid white;
 border-radius: 15px;
  h3 {
    font-weight: bold;
    margin: 0;
  }

  button {
    background: white;
    color: #4D148C;
    border: none;
    padding: 5px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
      background: #eee;
    }
  }
`;

const Messages = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const InputBox = styled.div`
  display: flex;
  border-top: 1px solid #ddd;
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
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background: #3b0f85;
  }
`;

const ChatWindow = ({ user, setUser }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);
  const {setOpenChatModal} = useContext(Context);

  // 🔹 Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const q = query(
      collection(db, "chats", user.chatId, "messages"),
      orderBy("createdAt")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return unsub;
  }, [user.chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 🔹 Send message
  const sendMessage = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, "chats", user.chatId, "messages"), {
      text,
      sender: "customer",
      createdAt: serverTimestamp()
    });

    await updateDoc(doc(db, "chats", user.chatId), {
      lastMessage: text,
      updatedAt: serverTimestamp(),
      unreadCountAdmin: increment(1)
    });

    setText("");
  };

  // 🔹 Logout
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <Wrapper>
        <Header>
        <h3>Customer Care</h3>
       
        <button onClick={()=>setOpenChatModal(false)}>Close</button>
      </Header>
      <Header>

        <h5>Hello, {user.name || "Customer"}</h5>
        <button onClick={handleLogout}>Logout</button>
      </Header>

      <Messages>
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </Messages>

      <InputBox>
        <Input
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>Send</Button>
      </InputBox>
    </Wrapper>
  );
};

export default ChatWindow;