import React, { createContext, useState } from 'react'

export const Context = createContext();

const ContextProvider = ({children})=>{

    const [openChatModal, setOpenChatModal] = useState(false)

    return(
        <Context.Provider value={{openChatModal, setOpenChatModal}}>
{children}
        </Context.Provider>
    )
}

export default ContextProvider