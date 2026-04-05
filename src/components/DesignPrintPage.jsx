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
  max-width: 600px;
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

/* GRID */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;

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
  cursor: default;

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

/* SHOWCASE STRIP */
const Showcase = styled.div`
  background: white;
  padding: 60px 20px;
`;

const ShowcaseGrid = styled.div`
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media(max-width: 900px){
    grid-template-columns: 1fr 1fr;
  }
`;

const ShowcaseItem = styled.div`
  height: 120px;
  border-radius: 10px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #555;
`;

/* PROCESS */
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

const DesignPrintPage = () => {
  return (
    <Page>

      {/* HERO */}
      <Hero>
        <HeroContent>
          <Title>Design & Print</Title>
          <Subtitle>
            Professional printing and design solutions for businesses and individuals.
          </Subtitle>
        </HeroContent>
      </Hero>

      {/* SERVICES */}
      <Section>
        <SectionTitle>What You Can Print</SectionTitle>

        <Grid>
          <Card>
            <CardTitle>Business Cards</CardTitle>
            <CardText>Make lasting impressions with premium card designs.</CardText>
          </Card>

          <Card>
            <CardTitle>Flyers & Posters</CardTitle>
            <CardText>Promote your events and products with bold prints.</CardText>
          </Card>

          <Card>
            <CardTitle>Banners</CardTitle>
            <CardText>Large format prints for maximum visibility.</CardText>
          </Card>

          <Card>
            <CardTitle>Documents</CardTitle>
            <CardText>High-quality printing for reports and presentations.</CardText>
          </Card>

          <Card>
            <CardTitle>Marketing Materials</CardTitle>
            <CardText>Brochures, catalogs, and branded assets.</CardText>
          </Card>

          <Card>
            <CardTitle>Custom Projects</CardTitle>
            <CardText>Tailored printing solutions for unique needs.</CardText>
          </Card>
        </Grid>
      </Section>

      {/* SHOWCASE */}
      <Showcase>
        <SectionTitle style={{ textAlign: "center" }}>
          Print Samples
        </SectionTitle>

        <ShowcaseGrid>
          <ShowcaseItem>Cards</ShowcaseItem>
          <ShowcaseItem>Flyers</ShowcaseItem>
          <ShowcaseItem>Posters</ShowcaseItem>
          <ShowcaseItem>Banners</ShowcaseItem>
        </ShowcaseGrid>
      </Showcase>

      {/* PROCESS */}
      <Section>
        <SectionTitle>How It Works</SectionTitle>

        <Steps>
          <Step>
            <StepNumber>1</StepNumber>
            <h3>Choose Design</h3>
            <p>Select from templates or bring your own design.</p>
          </Step>

          <Step>
            <StepNumber>2</StepNumber>
            <h3>We Print</h3>
            <p>High-quality printing using advanced equipment.</p>
          </Step>

          <Step>
            <StepNumber>3</StepNumber>
            <h3>Ready for Use</h3>
            <p>Your prints are prepared and ready to go.</p>
          </Step>
        </Steps>
      </Section>

      {/* FEATURES */}
      <FeatureStrip>
        <FeatureGrid>
          <Feature>
            🎨
            <FeatureTitle>Custom Designs</FeatureTitle>
          </Feature>

          <Feature>
            🖨️
            <FeatureTitle>High Quality</FeatureTitle>
          </Feature>

          <Feature>
            ⚡
            <FeatureTitle>Fast Turnaround</FeatureTitle>
          </Feature>

          <Feature>
            📄
            <FeatureTitle>Wide Formats</FeatureTitle>
          </Feature>
        </FeatureGrid>
      </FeatureStrip>

    </Page>
  );
};

export default DesignPrintPage;