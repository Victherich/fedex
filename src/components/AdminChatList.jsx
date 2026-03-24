import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import styled from "styled-components";

const Item = styled.div`
  padding: 15px;
  border-bottom: 1px solid #ddd;
  background: ${({ unread }) => (unread ? "#f3f0ff" : "white")};
  cursor: pointer;
`;

const AdminChatList = ({ setActiveChat }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "chats"), orderBy("updatedAt", "desc"));

    onSnapshot(q, snapshot => {
      setChats(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });
  }, []);

  return chats.map(chat => (
    <Item
      key={chat.id}
      unread={chat.unreadCountAdmin > 0}
      onClick={() => setActiveChat(chat)}
    >
      {chat.customer.name} <br />
      {chat.lastMessage}
    </Item>
  ));
};

export default AdminChatList;