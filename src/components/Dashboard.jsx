


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { signOut, onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebaseConfig";
// import Profile from "./Profile";
// import Swal from "sweetalert2";

// import DashboardHomeButton from "./DashboardHomeButton";
// import AdminChatDashboard from "./AdminChatDashboard";
// import Signup from "./Signup";

// /* ================= THEME ================= */
// const colors = {
//   primary: "#4D148C",
//   secondary: "#4D148C",
//   bg: "#F8FAFC",
//   sidebar: "#FFFFFF",
//   border: "#E5E7EB",
//   textDark: "#1E293B",
//   textLight: "#64748B",
// };

// /* ================= LAYOUT ================= */

// const DashboardContainer = styled.div`
//   display: flex;
//   height: 100vh;
//   background: ${colors.bg};

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const TopBar = styled.div`
//   display: none;

//   @media (max-width: 768px) {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     background: white;
//     border-bottom: 1px solid ${colors.border};
//     padding: 1rem;
//     font-weight: 600;
//   }
// `;

// const Hamburger = styled.div`
//   font-size: 24px;
//   cursor: pointer;
//   //  background: white;
// `;

// /* ================= SIDEBAR ================= */

// const Sidebar = styled.div`
//   width: 260px;
//   background: ${colors.sidebar};
//   border-right: 1px solid ${colors.border};
//   padding: 2rem 1rem;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   transition: transform 0.3s ease-in-out;

//   @media (max-width: 768px) {
//     position: fixed;
//     top: 0;
//     left: 0;
//     height: 100%;
//     transform: ${({ open }) =>
//       open ? "translateX(0)" : "translateX(-100%)"};
//     z-index: 1000;
//   }
// `;

// const SidebarTitle = styled.h3`
//   margin-bottom: 1rem;
//   color: ${colors.primary};
// `;

// /* Overlay */
// const Overlay = styled.div`
//   display: none;

//   @media (max-width: 768px) {
//     display: ${({ open }) => (open ? "block" : "none")};
//     position: fixed;
//     inset: 0;
//     background: rgba(0, 0, 0, 0.3);
//     z-index: 999;
//   }
// `;

// /* Sidebar Buttons */
// const SidebarButton = styled.button`
//   background: transparent;
//   color: ${colors.textDark};
//   border: none;
//   padding: 12px;
//   border-radius: 10px;
//   cursor: pointer;
//   text-align: left;
//   font-weight: 500;
//   transition: all 0.2s ease;

//   &:hover {
//     background: #eef2ff;
//     color: ${colors.primary};
//     transform: translateX(4px);
//   }
// `;

// const LogoutButton = styled.button`
//   margin-top: auto;
//   background: #fff7e6;
//   color: ${colors.secondary};
//   border: 1px solid #fde68a;
//   padding: 12px;
//   border-radius: 10px;
//   cursor: pointer;
//   font-weight: 600;

//   &:hover {
//     background: ${colors.secondary};
//     color: black;
//   }
// `;

// /* ================= CONTENT ================= */

// const ContentArea = styled.div`
//   flex: 1;
//   padding: 1.5rem;
//   overflow-y: auto;
// `;

// const Header = styled.h2`
//   // color: ${colors.textDark};
//   color:#4D148C;
//   margin-bottom: 1rem;
// `;

// /* ================= COMPONENT ================= */

// const UserDashboard = () => {
//   const navigate = useNavigate();
//   const [activePage, setActivePage] = useState("profile");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
// const [adminUser, setAdminUser] = useState(null);





//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         navigate("/login");
//       }
//       setLoading(false);
//       setAdminUser(user); 
//     });

//     return () => unsubscribe();
//   }, [navigate]);

//   const handleLogout = async () => {
//     const result = await Swal.fire({
//       title: "Logout?",
//       text: "You will be signed out.",
//       icon: "warning",
//       confirmButtonColor: colors.primary,
//       cancelButtonColor: colors.secondary,
//       showCancelButton: true,
//       confirmButtonText: "Yes, logout",
//     });

//     if (result.isConfirmed) {
//       await signOut(auth);
//       navigate("/login");
//     }
//   };

//   const renderPage = () => {
//     switch (activePage) {
//       case "profile":
//         return <Profile setActivePage={setActivePage}/>;

//          case "chats":
//         return <AdminChatDashboard adminId={adminUser.uid}/>;

//          case "addadmin":
//         return <Signup/>;



//       default:
//         return <Profile />;
//     }
//   };

//   if (loading) {
//     return (
//       <h2 style={{ textAlign: "center", marginTop: "50px", color:"#0A3CFF" }}>
//         Loading...
//       </h2>
//     );
//   }

//   return (
//     <>
//       <TopBar>
//         <Hamburger onClick={() => setMenuOpen(true)}>☰</Hamburger>
//         {/* <h3>Dashboard</h3> */}
//       </TopBar>

//       <Overlay open={menuOpen} onClick={() => setMenuOpen(false)} />

//       <DashboardContainer>
//         <Sidebar open={menuOpen}>
//           <SidebarTitle>Dashboard</SidebarTitle>

//           <SidebarButton
//             onClick={() => {
//               setActivePage("profile");
//               setMenuOpen(false);
//             }}
//           >
//             Profile
//           </SidebarButton>

//            <SidebarButton
//             onClick={() => {
//               setActivePage("chats");
//               setMenuOpen(false);
//             }}
//           >
//             Customer Chats
//           </SidebarButton>


//             <SidebarButton
//             onClick={() => {
//               setActivePage("addadmin");
//               setMenuOpen(false);
//             }}
//           >
//             Add Admin
//           </SidebarButton>

      
        

 

       



//             <SidebarButton
//             onClick={() => {
//               setActivePage("hosting");
//               setMenuOpen(false);
//             }}
//           >
//             Manage Site Hosting
//           </SidebarButton>

//           <LogoutButton onClick={handleLogout}>
//             Logout
//           </LogoutButton>
//         </Sidebar>
//  <DashboardHomeButton onGoHome={() => setActivePage('profile')} />
//         <ContentArea>
//           <Header>Dashboard</Header>
//           {renderPage()}
//         </ContentArea>
//       </DashboardContainer>
//     </>
//   );
// };

// export default UserDashboard;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Profile from "./Profile";
import Swal from "sweetalert2";

import DashboardHomeButton from "./DashboardHomeButton";
import AdminChatDashboard from "./AdminChatDashboard";
import Signup from "./Signup";
import ManageShipments from "./ManageShipments";

/* ================= THEME ================= */
const colors = {
  primary: "#4D148C",
  secondary: "#4D148C",
  bg: "#F8FAFC",
  sidebar: "#FFFFFF",
  border: "#E5E7EB",
  textDark: "#1E293B",
  textLight: "#64748B",
};

/* ================= LAYOUT ================= */

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background: ${colors.bg};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TopBar = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    border-bottom: 1px solid ${colors.border};
    padding: 1rem;
    font-weight: 600;
  }
