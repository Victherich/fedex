// import React, { useState, useEffect, useRef, useContext } from "react";
// import styled from "styled-components";
// import { db, auth } from "../firebaseConfig";
// import {
//   collection,
//   addDoc,
//   onSnapshot,
//   query,
//   orderBy,
//   serverTimestamp,
//   doc,
//   updateDoc,
//   increment,
//   getDocs,
//   where
// } from "firebase/firestore";
// import { signOut } from "firebase/auth";
// import MessageBubble from "./MessageBubble";
// import { Context } from "./Context";

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100%;
// `;

// const Header = styled.div`
//   background: #4D148C;
//   color: white;
//   padding: 10px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border: 2px solid white;
//   border-radius: 15px;

//   h3 {
//     font-weight: bold;
//     margin: 0;
//   }

//   button {
//     background: white;
//     color: #4D148C;
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

// const ChatWindow = ({ user, setUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [chatId, setChatId] = useState(user.chatId || null);
//   const messagesEndRef = useRef(null);
//   const { setOpenChatModal } = useContext(Context);

//   // 🔹 Scroll to bottom
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // 🔹 Ensure permanent chat exists
//   useEffect(() => {
//     const createOrFetchChat = async () => {
//       if (!chatId) {
//         // Check for existing chat
//         const q = query(
//           collection(db, "chats"),
//           where("userId", "==", user.uid)
//         );
//         const snap = await getDocs(q);

//         if (!snap.empty) {
//           setChatId(snap.docs[0].id);
//         } else {
//           // Create chat if none exists
//           const chatRef = await addDoc(collection(db, "chats"), {
//             userId: user.uid,
//             customer: {
//               name: user.name || "",
//               email: user.email || ""
//             },
//             createdAt: serverTimestamp(),
//             updatedAt: serverTimestamp(),
//             unreadCountAdmin: 0,
//             unreadCountCustomer: 0
//           });
//           setChatId(chatRef.id);
//         }
//       }
//     };

//     createOrFetchChat();
//   }, [chatId, user]);

//   // 🔹 Listen for messages
//   useEffect(() => {
//     if (!chatId) return;
//     const q = query(
//       collection(db, "chats", chatId, "messages"),
//       orderBy("createdAt")
//     );
//     const unsub = onSnapshot(q, (snapshot) => {
//       setMessages(snapshot.docs.map((doc) => doc.data()));
//     });

//     return unsub;
//   }, [chatId]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // 🔹 Send message
//   const sendMessage = async () => {
//     if (!text.trim() || !chatId) return;

//     await addDoc(collection(db, "chats", chatId, "messages"), {
//       text,
//       sender: "customer",
//       createdAt: serverTimestamp()
//     });

//     await updateDoc(doc(db, "chats", chatId), {
//       lastMessage: text,
//       updatedAt: serverTimestamp(),
//       unreadCountAdmin: increment(1)
//     });

//     setText("");
//   };

//   // 🔹 Logout
//   const handleLogout = async () => {
//     await signOut(auth);
//     setUser(null);
//   };

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
//         {messages.map((msg, i) => (
//           <MessageBubble key={i} msg={msg} />
//         ))}
//         <div ref={messagesEndRef} />
//       </Messages>

//       <InputBox>
//         <Input
//           placeholder="Type a message..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <Button onClick={sendMessage}>Send</Button>
//       </InputBox>
//     </Wrapper>
//   );
// };

// export default ChatWindow;






import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { db, auth } from "../firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  getDocs,
  collection,
  query,
  where
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Context } from "./Context";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  background: #4D148C;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  margin-bottom: 5px;

  h3, h5 {
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

const MessageBubbleWrapper = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  margin-bottom: 8px;
`;

const Bubble = styled.div`
  background: ${(props) => (props.isUser ? "#4D148C" : "#eee")};
  color: ${(props) => (props.isUser ? "white" : "black")};
  padding: 8px 12px;
  border-radius: 15px;
  max-width: 70%;
  word-break: break-word;
  font-size: 14px;
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
  const [chatId, setChatId] = useState(user.chatId || null);
  const messagesEndRef = useRef(null);
  const { setOpenChatModal } = useContext(Context);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch chat if exists
  useEffect(() => {
    const fetchChat = async () => {
      if (!chatId) {
        const q = query(collection(db, "chats"), where("userId", "==", user.uid));
        const snap = await getDocs(q);

        if (!snap.empty) {
          const docData = snap.docs[0].data();
          setChatId(snap.docs[0].id);
          setMessages(docData.messages || []);
        }
      } else {
        const docRef = doc(db, "chats", chatId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMessages(docSnap.data().messages || []);
        }
      }
    };

    fetchChat();
  }, [chatId, user.uid]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message (create chat if first message)
  const sendMessage = async () => {
    if (!text.trim()) return;

    const msgObj = {
      id: user.uid,
      message: text,
      time: new Date().toISOString()
    };

    if (!chatId) {
      // Create new chat doc
      const chatRef = doc(collection(db, "chats"));
      await setDoc(chatRef, {
        userId: user.uid,
        messages: [msgObj]
      });
      setChatId(chatRef.id);
      setMessages([msgObj]);
    } else {
      // Append message to existing chat
      const chatRef = doc(db, "chats", chatId);
      await updateDoc(chatRef, {
        messages: arrayUnion(msgObj)
      });
      setMessages((prev) => [...prev, msgObj]);
    }

    setText("");
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <Wrapper>
      <Header>
        <h3>Customer Care</h3>
        <button onClick={() => setOpenChatModal(false)}>Close</button>
      </Header>
      <Header>
        <h5>Hello, {user.name || "Customer"}</h5>
        <button onClick={handleLogout}>Logout</button>
      </Header>

      <Messages>
        {messages
          .sort((a, b) => new Date(a.time) - new Date(b.time))
          .map((msg, i) => (
            <MessageBubbleWrapper
              key={i}
              isUser={msg.id === user.uid}
            >
              <Bubble isUser={msg.id === user.uid}>{msg.message}</Bubble>
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
    </Wrapper>
  );
};

export default ChatWindow;