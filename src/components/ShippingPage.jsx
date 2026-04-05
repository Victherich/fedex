import React from "react";
import styled from "styled-components";

/* PAGE */
const Page = styled.div`
  font-family: 'Roboto', sans-serif;
  background: #f5f5f5;
`;

/* HERO */
const Hero = styled.div`
  background: #4D148C;
  color: white;
  padding: 80px 20px;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 15px;
`;

const Subtitle = styled.p`
  font-size: 20px;
  opacity: 0.9;
  max-width: 600px;
`;

/* SECTION */
const Section = styled.div`
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 30px;
`;

/* GRID */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media(max-width: 900px){
    grid-template-columns: 1fr;
  }
`;

/* CARD */
const Card = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  transition: 0.25s;
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
  }
`;

const CardTitle = styled.h3`
  margin-bottom: 10px;
`;

const CardText = styled.p`
  color: #555;
`;

/* STEPS */
const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media(max-width:900px){
    grid-template-columns: 1fr;
  }
`;

const Step = styled.div`
  text-align: center;
`;

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  margin: auto;
  border-radius: 50%;
  background: #ff6200;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 15px;
`;

/* FEATURE STRIP */
const FeatureStrip = styled.div`
  background: white;
  padding: 50px 20px;
`;

const FeatureGrid = styled.div`
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media(max-width:900px){
    grid-template-columns: 1fr 1fr;
  }
`;

const Feature = styled.div`
  text-align: center;
`;

const FeatureTitle = styled.h4`
  margin-top: 10px;
`;

/* CTA */
const CTA = styled.div`
  background: #4D148C;
  color: white;
  padding: 60px 20px;
  text-align: center;
`;

const CTAButton = styled.button`
  background: #ff6200;
  border: none;
  padding: 14px 30px;
  margin-top: 20px;
  color: white;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const ShippingPage = () => {
  return (
    <Page>

      {/* HERO */}
      <Hero>
        <HeroContent>
          <Title>Fast & Reliable Shipping</Title>
          <Subtitle>
            Deliver packages across cities and continents with speed,
            precision, and trust.
          </Subtitle>
        </HeroContent>
      </Hero>

      {/* SERVICES */}
      <Section>
        <SectionTitle>Our Shipping Services</SectionTitle>

        <Grid>
          <Card>
            <CardTitle>Express Shipping</CardTitle>
            <CardText>Get your packages delivered within 1–2 business days.</CardText>
          </Card>

          <Card>
            <CardTitle>Standard Delivery</CardTitle>
            <CardText>Affordable and reliable shipping for everyday needs.</CardText>
          </Card>

          <Card>
            <CardTitle>International Shipping</CardTitle>
            <CardText>Ship globally with secure customs handling.</CardText>
          </Card>
        </Grid>
      </Section>

      {/* HOW IT WORKS */}
      <Section>
        <SectionTitle>How It Works</SectionTitle>

        <Steps>
          <Step>
            <StepNumber>1</StepNumber>
            <h3>Prepare Package</h3>
            <p>Securely pack your item and label it properly.</p>
          </Step>

          <Step>
            <StepNumber>2</StepNumber>
            <h3>Choose Service</h3>
            <p>Select the delivery speed that fits your needs.</p>
          </Step>

          <Step>
            <StepNumber>3</StepNumber>
            <h3>Track Delivery</h3>
            <p>Monitor your shipment in real time.</p>
          </Step>
        </Steps>
      </Section>

      {/* FEATURES */}
      <FeatureStrip>
        <FeatureGrid>
          <Feature>
            🚀
            <FeatureTitle>Fast Delivery</FeatureTitle>
          </Feature>

          <Feature>
            🌍
            <FeatureTitle>Global Reach</FeatureTitle>
          </Feature>

          <Feature>
            🔒
            <FeatureTitle>Secure Shipping</FeatureTitle>
          </Feature>

          <Feature>
            📦
            <FeatureTitle>Package Tracking</FeatureTitle>
          </Feature>
        </FeatureGrid>
      </FeatureStrip>

      {/* CTA */}
      <CTA>
        <h2>Ready to Ship?</h2>
        <p>Start your delivery journey with us today.</p>
        {/* <CTAButton>Get Started</CTAButton> */}
      </CTA>

    </Page>
  );
};

export default ShippingPage;