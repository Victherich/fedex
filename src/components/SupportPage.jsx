import React from "react";
import styled from "styled-components";

/* PAGE */
const Page = styled.div`
  font-family: 'Roboto', sans-serif;
  background: #f5f5f5;
`;

/* HERO */
const Hero = styled.div`
  background: linear-gradient(135deg, #4D148C, #6a1bb1);
  color: white;
  padding: 90px 20px;
`;

const HeroContent = styled.div`
  max-width: 1100px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 46px;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 20px;
  opacity: 0.9;
`;

/* SECTION */
const Section = styled.div`
  max-width: 1100px;
  margin: 60px auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 25px;
`;

/* GRID */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media(max-width:900px){
    grid-template-columns: 1fr;
  }
`;

/* CARD */
const Card = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  transition: 0.25s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h3`
  margin-bottom: 10px;
`;

const CardText = styled.p`
  color: #555;
`;

/* FAQ */
const FAQItem = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const Question = styled.h4`
  margin-bottom: 8px;
`;

const Answer = styled.p`
  color: #555;
`;

/* CONTACT INFO */
const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media(max-width:900px){
    grid-template-columns: 1fr;
  }
`;

const ContactCard = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
`;

const SupportPage = () => {
  return (
    <Page>

      {/* HERO */}
      <Hero>
        <HeroContent>
          <Title>Support Center</Title>
          <Subtitle>
            Find answers, get help, and explore support resources for your shipments.
          </Subtitle>
        </HeroContent>
      </Hero>

      {/* HELP CATEGORIES */}
      <Section>
        <SectionTitle>How Can We Help?</SectionTitle>

        <Grid>
          <Card>
            <CardTitle>Tracking Issues</CardTitle>
            <CardText>Get help with tracking your shipment and delivery updates.</CardText>
          </Card>

          <Card>
            <CardTitle>Shipping Assistance</CardTitle>
            <CardText>Learn about shipping options, delays, and delivery times.</CardText>
          </Card>

          <Card>
            <CardTitle>Account Support</CardTitle>
            <CardText>Manage your account, login issues, and preferences.</CardText>
          </Card>

          <Card>
            <CardTitle>Billing & Payments</CardTitle>
            <CardText>Understand charges, invoices, and payment methods.</CardText>
          </Card>

          <Card>
            <CardTitle>Returns</CardTitle>
            <CardText>Information about returning shipments and processes.</CardText>
          </Card>

          <Card>
            <CardTitle>Technical Issues</CardTitle>
            <CardText>Resolve website or system-related problems.</CardText>
          </Card>
        </Grid>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionTitle>Frequently Asked Questions</SectionTitle>

        <FAQItem>
          <Question>Where is my package?</Question>
          <Answer>
            Use the tracking feature to get real-time updates on your shipment status.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>How long does delivery take?</Question>
          <Answer>
            Delivery times depend on the shipping service selected and destination.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>Can I change my delivery address?</Question>
          <Answer>
            Address changes may be possible depending on the shipment status.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>What if my package is delayed?</Question>
          <Answer>
            Delays can occur due to weather or logistics issues. Updates will be provided.
          </Answer>
        </FAQItem>
      </Section>

      {/* CONTACT INFO */}
      <Section>
        <SectionTitle>Contact Support</SectionTitle>

        <ContactGrid>
          <ContactCard>
            📞
            <h3>Phone Support</h3>
            <p>Available during business hours for urgent issues.</p>
          </ContactCard>

          <ContactCard>
            💬
            <h3>Live Chat</h3>
            <p>Chat with our support team for quick assistance.</p>
          </ContactCard>

          <ContactCard>
            📧
            <h3>Email Support</h3>
            <p>Send us your queries and get a response within 24 hours.</p>
          </ContactCard>
        </ContactGrid>
      </Section>

    </Page>
  );
};

export default SupportPage;