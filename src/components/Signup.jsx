import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";


// ===== STYLED COMPONENTS (SIGNUP) =====
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a3bff28 90%, #d4af37 10%);
  padding: 2rem;
`;

const FormWrapper = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border-top: 6px solid #d4af37;
`;

const Title = styled.h2`
  text-align: center;
  color: #0a3cff;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;

  &:focus {
    border-color: #0a3cff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #0a3cff;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #082fcc;
  }
`;

const LinkText = styled.p`
  margin-top: 12px;
  text-align: center;
  color: #0a3cff;
  cursor: pointer;

  &:hover {
    color: #d4af37;
  }
`;
// ===== END STYLED COMPONENTS =====

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.email !== form.confirmEmail) {
      return Swal.fire("Error", "Emails do not match", "error");
    }

    if (form.password !== form.confirmPassword) {
      return Swal.fire("Error", "Passwords do not match", "error");
    }

    Swal.fire({
      title: "Creating account...",
      didOpen: () => Swal.showLoading(),
    });

    try {
      const { name, email, phone, password } = form;

      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      await updateProfile(user, { displayName: name });

   await setDoc(doc(db, "users", user.uid), {
  uid: user.uid,
  name,
  email,
  phone,
  role: "admin", // ✅ default role added
  createdAt: new Date(),
});

      Swal.fire("Success 🎉", "Account created successfully", "success");
      navigate("/login");
    } catch (err) {
      Swal.fire("Error ❌", err.message, "error");
    }
  };

  // 🔐 PREVENT ACCESS IF ALREADY LOGGED IN
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate("/dashboard");
        } else {
          // setCheckingAuth(false);
        }
      });
  
      return () => unsubscribe();
    }, [navigate]);
  

  return (
    <Container>
      <FormWrapper>
        <Title>Create Your Account</Title>

        <form onSubmit={handleSubmit}>
          <Label>Full Name</Label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <Label>Confirm Email</Label>
          <Input
            name="confirmEmail"
            type="email"
            value={form.confirmEmail}
            onChange={handleChange}
            required
          />

          <Label>Phone</Label>
          <Input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <Label>Password</Label>
          <Input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <Label>Confirm Password</Label>
          <Input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <Button type="submit">Create Account</Button>

          <LinkText onClick={() => navigate("/login")}>
            Already have an account? Login
          </LinkText>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default Signup;
