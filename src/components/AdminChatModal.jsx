import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

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
`;

const Header = styled.div`
  background: #4D148C;
  color: white;
  padding: 12px 16px;
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
  background: #fafafa;
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
  word-break: break-word;
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
  padding: 10px 16px;
  cursor: pointer;
  &:hover { background: #3b0f85; }
`;

const AdminChatModal = ({ adminId, chat, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const chatRef = doc(db, "chats", chat.chatId);
    const unsub = onSnapshot(chatRef, (snap) => {
      const data = snap.data();
      setMessages(data.messages || []);
      scrollToBottom();
    });
    return unsub;
  }, [chat]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    const chatRef = doc(db, "chats", chat.chatId);
    const newMessage = { id: adminId, message: text, time: new Date().toISOString() };
    await updateDoc(chatRef, { messages: arrayUnion(newMessage) });
    setText("");
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <Header>
          <h3>Chat with {chat.userId}</h3>
          <button
            onClick={onClose}
            style={{ color: "#fff", background: "transparent", border: "none", fontSize: "16px", cursor: "pointer" }}
          >
            ✖
          </button>
        </Header>

        <Messages>
          {messages
            .sort((a, b) => new Date(a.time) - new Date(b.time))
            .map((msg, i) => (
              <MessageBubbleWrapper key={i} isAdmin={msg.id === adminId}>
                <Bubble isAdmin={msg.id === adminId}>{msg.message}</Bubble>
              </MessageBubbleWrapper>
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
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AdminChatModal;