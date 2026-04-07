// import React, { useContext, useEffect, useState } from "react";
// import styled from "styled-components";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../firebaseConfig";
// import { FaCheckCircle, FaTruck, FaBox, FaMapMarkerAlt, FaHome, FaTimes } from "react-icons/fa";
// import Swal from "sweetalert2";
// import { Context } from "./Context";

// const primary = "#4D148C";
// const secondary = "white";

// /* ================= STYLES ================= */

// const Overlay = styled.div`
//   position: fixed;
//   inset: 0;
//   background: rgba(0,0,0,0.5);
//   backdrop-filter: blur(4px);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// `;

// const ModalBox = styled.div`
//   width: 90%;
//   max-width: 700px;
//   background: white;
//   border-radius: 20px;
//   padding: 2rem;
//   max-height: 90vh;
//   overflow-y: auto;
//   box-shadow: 0 15px 30px rgba(0,0,0,0.2);
// `;

// const Title = styled.h2`
//   color: ${primary};
//   text-align: center;
//   margin-bottom: 1.5rem;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 12px;
//   border-radius: 12px;
//   border: 1px solid #ddd;
//   margin-bottom: 20px;
//   font-size: 1rem;
// `;

// const Button = styled.button`
//   background: ${primary};
//   color: white;
//   padding: 12px;
//   border-radius: 10px;
//   border: none;
//   cursor: pointer;
//   font-weight: bold;
//   width: 100%;
//   margin-bottom: 20px;
// `;

// const CloseButton = styled(Button)`
//   background: #ccc;
//   color: black;
// `;

// const Timeline = styled.div`
//   display: flex;
//   justify-content: space-between;
//   position: relative;
//   margin-top: 30px;
//   // padding: 0 10px;

//   &::after {
//     content: "";
//     position: absolute;
//     top: 18px;
//     left: 3%;
//     right: 3%;
//     height: 6px;
//     background: #eee;
//     z-index: 0;
//   }
// `;

// const Stage = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   z-index: 1;
//   width: 1%;
// `;

// const IconWrapper = styled.div`
//   font-size: 15px;
//   color: ${({ active }) => (active ? secondary : "#ccc")};
//   background: ${({ active }) => (active ? "#4D148C" : "#eee")};
//   padding: 10px;
//   border-radius: 50%;
//   margin-bottom: 10px;
// `;

// const Label = styled.span`
//   font-size: 0.8rem;
//   text-align: center;
//   font-weight:bold;
//   color: ${({ active }) => (active ? primary : "#999")};
// `;

// const ShipmentInfo = styled.div`
//   margin-top: 30px;
//   background: #fafafa;
//   padding: 15px;
//   border-radius: 12px;
//   border: 1px solid #eee;
// `;

// /* ================= COMPONENT ================= */

// const stages = [
//   { key: "Pending", label: "Pending", icon: <FaBox /> },
//   { key: "Confirmed", label: "Confirmed", icon: <FaCheckCircle /> },
//   { key: "On Transit", label: "On Transit", icon: <FaTruck /> },
//   { key: "Awaiting Custom Clearance", label: "Awaiting Custom Clearance", icon: <FaMapMarkerAlt /> },
//   // { key: "In Transit", label: "In Transit", icon: <FaTruck /> },
//   // { key: "Arrived at Hub", label: "Arrived at Hub", icon: <FaMapMarkerAlt /> },
//   { key: "Out for Delivery", label: "Out for Delivery", icon: <FaTruck /> },
//   { key: "Delivered", label: "Delivered", icon: <FaHome /> },
//    { key: "Cancelled", label: "Cancelled", icon: <FaTimes /> },
// ];




// export default function ShipmentTrackerModal({ isOpen, onClose}) {
//  const {trackingNumber, setTrackingNumber} = useContext(Context);
// //   const [trackingNumber, setTrackingNumber] = useState(initialTrackingNumber || "");
//   const [shipment, setShipment] = useState(null);
//   const [loading, setLoading] = useState(false); 

//   const fetchShipment = async () => {
//     if (!trackingNumber) return;
//     setLoading(true);

//     const q = query(collection(db, "shipments"), where("trackingNumber", "==", trackingNumber));
//     const snap = await getDocs(q);

//     if (snap.empty) {
//       Swal.fire("Not Found", "No shipment found with this tracking number.", "error");
//       setShipment(null);
//     } else {
//       setShipment(snap.docs[0].data());
//     }

//     setLoading(false);
//   };


//   useEffect(()=>{
// fetchShipment();
//   },[isOpen])

//   const currentStageIndex = shipment ? stages.findIndex(s => s.key === shipment.status) : 0;

//   if (!isOpen) return null;

//   return (
//     <Overlay>
//       <ModalBox>
//         <Title>Shipment Tracker</Title>

