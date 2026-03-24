import React from 'react';
import styled from 'styled-components';

const FooterInfoSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Roboto', sans-serif;
  color: #333;
`;

const InfoBlock = styled.div`
  margin-bottom: 30px;
`;

const InfoTitle = styled.h4`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #333;
`;

const InfoText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  font-weight: 300;
  color: #444;
  margin: 0;
`;

const Link = styled.a`
  color: #444;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #007ab7;
  }
`;

const DisclaimerSection = styled.div`
  margin-top: 40px;
  border-top: 1px solid #eee;
  padding-top: 20px;
`;

const DisclaimerText = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  font-weight: 300;

  a {
    color: #666;
    text-decoration: underline;
  }
`;

const FooterNotices = () => {
  return (
    <FooterInfoSection>
      {/* Rate and Surcharge Block */}
      <InfoBlock>
        <InfoTitle>FedEx rate and surcharge changes</InfoTitle>
        <InfoText>
          Learn more about <Link href="#">rate and surcharge changes</Link>—last updated 3/6/2026.
        </InfoText>
      </InfoBlock>

      {/* Money-back Guarantee Block */}
      <InfoBlock>
        <InfoTitle>FedEx money-back guarantee</InfoTitle>
        <InfoText>
          We offer a money-back guarantee for select services. This guarantee may be suspended, modified, or revoked. Please check <Link href="#">money-back guarantee</Link> for the latest status of our money-back guarantee.
        </InfoText>
      </InfoBlock>

      {/* Fine Print / Disclaimers */}
      <DisclaimerSection>
        <DisclaimerText>
          *Finding in the <Link href="#">FedEx 2025 Returns Survey</Link>.
        </DisclaimerText>
        <DisclaimerText>
          **For details, please see <Link href="#">FedEx Rewards Terms and Conditions</Link>.
        </DisclaimerText>
      </DisclaimerSection>
    </FooterInfoSection>
  );
};

export default FooterNotices;