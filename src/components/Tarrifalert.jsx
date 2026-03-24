import React from 'react';
import styled from 'styled-components';

const AlertContainer = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  background-color: #f0f7fb; // Very light blue background
  border: 1px solid #007ab7; // FedEx blue border
  border-left: 6px solid #007ab7; // Thicker left accent border
  padding: 15px 25px;
  display: flex;
  align-items: center;
  gap: 15px;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 768px) {
    margin: 10px;
    padding: 12px 15px;
  }
`;

const IconWrapper = styled.div`
  color: #007ab7;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 28px;
    height: 28px;
  }
`;

const AlertText = styled.p`
  font-size: 16px;
  color: #333;
  margin: 0;
  font-weight: 300;
  line-height: 1.4;

  a {
    color: #333;
    text-decoration: underline;
    font-weight: 400;

    &:hover {
      color: #007ab7;
    }
  }
`;

const TariffAlert = () => {
  return (
    <AlertContainer>
      <IconWrapper>
        {/* Simple Info Icon SVG */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </IconWrapper>
      <AlertText>
        US Supreme Court Tariff Update. <a href="#">See how this may impact you.</a>
      </AlertText>
    </AlertContainer>
  );
};

export default TariffAlert;