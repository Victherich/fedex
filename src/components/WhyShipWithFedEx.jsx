import React from 'react';
import styled from 'styled-components';
import p8 from '../Images/p8.jpg'

const WhyShipSection = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 60px 20px;
  font-family: 'Roboto', sans-serif;
  color: #333;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 40px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainHeading = styled.h2`
  font-size: 42px;
  font-weight: 300;
  margin-bottom: 40px;
  color: #444;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.div`
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h4`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
  line-height: 1.3;
`;

const FeatureText = styled.p`
  font-size: 15px;
  line-height: 1.5;
  font-weight: 300;
  color: #555;
  margin: 0;
`;

const InlineLink = styled.a`
  color: #333;
  text-decoration: underline;
  cursor: pointer;
`;

const ImageSide = styled.div`

@media(max-width:768px){
display:none;
}
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const ImageSide2 = styled.div`
display:none;

@media(max-width:768px){
display:flex;
}
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const Footnotes = styled.div`
  margin-top: 30px;
  font-size: 12px;
  color: #666;
  font-weight: 300;
  line-height: 1.6;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const PrimaryButton = styled.button`
  background-color: #fff;
  border: 1px solid #ff6200; // FedEx Orange accent
  color: #ff6200;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #ff6200;
    color: #fff;
  }
`;

const WhyShipWithFedEx = () => {
  return (
    <WhyShipSection>
      <ContentGrid>
        <TextContent>

             <ImageSide2>
          <img 
            src={p8}
            alt="FedEx Professional Smiling" 
          />
        </ImageSide2>
          <MainHeading>Why ship with FedEx?</MainHeading>

          
       
          
          <FeaturesGrid>
            <FeatureItem>
              <FeatureTitle>Innovative solutions for reliability & speed</FeatureTitle>
              <FeatureText>
                Whether it's across states or worldwide, we prioritize the secure and swift arrival of your shipments.
              </FeatureText>
            </FeatureItem>

            <FeatureItem>
              <FeatureTitle>Premium shipping at professional rates</FeatureTitle>
              <FeatureText>
                When you need reliable delivery and careful handling, trust FedEx to get your items where they need to go on time.
              </FeatureText>
            </FeatureItem>

            <FeatureItem>
              <FeatureTitle>We ship everywhere*</FeatureTitle>
              <FeatureText>
                From major cities to remote locations, your goods can reach worldwide.
              </FeatureText>
            </FeatureItem>

            <FeatureItem>
              <FeatureTitle>FedEx can ship for less than the Post Office</FeatureTitle>
              <FeatureText>
                Two-day shipping, one flat rate. <InlineLink href="#">FedEx One Rate</InlineLink>®.**
              </FeatureText>
            </FeatureItem>
          </FeaturesGrid>

          <Footnotes>
            <p>*FedEx doesn't ship anywhere sanctioned by the U.S.</p>
            <p>**Exclusions apply. Visit the <InlineLink href="#">FedEx One Rate</InlineLink> page to learn more.</p>
          </Footnotes>
        </TextContent>

        <ImageSide>
          <img 
            src={p8}
            alt="FedEx Professional Smiling" 
          />
        </ImageSide>
      </ContentGrid>

      <ButtonWrapper>
        <PrimaryButton>Start Shipping Now</PrimaryButton>
      </ButtonWrapper>
    </WhyShipSection>
  );
};

export default WhyShipWithFedEx;