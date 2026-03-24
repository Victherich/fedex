import React, { useEffect, useState } from "react";
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
import { db } from "../../firebaseConfig";
import MessageBubble from "../chat/MessageBubble";

const AdminChatWindow = ({ chat }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "chats", chat.id, "messages"),
      orderBy("createdAt")
    );

    return onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });
  }, [chat.id]);

  const sendMessage = async () => {
    await addDoc(collection(db, "chats", chat.id, "messages"), {
      text,
      sender: "admin",
      createdAt: serverTimestamp()
    });

    await updateDoc(doc(db, "chats", chat.id), {
      lastMessage: text,
      updatedAt: serverTimestamp(),
      unreadCountCustomer: increment(1),
      unreadCountAdmin: 0
    });

    setText("");
  };

  return (
    <div>
      {messages.map((msg, i) => (
        <MessageBubble key={i} msg={msg} />
      ))}

      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default AdminChatWindow;