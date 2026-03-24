import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaCheckCircle, FaTruck, FaBox, FaMapMarkerAlt, FaHome } from "react-icons/fa";
import Swal from "sweetalert2";
import { Context } from "./Context";

const primary = "#4D148C";
const secondary = "white";

/* ================= STYLES ================= */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  width: 90%;
  max-width: 700px;
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
`;

const Title = styled.h2`
  color: ${primary};
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  font-size: 1rem;
`;

const Button = styled.button`
  background: ${primary};
  color: white;
  padding: 12px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  margin-bottom: 20px;
`;

const CloseButton = styled(Button)`
  background: #ccc;
  color: black;
`;

const Timeline = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 30px;
  padding: 0 10px;

  &::after {
    content: "";
    position: absolute;
    top: 24px;
    left: 10%;
    right: 10%;
    height: 4px;
    background: #eee;
    z-index: 0;
  }
`;

const Stage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  width: 14%;
`;

const IconWrapper = styled.div`
  font-size: 24px;
  color: ${({ active }) => (active ? secondary : "#ccc")};
  background: ${({ active }) => (active ? "#4D148C" : "#eee")};
  padding: 10px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-size: 0.8rem;
  text-align: center;
  font-weight:bold;
  color: ${({ active }) => (active ? primary : "#999")};
`;

const ShipmentInfo = styled.div`
  margin-top: 30px;
  background: #fafafa;
  padding: 15px;
  border-radius: 12px;
  border: 1px solid #eee;
`;

/* ================= COMPONENT ================= */

const stages = [
  { key: "Pending", label: "Pending", icon: <FaBox /> },
  { key: "Confirmed", label: "Confirmed", icon: <FaCheckCircle /> },
  { key: "Picked Up", label: "Picked Up", icon: <FaTruck /> },
  { key: "Processing", label: "Processing", icon: <FaMapMarkerAlt /> },
  { key: "In Transit", label: "In Transit", icon: <FaTruck /> },
  { key: "Arrived at Hub", label: "Arrived at Hub", icon: <FaMapMarkerAlt /> },
  { key: "Out for Delivery", label: "Out for Delivery", icon: <FaTruck /> },
  { key: "Delivered", label: "Delivered", icon: <FaHome /> },
];

export default function ShipmentTrackerModal({ isOpen, onClose}) {
 const {trackingNumber, setTrackingNumber} = useContext(Context);
//   const [trackingNumber, setTrackingNumber] = useState(initialTrackingNumber || "");
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false); 

  const fetchShipment = async () => {
    if (!trackingNumber) return;
    setLoading(true);

    const q = query(collection(db, "shipments"), where("trackingNumber", "==", trackingNumber));
    const snap = await getDocs(q);

    if (snap.empty) {
      Swal.fire("Not Found", "No shipment found with this tracking number.", "error");
      setShipment(null);
    } else {
      setShipment(snap.docs[0].data());
    }

    setLoading(false);
  };


  useEffect(()=>{
fetchShipment();
  },[isOpen])

  const currentStageIndex = shipment ? stages.findIndex(s => s.key === shipment.status) : 0;

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalBox>
        <Title>Shipment Tracker</Title>

        <Input
          placeholder="Enter Tracking Number..."
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
        />
        <Button onClick={fetchShipment}>Track Shipment</Button>
        <CloseButton onClick={onClose}>Close</CloseButton>

        {loading && <p>Loading...</p>}

        {shipment && (
          <>
            <Timeline>
              {stages.map((stage, i) => (
                <Stage key={stage.key}>
                  <IconWrapper active={i <= currentStageIndex}>{stage.icon}</IconWrapper>
                  <Label active={i <= currentStageIndex}>{stage.label}</Label>
                </Stage>
              ))}
            </Timeline>

            <ShipmentInfo>
              <p><b style={{color:"#4D148C"}}>Tracking Number:</b> {shipment.trackingNumber}</p>
              <p><b style={{color:"#4D148C"}}>Sender:</b> {shipment.senderName} ({shipment.senderEmail}, {shipment.senderPhone})</p>
              <p><b style={{color:"#4D148C"}}>Receiver:</b> {shipment.receiverName} ({shipment.receiverEmail}, {shipment.receiverPhone})</p>
              <p><b style={{color:"#4D148C"}}>Delivery Type:</b> {shipment.deliveryType}</p>
              <p><b style={{color:"#4D148C"}}>Status:</b> {shipment.status}</p>
              <p><b style={{color:"#4D148C"}}>Last Updated:</b> {new Date(shipment.createdAt?.seconds * 1000 || shipment.createdAt).toLocaleString()}</p>
            </ShipmentInfo>
          </>
        )}
      </ModalBox>
    </Overlay>
  );
}