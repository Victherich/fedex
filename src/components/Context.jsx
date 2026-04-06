import React, { createContext, useContext, useState } from 'react'
import Swal from 'sweetalert2';

export const Context = createContext();

const ContextProvider = ({children})=>{

    const [openChatModal, setOpenChatModal] = useState(false)
      // ✅ State to control modal visibility
  const [showTrackerModal, setShowTrackerModal] = useState(false);

  // ✅ State to store the tracking number input by user
  const [trackingNumber, setTrackingNumber] = useState("");

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState("");
    const [link, setLink] = useState("https://globaldeliveryorg.vercel.app");
    const [loading, setLoading] = useState(false);
    



   const sendEmail = async () => {
    if (!email || !message || !link) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);
    Swal.fire({text:"sending email, please wait..."})
    Swal.showLoading();

    try {
      const res = await fetch("https://backend-mailer-1-five.vercel.app/api/contact", {
        //  const res = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message, link }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({ text: "✅ Email sent successfully", icon: "success" });
        // setEmail("");
        // setMessage("");
        // onClose(); // close modal after success
      } else {
        alert("❌ " + (data.error || "Failed"));
        Swal.fire({text:data.error||"Failed"})
      }
    } catch (err) {
      console.error(err);
      alert("Error sending email");
      Swal.fire({text:"Error sending email"})
    }

    setLoading(false);
  };


  const generateTrackingNumber = () => {
  const number = Date.now().toString();
  setTrackingNumber(number);
};





    return(
        <Context.Provider value={{openChatModal, 
        setOpenChatModal,
        trackingNumber,
        showTrackerModal,
        setShowTrackerModal,
        setTrackingNumber,
        email,setEmail,link,message,setMessage, loading, sendEmail,
    generateTrackingNumber
        }}>
{children}
        </Context.Provider>
    )
}

export default ContextProvider



// hoei uihb neig povk firebase nodemailer