// import React, { useState , useEffect} from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import Swal from "sweetalert2";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebaseConfig";
// import { onAuthStateChanged } from "firebase/auth";

// // ===== STYLED COMPONENTS (LOGIN) =====
// const Container = styled.div`
//   min-height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: linear-gradient(135deg, #0a3bff28 90%, #d4af37 10%);
//   padding: 2rem;
// `;

// const FormWrapper = styled.div`
//   background: #ffffff;
//   border-radius: 16px;
//   padding: 2rem;
//   width: 100%;
//   max-width: 480px;
//   box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
//   border-top: 6px solid #d4af37;
// `;

// const Title = styled.h2`
//   text-align: center;
//   color: #0a3cff;
//   margin-bottom: 1rem;
// `;

// const Label = styled.label`
//   display: block;
//   font-weight: 600;
//   margin-bottom: 6px;
//   color: #333;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 12px;
//   border-radius: 8px;
//   border: 1px solid #ddd;

//   &:focus {
//     border-color: #0a3cff;
//     outline: none;
//   }
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 12px;
//   background: #0a3cff;
//   color: white;
//   border: none;
//   border-radius: 10px;
//   font-weight: bold;
//   cursor: pointer;

//   &:hover {
//     background: #082fcc;
//   }
// `;

// const LinkText = styled.p`
//   margin-top: 12px;
//   text-align: center;
//   color: #0a3cff;
//   cursor: pointer;

//   &:hover {
//     color: #d4af37;
//   }
// `;
// // ===== END STYLED COMPONENTS =====

// const UserLogin = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [checkingAuth, setCheckingAuth] = useState(true);

// // 🔐 PREVENT ACCESS IF ALREADY LOGGED IN
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         navigate("/dashboard");
//       } else {
//         setCheckingAuth(false);
//       }
//     });

//     return () => unsubscribe();
//   }, [navigate]);



//   const handleLogin = async (e) => {
//     e.preventDefault();

//     Swal.fire({
//       title: "Signing in...",
//       didOpen: () => Swal.showLoading(),
//     });

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       Swal.fire("Success", "Logged in successfully", "success");
//       navigate("/dashboard");
//     } catch (err) {
//       Swal.fire("Error", err.message, "error");
//     }
//   };

  
//   if (checkingAuth) {
//     return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Checking session...</h2>;
//   }

//   return (
//     <Container>
//       <FormWrapper>
//         <Title>User Login</Title>

//         <form onSubmit={handleLogin}>
//           <Label>Email</Label>
//           <Input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <Label>Password</Label>
//           <Input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <Button type="submit">Login</Button>

//           <LinkText onClick={() => navigate("/signup")}>
//             Don't have an account? Sign up
//           </LinkText>
//         </form>
//       </FormWrapper>
//     </Container>
//   );
// };

// export default UserLogin;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { db } from "../firebaseConfig"; // ✅ make sure db is exported
import { doc, getDoc } from "firebase/firestore";

// ===== STYLED COMPONENTS (LOGIN) =====
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  // background: linear-gradient(135deg, #0a3bff28 90%, #d4af37 10%);
  padding: 2rem;
`;

const FormWrapper = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border-top: 6px solid #4D148C;
`;

const Title = styled.h2`
  text-align: center;
  color: #4D148C;
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
    border-color: #4D148C;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #4D148C;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #4D148C;
  }
`;

const LinkText = styled.p`
  margin-top: 12px;
  text-align: center;
  color: #4D148C;
  cursor: pointer;

  &:hover {
    color: #4D148C;
  }
`;
// ===== END STYLED COMPONENTS =====

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  // 🔐 CHECK SESSION + ROLE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists() && docSnap.data().role === "admin") {
            navigate("/dashboard");
          } else {
            // 🚫 block customer
            Swal.fire("Access Denied", "Only admins can access dashboard", "error");
            navigate("/");
          }
        } catch (err) {
          console.error(err);
          navigate("/");
        }
      } else {
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Signing in...",
      didOpen: () => Swal.showLoading(),
    });

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🔍 GET ROLE FROM FIRESTORE
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const role = docSnap.data().role;

        if (role === "admin") {
          Swal.fire("Success", "Welcome Admin", "success");
          navigate("/dashboard");
        } else {
          Swal.fire("Access Denied", "Only admins can access dashboard", "error");
          navigate("/");
        }
      } else {
        Swal.fire("Error", "User role not found", "error");
      }

    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  if (checkingAuth) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Checking session...</h2>;
  }

  return (
    <Container>
      <FormWrapper>
        <Title>User Login</Title>

        <form onSubmit={handleLogin}>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit">Login</Button>

          <LinkText onClick={() => navigate("/signup")}>
            Don't have an account? Sign up
          </LinkText>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default UserLogin;