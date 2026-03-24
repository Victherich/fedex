import React from 'react';
import styled from 'styled-components';
import p7 from '../Images/p7.jpg'

const ExpediteSection = styled.section`
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  font-family: 'Roboto', sans-serif;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column-reverse; /* Text under image on mobile */
    text-align: center;
  }
`;

const TextSide = styled.div`
  flex: 1;
`;

const ImageSide = styled.div`
  flex: 1;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }
`;

const Heading = styled.h2`
  font-size: 36px;
  font-weight: 300;
  color: #444;
  line-height: 1.2;
  margin-bottom: 25px;
`;

const Paragraph = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #555;
  font-weight: 300;
  margin-bottom: 30px;
`;

const CallToAction = styled.a`
  font-size: 16px;
  font-weight: 700;
  color: #007ab7;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    text-decoration: underline;
  }
`;

const ExpeditedShipping = () => {
  return (
    <ExpediteSection>
      <TextSide>
        <Heading>Expedite your shipments when timing matters most</Heading>
        <Paragraph>
          Some shipments just can’t wait for a later delivery. If your
          shipment is urgent or time-sensitive, you have options for
          getting it there fast—as fast as same day, in some cases. 
          Find the service that fits.
        </Paragraph>
        <CallToAction href="#">EXPLORE EXPEDITED SHIPPING</CallToAction>
      </TextSide>

      <ImageSide>
        <img 
          src={p7}
          alt="Customer at shipping counter" 
        />
      </ImageSide>
    </ExpediteSection>
  );
};

export default ExpeditedShipping;