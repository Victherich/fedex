import React from 'react';
import styled from 'styled-components';
import p1 from '../Images/p1.jpg'
import p2 from '../Images/p2.jpg'
import p3 from '../Images/p3.jpg'




// Container for the entire section
const Section = styled.section`
  padding: 60px 20px;
  font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 42px;
  font-weight: 300;
  color: #333;
  margin-bottom: 50px;
`;

// Responsive Grid
const Grid = styled.div`
  display: flex;
  gap: 30px;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Individual Card
const Card = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
  max-width: 380px;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 40px;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  margin-bottom: 25px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CardTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
  font-weight: 400;
`;

const CardDescription = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 25px;
  min-height: 80px; // Keeps buttons aligned on desktop
`;

const ActionLink = styled.a`
  font-size: 14px;
  font-weight: 700;
  color: #007ab7; // FedEx blue accent
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    text-decoration: underline;
  }
`;

const ClaritySection = () => {
  const features = [
    {
      id: 1,
      title: "Stay in control on the go",
      description: "With the FedEx® Mobile app, shipment details are on tap. Track packages in real time, get delivery alerts, and update your preferences wherever you are.",
      linkText: "DOWNLOAD THE APP",
      img: p1
    },
    {
      id: 2,
      title: "See shipments in one spot",
      description: "Headed out of town for spring break? FedEx Delivery Manager® lets you keep an eye on your shipments, redirect them, and get picture proof of delivery.",
      linkText: "ENROLL FOR FREE",
      img: p2
    },
    {
      id: 3,
      title: "Have packages held for free",
      description: "Request a vacation hold on deliveries for up to 14 days and pick them up when you're back. Simple, secure, and easy to set up ahead of time.",
      linkText: "SCHEDULE A VACATION HOLD",
      img:p3
    }
  ];

  return (
    <Section>
      <Title>Clarity for every delivery</Title>
      <Grid>
        {features.map((item) => (
          <Card key={item.id}>
            <ImageWrapper>
              <img src={item.img} alt={item.title} />
            </ImageWrapper>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
            <ActionLink href="#">{item.linkText}</ActionLink>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default ClaritySection;