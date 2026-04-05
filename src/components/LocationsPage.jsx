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
  max-width: 650px;
`;

/* SECTION */
const Section = styled.div`
  max-width: 1200px;
  margin: 70px auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  font-size: 30px;
  margin-bottom: 30px;
`;

/* MAP / COVERAGE */
const CoverageBox = styled.div`
  height: 320px;
  border-radius: 12px;
  overflow: hidden;
`;

/* STATS */
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media(max-width:900px){
    grid-template-columns: 1fr 1fr;
  }
`;

const StatCard = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
`;

const StatNumber = styled.h2`
  color: #4D148C;
  margin-bottom: 5px;
`;

const StatLabel = styled.p`
  color: #555;
`;

/* REGIONS */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;

  @media(max-width:900px){
    grid-template-columns: 1fr;
  }
`;

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

/* CAPABILITIES */
const FeatureStrip = styled.div`
  background: white;
  padding: 50px 20px;
`;

const FeatureGrid = styled.div`
  max-width: 1100px;
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

const NetworkPage = () => {
  return (
    <Page>

      {/* HERO */}
      <Hero>
        <HeroContent>
          <Title>Our Global Network</Title>
          <Subtitle>
            Connecting businesses and people across cities, countries, and continents with a powerful logistics network.
          </Subtitle>
        </HeroContent>
      </Hero>

      {/* COVERAGE MAP */}
      <Section>
        <SectionTitle>Global Coverage</SectionTitle>
      <CoverageBox>
  <img
    src="https://images.unsplash.com/photo-1526779259212-939e64788e3c"
    alt="World Map"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }}
  />
</CoverageBox>
      </Section>

      {/* STATS */}
      <Section>
        <SectionTitle>Network Reach</SectionTitle>

        <StatsGrid>
          <StatCard>
            <StatNumber>220+</StatNumber>
            <StatLabel>Countries Served</StatLabel>
          </StatCard>

          <StatCard>
            <StatNumber>500K+</StatNumber>
            <StatLabel>Daily Shipments</StatLabel>
          </StatCard>

          <StatCard>
            <StatNumber>99%</StatNumber>
            <StatLabel>On-Time Delivery</StatLabel>
          </StatCard>

          <StatCard>
            <StatNumber>24/7</StatNumber>
            <StatLabel>Operations</StatLabel>
          </StatCard>
        </StatsGrid>
      </Section>

      {/* REGIONS */}
      <Section>
        <SectionTitle>Key Regions</SectionTitle>

        <Grid>
          <Card>
            <CardTitle>Africa</CardTitle>
            <CardText>
              Extensive delivery coverage across major cities and growing regions.
            </CardText>
          </Card>

          <Card>
            <CardTitle>Europe</CardTitle>
            <CardText>
              Fast and efficient shipping between all European countries.
            </CardText>
          </Card>

          <Card>
            <CardTitle>North America</CardTitle>
            <CardText>
              Advanced logistics infrastructure for rapid delivery.
            </CardText>
          </Card>

          <Card>
            <CardTitle>Asia</CardTitle>
            <CardText>
              Expanding network supporting global trade and commerce.
            </CardText>
          </Card>

          <Card>
            <CardTitle>Middle East</CardTitle>
            <CardText>
              Strategic hubs connecting international shipments.
            </CardText>
          </Card>

          <Card>
            <CardTitle>South America</CardTitle>
            <CardText>
              Reliable delivery solutions across emerging markets.
            </CardText>
          </Card>
        </Grid>
      </Section>

      {/* CAPABILITIES */}
      <FeatureStrip>
        <FeatureGrid>
          <Feature>
            🌍
            <FeatureTitle>Global Reach</FeatureTitle>
          </Feature>

          <Feature>
            ✈️
            <FeatureTitle>Air Freight</FeatureTitle>
          </Feature>

          <Feature>
            🚚
            <FeatureTitle>Ground Transport</FeatureTitle>
          </Feature>

          <Feature>
            📦
            <FeatureTitle>Smart Logistics</FeatureTitle>
          </Feature>
        </FeatureGrid>
      </FeatureStrip>

    </Page>
  );
};

export default NetworkPage;