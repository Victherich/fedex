import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "./Context";

const Button = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #4D148C;
  color: white;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
`;

const ChatButton = () => {
const {setOpenChatModal}=useContext(Context)

  return <Button onClick={()=>setOpenChatModal(true)}>💬</Button>;
};

export default ChatButton;