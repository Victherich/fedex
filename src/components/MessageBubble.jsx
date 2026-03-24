import React from "react";
import styled from "styled-components";

const Bubble = styled.div`
  max-width: 70%;
  margin: 5px 0;
  padding: 10px;
  border-radius: 10px;
  align-self: ${({ sender }) =>
    sender === "customer" ? "flex-end" : "flex-start"};
  background: ${({ sender }) =>
    sender === "customer" ? "#4D148C" : "#eee"};
  color: ${({ sender }) =>
    sender === "customer" ? "white" : "black"};
`;

const MessageBubble = ({ msg }) => {
  return <Bubble sender={msg.sender}>{msg.text}</Bubble>;
};

export default MessageBubble;