import React from 'react';
import styled from 'styled-components';
import p4 from '../Images/p4.jpg'
import p5 from '../Images/p5.jpg'
import p6 from '../Images/p6.jpg'

const Container = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 20px;
  font-family: 'Roboto', sans-serif;
  color: #333;
`;

const MainTitle = styled.h2`
  text-align: center;
  font-size: 36px;
  font-weight: 300;
  margin-bottom: 50px;
  color: #444;
`;

const BusinessRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
  }
`;

const ImageContainer = styled.div`
  flex: 0 0 300px;
  height: 180px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    flex: 0 0 auto;
    width: 100%;
    max-width: 400px;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const RowTitle = styled.h3`
  font-size: 24px;
  font-weight: 300;
  color: #666;
  margin: 0 0 12px 0;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #555;
  margin-bottom: 15px;
`;

const ActionButton = styled.a`
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  color: #007ab7;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    text-decoration: underline;
  }
`;

const BusinessSolutions = () => {
  const solutions = [
    {
      title: "FedEx Vacay Your Way Sweepstakes is here!",
      desc: "Turn everyday shipments into chances to win a luxury vacation, weekend getaways, and additional prizes.",
      link: "REGISTER NOW",
      img: p4
    },
    {
      title: "Use returns to your advantage",
      desc: "Every return is a chance to shape how customers feel about your brand. In fact, nearly 66% say that a retailer's return policy influences whether they make a purchase.* FedEx makes it simple to offer the smooth, low-effort returns that customers want.",
      link: "VIEW RETURNS OPTIONS",
      img: p5
    },
    {
      title: "Turn your shipments into sweet rewards",
      desc: "Shipping with FedEx can pay off. Join FedEx Rewards to earn gift cards from name-brand retailers,** starting with a $10 gift card for your first eligible shipment. Open a FedEx account to get started.",
      link: "OPEN A FREE ACCOUNT",
      img:p6
    }
  ];

  return (
    <Container>
      <MainTitle>Put every shipment to work for your business</MainTitle>
      
      {solutions.map((item, index) => (
        <BusinessRow key={index}>
          <ImageContainer>
            <img src={item.img} alt={item.title} />
          </ImageContainer>
          <ContentContainer>
            <RowTitle>{item.title}</RowTitle>
            <Description>{item.desc}</Description>
            <ActionButton href="#">{item.link}</ActionButton>
          </ContentContainer>
        </BusinessRow>
      ))}
    </Container>
  );
};

export default BusinessSolutions;