//         <Input
//           placeholder="Enter Tracking Number..."
//           value={trackingNumber}
//           onChange={(e) => setTrackingNumber(e.target.value)}
//         />
//         <Button onClick={fetchShipment}>Track Shipment</Button>
//         <CloseButton onClick={onClose}>Close</CloseButton>

//         {loading && <p>Loading...</p>}

//         {shipment && (
//           <>
//             <Timeline>
//               {stages.map((stage, i) => (
//                 <Stage key={stage.key}>
//                   <IconWrapper active={i <= currentStageIndex}>{stage.icon}</IconWrapper>
//                   <Label active={i <= currentStageIndex}>{stage.label}</Label>
//                 </Stage>
//               ))}
//             </Timeline>

//             <ShipmentInfo>
//               <p><b style={{color:"#4D148C"}}>Tracking Number:</b> {shipment.trackingNumber}</p>
//               <p><b style={{color:"#4D148C"}}>Sender:</b> {shipment.senderName} ({shipment.senderEmail}, {shipment.senderPhone})</p>
//               <p><b style={{color:"#4D148C"}}>Receiver:</b> {shipment.receiverName} ({shipment.receiverEmail}, {shipment.receiverPhone})</p>
//               <p><b style={{color:"#4D148C"}}>Delivery Type:</b> {shipment.deliveryType}</p>
//               <p><b style={{color:"#4D148C"}}>Status:</b> {shipment.status}</p>
//               <p><b style={{color:"#4D148C"}}>Last Updated:</b> {new Date(shipment.createdAt?.seconds * 1000 || shipment.createdAt).toLocaleString()}</p>
//             </ShipmentInfo>
//           </>
//         )}
//       </ModalBox>
//     </Overlay>
//   );
// }







