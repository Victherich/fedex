import React, { useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import Swal from "sweetalert2";

// ===== STYLED COMPONENTS =====
const Wrapper = styled.div`
  padding: 15px;
`;
const Title = styled.h3`
  text-align: center;
  color: #4D148C;
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
const Switch = styled.p`
  text-align: center;
  cursor: pointer;
  color: #4D148C;
`;
// ================================

const CustomerAuth = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ================= SIGNUP =================
  const handleSignup = async () => {
    try {
      Swal.fire({
        title: "Creating account...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      const { name, email, phone, password } = form;

      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      // Save user in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        phone,
        role: "customer",
        createdAt: new Date()
      });

      // Create chat for this user
      const chatRef = await addDoc(collection(db, "chats"), {
        userId: user.uid,
        customer: { name, email, phone },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        unreadCountAdmin: 0,
        unreadCountCustomer: 0
      });

      setUser({
        uid: user.uid,
        name,
        email,
        phone,
        chatId: chatRef.id
      });

      Swal.close(); // close loading
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // ================= LOGIN =================
  const handleLogin = async () => {
    try {
      Swal.fire({
        title: "Logging in...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      const { email, password } = form;

      const cred = await signInWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      // Get user data
      const userSnap = await getDoc(doc(db, "users", user.uid));
      const userData = userSnap.data();

      // Check existing chat
      const chatQuery = collection(db, "chats");
      const snap = await getDoc(doc(db, "chats", user.uid)); // Optional: simplify to single chat if you save chatId in user doc

      let chatId;

      if (snap.exists()) {
        chatId = snap.id;
      } else {
        const chatRef = await addDoc(collection(db, "chats"), {
          userId: user.uid,
          customer: {
            name: userData.name,
            email: userData.email,
            phone: userData.phone
          },
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          unreadCountAdmin: 0,
          unreadCountCustomer: 0
        });
        chatId = chatRef.id;
      }

      setUser({
        uid: user.uid,
        ...userData,
        chatId
      });

      Swal.close(); // close loading
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <Wrapper>
      <Title>{isLogin ? "Login" : "Sign Up"}</Title>

      {!isLogin && (
        <>
          <Input name="name" placeholder="Name" onChange={handleChange} />
          <Input name="phone" placeholder="Phone" onChange={handleChange} />
        </>
      )}

      <Input name="email" placeholder="Email" onChange={handleChange} />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <Button onClick={isLogin ? handleLogin : handleSignup}>
        {isLogin ? "Login" : "Sign Up"}
      </Button>

      <Switch onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Create account" : "Already have account?"}
      </Switch>
    </Wrapper>
  );
};

export default CustomerAuth;