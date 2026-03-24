import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { 
  FaCalendarAlt,      // for events
  FaRegLightbulb,     // for inspirationals
  FaBook,             // for sermons
  FaServer,           // for site hosting
  FaMoneyCheckAlt,    // for payments / transactions
  FaComments,         // for testimonies
  FaSignOutAlt ,FaIdCard ,FaUser, FaPhone, FaEdit      // logout (already used)
} from "react-icons/fa";
import Swal from 'sweetalert2';


/* ================= THEME ================= */
const colors = {
  primary: "#4D148C",
  secondary: "#4D148C",
  bg: "#F9FAFC",
  card: "#FFFFFF",
  textDark: "#1E1E2F",
  border: "#E6E8F0",
};

/* ================= LAYOUT ================= */
const Page = styled.div`
  min-height: 100vh;
  // background: ${colors.bg};
  padding: 1rem;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

/* ================= PROFILE PANEL ================= */
const ProfilePanel = styled.div`
  background: ${colors.card};
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid ${colors.border};
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Name = styled.h2`
  color: ${colors.textDark};
`;

const Email = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

const InfoItem = styled.p`
  font-size: 0.9rem;
  margin: 0.4rem 0;
`;

const EditButton = styled.button`
  margin-top: 1rem;
  width: 100%;
  padding: 10px;
  background: ${colors.primary};
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: ${colors.secondary};
    color: #000;
  }
`;

/* ================= ACTION AREA ================= */
const ActionArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  color: ${colors.textDark};
  margin-bottom: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const ActionCard = styled.div`
  background: ${colors.card};
  border-radius: 16px;
  padding: 1.6rem;
  cursor: pointer;
  text-align: center;
  border: 1px solid ${colors.border};
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const Icon = styled.div`
  font-size: 2rem;
  color: ${colors.primary};
  margin-bottom: 0.6rem;
`;

const Label = styled.h4`
  color: ${colors.textDark};
`;

const Desc = styled.p`
  font-size: 0.85rem;
  color: #666;
`;

/* ================= MODAL ================= */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
`;

const ModalTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${colors.primary};
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${colors.border};
  margin-bottom: 1rem;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 10px;
`;

const SaveBtn = styled.button`
  flex: 1;
  background: ${colors.primary};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
`;

const CancelBtn = styled.button`
  flex: 1;
  background: #eee;
  border: none;
  padding: 10px;
  border-radius: 8px;
`;

/* ================= COMPONENT ================= */
const Profile = ({setActivePage}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUserData({ ...userSnap.data(), uid: user.uid });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // const handleLogout = async () => {
  //   await signOut(auth);
  //   navigate("/login");
  // };

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


  const updatePhone = async () => {
    try {
      const ref = doc(db, "users", userData.uid);

      await updateDoc(ref, {
        phone: newPhone,
      });

      setUserData({ ...userData, phone: newPhone });
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>No profile data found</p>;

  return (
    <Page>
      <Wrapper>
        {/* PROFILE PANEL */}
        <ProfilePanel>
          <Avatar>👤</Avatar>
          <Name>{userData.name || "User"}</Name>
          <Email>{userData.email}</Email>

          <InfoItem><FaIdCard /> ID: {userData.uid}</InfoItem>
          <InfoItem><FaUser /> Role: {userData.role}</InfoItem>
          <InfoItem><FaPhone /> Phone: {userData.phone || "N/A"}</InfoItem>

          <EditButton
            onClick={() => {
              setNewPhone(userData.phone || "");
              setShowModal(true);
            }}
          >
            <FaEdit /> Edit Phone
          </EditButton>
<br/>
          
        </ProfilePanel>

       

        {/* ACTIONS */}
        <ActionArea>
          <Title>Actions</Title>
         <Grid>


  <ActionCard onClick={() => setActivePage('chats')}>
    <Icon><FaComments /></Icon>
    <Label>Customer Chats</Label>
    <Desc>View and reply to customer chats</Desc>
  </ActionCard>


    <ActionCard onClick={() => setActivePage('addadmin')}>
    <Icon><FaComments /></Icon>
    <Label>Add Admin</Label>
    {/* <Desc>View and reply to customer chats</Desc> */}
  </ActionCard>





  <ActionCard onClick={() => setActivePage('hosting')}>
    <Icon><FaServer /></Icon>
    <Label>Manage Site Hosting</Label>
  </ActionCard>

  <ActionCard onClick={handleLogout}>
    <Icon style={{ color: "red" }}><FaSignOutAlt /></Icon>
    <Label>Logout</Label>
    <Desc>Sign out securely</Desc>
  </ActionCard>
</Grid>
        </ActionArea>
      </Wrapper>

      {/* MODAL */}
      {showModal && (
        <ModalOverlay>
          <ModalBox>
            <ModalTitle>Edit Phone Number</ModalTitle>

            <ModalInput
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="Enter new phone number"
            />

            <ModalActions>
              <SaveBtn onClick={updatePhone}>Save</SaveBtn>
              <CancelBtn onClick={() => setShowModal(false)}>
                Cancel
              </CancelBtn>
            </ModalActions>
          </ModalBox>
        </ModalOverlay>
      )}
    </Page>
  );
};

export default Profile;