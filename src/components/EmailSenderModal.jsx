import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Context } from "./Context";

const Overlay = styled.div`
  // position: fixed;
  // top: 0;
  // left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
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

export default function EmailSenderModal({email2, status,editing, form }) {
  const {email, setEmail, message, setMessage,link ,loading, trackingNumber} = useContext(Context);
  // const [message, setMessage] = useState("");
  // const [link, setLink] = useState("https://www.apodelibrateddelivery.com");
  // const [loading, setLoading] = useState(false);

  console.log(email)



    useEffect(() => {
    if (email2) setEmail(email2);
  }, [email2]);


//   useEffect(() => {
//   if (isOpen) {
//     sendEmail(); // auto send when modal opens
//   }
// }, [isOpen]);


  
useEffect(() => {
  // if (trackingNumber) {
    setMessage(
      `Dear Valued Customer,

Greetings,

Your shipment has been successfully registered and is being processed.

You can track your package using the tracking number below. |

Tracking number: ${editing? form.trackingNumber:trackingNumber} | 
Current Status: ${status} | 

Thank you.`
    );
  // }
}, [trackingNumber,status]);



  // if (!isOpen) return null;

 

  return (
    <Overlay>
      <Modal onClick={(e) => e.stopPropagation()}>
        {/* <CloseBtn onClick={onClose}>✖</CloseBtn> */}

        <h3>Email to Customer</h3>

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
          // onChange={(e) => setLink(e.target.value)}
          disabled
        />

        {/* <Button onClick={sendEmail}>
          {loading ? "Sending..." : "Send Email"}
        </Button> */}
      </Modal>
    </Overlay>
  );
}