`;

const Hamburger = styled.div`
  font-size: 24px;
  cursor: pointer;
`;

/* ================= SIDEBAR ================= */

const Sidebar = styled.div`
  width: 260px;
  background: ${colors.sidebar};
  border-right: 1px solid ${colors.border};
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    transform: ${({ open }) =>
      open ? "translateX(0)" : "translateX(-100%)"};
    z-index: 1000;
  }
`;

const SidebarTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${colors.primary};
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? "block" : "none")};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
  }
`;

const SidebarButton = styled.button`
  background: transparent;
  color: ${colors.textDark};
  border: none;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #eef2ff;
    color: ${colors.primary};
    transform: translateX(4px);
  }
`;

const LogoutButton = styled.button`
  margin-top: auto;
  background: #fff7e6;
  color: ${colors.secondary};
  border: 1px solid #fde68a;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: ${colors.secondary};
    color: black;
  }
`;

/* ================= CONTENT ================= */

const ContentArea = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
`;

const Header = styled.h2`
  color: #4d148c;
  margin-bottom: 1rem;
`;

/* ================= COMPONENT ================= */

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("profile");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);

  // 🔐 ADMIN AUTH CHECK
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().role === "admin") {
          setAdminUser(user); // ✅ allow
        } else {
          // ❌ block non-admin
          Swal.fire("Access Denied", "Admins only", "error");
          await signOut(auth);
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
        navigate("/login");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "You will be signed out.",
      icon: "warning",
      confirmButtonColor: colors.primary,
      cancelButtonColor: colors.secondary,
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
    });

    if (result.isConfirmed) {
      await signOut(auth);
      navigate("/login");
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case "profile":
        return <Profile setActivePage={setActivePage} />;

      case "chats":
        return adminUser ? (
          <AdminChatDashboard adminId={adminUser.uid} />
        ) : null;

      case "addadmin":
        return <Signup />;

          case "shipments":
        return <ManageShipments />;

      default:
        return <Profile />;
    }
  };

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px", color: "#0A3CFF" }}>
        Loading...
      </h2>
    );
  }

  return (
    <>
      <TopBar>
        <Hamburger onClick={() => setMenuOpen(true)}>☰</Hamburger>
      </TopBar>

      <Overlay open={menuOpen} onClick={() => setMenuOpen(false)} />

      <DashboardContainer>
        <Sidebar open={menuOpen}>
          <SidebarTitle>Dashboard</SidebarTitle>

          <SidebarButton
            onClick={() => {
              setActivePage("profile");
              setMenuOpen(false);
            }}
          >
            Profile
          </SidebarButton>

          <SidebarButton
            onClick={() => {
              setActivePage("shipments");
              setMenuOpen(false);
            }}
          >
            Manage Shipments
          </SidebarButton>

          <SidebarButton
            onClick={() => {
              setActivePage("chats");
              setMenuOpen(false);
            }}
          >
            Customer Chats
          </SidebarButton>

          <SidebarButton
            onClick={() => {
              setActivePage("addadmin");
              setMenuOpen(false);
            }}
          >
            Add Admin
          </SidebarButton>

          {/* <SidebarButton
            onClick={() => {
              setActivePage("hosting");
              setMenuOpen(false);
            }}
          >
            Manage Site Hosting
          </SidebarButton> */}

          <LogoutButton onClick={handleLogout}>
            Logout
          </LogoutButton>
        </Sidebar>

        <DashboardHomeButton onGoHome={() => setActivePage("profile")} />

        <ContentArea>
          <Header>Dashboard</Header>
          {renderPage()}
        </ContentArea>
      </DashboardContainer>
    </>
  );
};

export default UserDashboard;