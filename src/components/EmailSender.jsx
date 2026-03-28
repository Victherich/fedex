import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  max-width: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
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

export default function EmailSender() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = async () => {
    if (!email || !message || !link) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    const payload = {
      to: email,
      subject: "Shipment Update Notification", // HARD CODED SUBJECT
      message,
      link,
    };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Email sent successfully");
      } else {
        alert("Failed to send email");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending email");
    }

    setLoading(false);
  };

  return (
    <Container>
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
      />

      <Input
        placeholder="Proceed Link (URL)"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <Button onClick={sendEmail}>
        {loading ? "Sending..." : "Send Email"}
      </Button>
    </Container>
  );
}