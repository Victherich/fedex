import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import ShipmentModal from "./ShipmentModal";
import Swal from "sweetalert2";
import EmailSenderModal from "./EmailSenderModal";

/* ================= STYLES ================= */

const Page = styled.div`
  padding: 2rem;
  background: #f8fafc;
  min-height: 100vh;
  position: relative;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #4d148c;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 15px;
  border: 1px solid #e5e7eb;
`;

const Text = styled.p`
  font-size: 0.9rem;
`;

const Meta = styled.div`
  font-size: 0.75rem;
  color: #64748b;
`;

const Actions = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;

const Btn = styled.button`
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  color: #4d148c;
`;

const AddButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  background: #4d148c;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
`;

/* ================= COMPONENT ================= */

export default function ManageShipments() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [email, setEmail]=useState('');
  const [trackingNumber, setTrackingNumber]=useState('');

  const [form, setForm] = useState({
    senderName: "",
    receiverName: "",
    status: "Pending",
  });

  const shipmentsRef = collection(db, "shipments");

const generateTrackingNumber = () => {
  return Date.now().toString();
};

  const fetchData = async () => {
    const snap = await getDocs(shipmentsRef);
    const list = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setData(list);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      Swal.fire({ title: "Saving...", didOpen: () => Swal.showLoading() });

      if (editingId) {
        await updateDoc(doc(db, "shipments", editingId), form);
      } else {
        await addDoc(shipmentsRef, {
          ...form,
          trackingNumber: generateTrackingNumber(),
          createdAt: new Date(),
        });
      }

      Swal.close();
      Swal.fire("Saved!", "", "success");

      setShowModal(false);
      setEditingId(null);
      fetchData();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete?",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    await deleteDoc(doc(db, "shipments", id));
    fetchData();
  };


  const filteredData = data.filter((item) => {
  const query = search.toLowerCase();
  return (
    (item.trackingNumber || "").toLowerCase().includes(query) ||
    (item.senderName || "").toLowerCase().includes(query) ||
    (item.receiverName || "").toLowerCase().includes(query) ||
    (item.senderEmail || "").toLowerCase().includes(query) ||
    (item.receiverEmail || "").toLowerCase().includes(query) ||
    (item.senderPhone || "").toLowerCase().includes(query) ||
    (item.receiverPhone || "").toLowerCase().includes(query)
  );
});

console.log(filteredData)

  return (
    <Page>
      <Title>Manage Shipments</Title>
      <input
  type="text"
  placeholder="Search by tracking number, sender name, receiver name, sender email, receiver email, sender phone, receiver phone..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    padding: "10px",
    marginBottom: "20px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
  }}
/>

      <Grid>
       {filteredData.map((item) => (
          <Card key={item.id}>
            <Text><b>Tracking:</b> {item.trackingNumber}</Text>
            <Text><b>Sender:</b> {item.senderName}</Text>
            <Text><b>Receiver:</b> {item.receiverName}</Text>
            <Text><b>Status:</b> {item.status}</Text>

            <Meta>{new Date(item.createdAt?.seconds * 1000).toDateString()}</Meta>

            <Actions>
              <Btn onClick={() => {
                setForm(item);
                setEditingId(item.id);
                setShowModal(true);
              }}>
                <FaEdit />
              </Btn>

              <Btn onClick={() => handleDelete(item.id)}>
                <FaTrash />
              </Btn>
              <Btn onClick={() => {
                setOpen(true);
                setEmail(item.receiverEmail);
                setTrackingNumber(item.trackingNumber);
                }}>
                Email customer
              </Btn>
            </Actions>
          </Card>
        ))}
      </Grid>

      <AddButton onClick={() => {
        setForm({});
        setEditingId(null);
        setShowModal(true);
      }}>
        <FaPlus /> Add
      </AddButton>

      {showModal && (
        <ShipmentModal
          form={form}
          setForm={setForm}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          editing={editingId}
        />
      )}


      <EmailSenderModal 
      isOpen={open} 
      onClose={() => setOpen(false)}
      email2={email}
      trackingNumber={trackingNumber}
      />
    </Page>
  );
}