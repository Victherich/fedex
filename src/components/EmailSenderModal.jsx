import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const Modal = styled.div`
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  position: relative;
`;

const CloseBtn = styled.span`
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
  font-size: 18px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  height: 120px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #4D148C;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export default function EmailSenderModal({ isOpen, onClose, email2, trackingNumber }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("https://fedex-87e86.web.app/");
  const [loading, setLoading] = useState(false);

  console.log(email)



    useEffect(() => {
    if (email2) setEmail(email2);
  }, [email2]);


  
useEffect(() => {
  if (trackingNumber) {
    setMessage(
      `Dear Valued Customer,

Greetings from FedEx.

Your shipment has been successfully registered and is now being processed for dispatch.

You can track your package using the tracking number below.

Tracking number: ${trackingNumber}

Thank you for choosing FedEx.`
    );
  }
}, [trackingNumber]);



  if (!isOpen) return null;

  const sendEmail = async () => {
    if (!email || !message || !link) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://backend-mailer-1-five.vercel.app/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message, link }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({ text: "✅ Email sent successfully", icon: "success" });
        setEmail("");
        setMessage("");
        onClose(); // close modal after success
      } else {
        alert("❌ " + (data.error || "Failed"));
      }
    } catch (err) {
      console.error(err);
      alert("Error sending email");
    }

    setLoading(false);
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>✖</CloseBtn>

        <h3>Send Email to Customer</h3>

        <Input
          placeholder="Customer Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
        />

        <TextArea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled
        />

        <Input
          placeholder="Proceed Link (URL)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          disabled
        />

        <Button onClick={sendEmail}>
          {loading ? "Sending..." : "Send Email"}
        </Button>
      </Modal>
    </Overlay>
  );
}