import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import {
  FaCheckCircle,
  FaTruck,
  FaBox,
  FaMapMarkerAlt,
  FaHome,
  FaTimes,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { Context } from "./Context";

const primary = "#4D148C";

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

  @media (max-width: 428px) {
    width: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: 0;
    padding: 1rem;
  }
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
  margin-bottom: 15px;
`;

const Button = styled.button`
  background: ${primary};
  color: white;
  padding: 12px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;
`;

const CloseButton = styled(Button)`
  background: #ccc;
  color: black;
`;

/* ===== TIMELINE ===== */

const Timeline = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 30px;
  flex-wrap: wrap;
  gap: 15px;

  &::after {
    content: "";
    position: absolute;
    top: 18px;
    left: 5%;
    right: 5%;
    height: 4px;
    background: #eee;
    z-index: 0;
  }

  @media (max-width: 600px) {
    flex-direction: column;

    &::after {
      display: none;
    }
  }
`;

const Stage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  flex: 1;
  min-width: 80px;
`;

const IconWrapper = styled.div`
  font-size: 14px;
  color: ${({ active }) => (active ? "white" : "#ccc")};
  background: ${({ active }) => (active ? primary : "#eee")};
  padding: 10px;
  border-radius: 50%;
`;

const Label = styled.span`
  font-size: 0.75rem;
  text-align: center;
  font-weight: bold;
  color: ${({ active }) => (active ? primary : "#999")};
  margin-top: 5px;
  word-break: break-word;
`;

/* ===== GROUPED INFO ===== */

const Section = styled.div`
  margin-top: 20px;
  padding: 15px;
  border-radius: 12px;
  background: #fafafa;
  border: 1px solid #eee;
`;

const SectionTitle = styled.h4`
  margin-bottom: 10px;
  color: ${primary};
`;

const Row = styled.div`
  margin-bottom: 6px;
  font-size: 0.9rem;
`;

/* ================= STAGES ================= */

const stages = [
  { key: "Pending", label: "Pending", icon: <FaBox /> },
  { key: "Confirmed", label: "Confirmed", icon: <FaCheckCircle /> },
  { key: "On Transit", label: "On Transit", icon: <FaTruck /> },
  { key: "Awaiting Custom Clearance", label: "Customs", icon: <FaMapMarkerAlt /> },
  { key: "Out for Delivery", label: "Out", icon: <FaTruck /> },
  { key: "Delivered", label: "Delivered", icon: <FaHome /> },
  { key: "Cancelled", label: "Cancelled", icon: <FaTimes /> },
];

/* ================= COMPONENT ================= */

export default function ShipmentTrackerModal({ isOpen, onClose }) {
  const { trackingNumber, setTrackingNumber } = useContext(Context);
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchShipment = async () => {
    if (!trackingNumber) return;

    setLoading(true);

    const q = query(
      collection(db, "shipments"),
      where("trackingNumber", "==", trackingNumber)
    );

    const snap = await getDocs(q);

    if (snap.empty) {
      Swal.fire("Not Found", "No shipment found.", "error");
      setShipment(null);
    } else {
      setShipment(snap.docs[0].data());
    }

    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) fetchShipment();
  }, [isOpen]);

  const currentStageIndex = shipment
    ? stages.findIndex((s) => s.key === shipment.status)
    : 0;

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalBox>
        <Title>Shipment Tracker</Title>

       <Input
  placeholder="Enter Tracking Number..."
  value={trackingNumber}
  onChange={(e) => setTrackingNumber(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  }}
/>

        <Button onClick={fetchShipment}>Track Shipment</Button>
        <CloseButton onClick={onClose}>Close</CloseButton>

        {loading && <p>Loading...</p>}

        {shipment && (
          <>
            {/* TIMELINE */}
            <Timeline>
              {stages.map((stage, i) => (
                <Stage key={stage.key}>
                  <IconWrapper active={i <= currentStageIndex}>
                    {stage.icon}
                  </IconWrapper>
                  <Label active={i <= currentStageIndex}>
                    {stage.label}
                  </Label>
                </Stage>
              ))}
            </Timeline>

            {/* GROUPED DETAILS */}
<>
  {/* 🧾 SHIPMENT INFO */}
  <Section>
    <SectionTitle>Shipment Info</SectionTitle>
    <Row><b>Tracking Number:</b> {shipment.trackingNumber}</Row>
    <Row><b>Status:</b> {shipment.status}</Row>
    <Row><b>Shipment Date:</b> {shipment.shipmentDate}</Row>
    <Row><b>Arrival Date:</b> {shipment.arrivalDate}</Row>
    <Row><b>Delivery Type:</b> {shipment.deliveryType}</Row>
    <Row>
      <b>Last Updated:</b>{" "}
      {new Date(
        shipment.createdAt?.seconds * 1000 || shipment.createdAt
      ).toLocaleString()}
    </Row>
  </Section>

  {/* 👤 SENDER */}
  <Section>
    <SectionTitle>Sender (Shipper)</SectionTitle>
    <Row><b>Name:</b> {shipment.senderName}</Row>
    <Row><b>Email:</b> {shipment.senderEmail}</Row>
    <Row><b>Phone:</b> {shipment.senderPhone}</Row>
    <Row><b>Address:</b> {shipment.senderAddress}</Row>
  </Section>

  {/* 📍 RECEIVER */}
  <Section>
    <SectionTitle>Receiver (Consignee)</SectionTitle>
    <Row><b>Name:</b> {shipment.receiverName}</Row>
    <Row><b>Email:</b> {shipment.receiverEmail}</Row>
    <Row><b>Phone:</b> {shipment.receiverPhone}</Row>
    <Row><b>Address:</b> {shipment.receiverAddress}</Row>
  </Section>

  {/* 📦 PACKAGE DETAILS */}
  <Section>
    <SectionTitle>Package Details</SectionTitle>
    <Row><b>Description:</b> {shipment.description}</Row>
    <Row><b>Quantity:</b> {shipment.quantity}</Row>
    <Row><b>Weight (kg):</b> {shipment.weight}</Row>
    <Row><b>Package Type:</b> {shipment.packageType}</Row>
      <Row><b>Current Location:</b> {shipment.currentLocation}</Row>
    <Row><b>Arrival Date and Time at current location:</b> {shipment.currentLocationDateTime}</Row>
  </Section>

  {/* 💰 PAYMENT */}
  <Section>
    <SectionTitle>Payment</SectionTitle>
    <Row><b>Declared Value:</b> {shipment.value}</Row>
    <Row><b>Payment Method:</b> {shipment.paymentMethod}</Row>
  </Section>

  {/* 🚚 DELIVERY */}
  <Section>
    <SectionTitle>Delivery</SectionTitle>
    <Row><b>Instructions:</b> {shipment.instructions}</Row>
  </Section>

  {/* 🌍 LOGISTICS / SYSTEM */}
  {/* <Section>
    <SectionTitle>Tracking & Logistics</SectionTitle>
    <Row><b>Origin:</b> {shipment.origin || "—"}</Row>
    <Row><b>Destination:</b> {shipment.destination || "—"}</Row>
    <Row><b>Courier:</b> {shipment.courier || "—"}</Row>
    <Row><b>Current Location:</b> {shipment.currentLocation || "—"}</Row>
  </Section> */}

  {/* 📊 META (if exists in DB) */}
  {/* <Section>
    <SectionTitle>Meta Data</SectionTitle>
    <Row><b>Created At:</b>{" "}
      {new Date(
        shipment.createdAt?.seconds * 1000 || shipment.createdAt
      ).toLocaleString()}
    </Row>
    <Row><b>Updated At:</b>{" "}
      {shipment.updatedAt
        ? new Date(
            shipment.updatedAt?.seconds * 1000 || shipment.updatedAt
          ).toLocaleString()
        : "—"}
    </Row>
  </Section> */}
</>
          </>
        )}

         {shipment&&<CloseButton style={{marginBottom:"50px"}} onClick={onClose}>Close</CloseButton>}
         
      </ModalBox>
    </Overlay>
  );
}