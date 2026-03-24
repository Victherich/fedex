import React, { createContext, useState } from 'react'

export const Context = createContext();

const ContextProvider = ({children})=>{

    const [openChatModal, setOpenChatModal] = useState(false)
      // ✅ State to control modal visibility
  const [showTrackerModal, setShowTrackerModal] = useState(false);

  // ✅ State to store the tracking number input by user
  const [trackingNumber, setTrackingNumber] = useState("");

    return(
        <Context.Provider value={{openChatModal, 
        setOpenChatModal,
        trackingNumber,
        showTrackerModal,
        setShowTrackerModal,
        setTrackingNumber
        }}>
{children}
        </Context.Provider>
    )
}

export default ContextProvider