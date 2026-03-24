import React from 'react';
import styled from 'styled-components';
import socialicons from '../Images/socialicons.png'
import globeicon from '../Images/globeicon.png'

const FooterWrapper = styled.footer`
  font-family: 'Roboto', sans-serif;
  background-color: #FAFAFA;
  color: #333;
`;

const MainFooter = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px 40px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex: 1;
  min-width: 200px;
`;

const MultiColumn = styled(Column)`
  display: flex;
  gap: 40px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const ColumnHeading = styled.h5`
  color: #4D148C; // FedEx Purple
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 25px;
  letter-spacing: 0.5px;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin-bottom: 12px;
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 14px;
  font-weight: 300;

  &:hover {
    text-decoration: underline;
  }
`;

const LanguageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CountryLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 300;
`;

const LanguageSelect = styled.div`
  border: 1px solid #ccc;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 220px;
  font-size: 16px;
  cursor: pointer;

  @media(max-width:768px){
  width:100%;
  }
`;

const SocialSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  display: flex;
  align-items: center;
  gap: 20px;
  border-top: 1px solid #ddd;
  padding-top: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SocialHeading = styled.span`
  color: #4D148C;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
`;

const IconGroup = styled.div`
  display: flex;
  // gap: 15px;
  font-size: 20px;
  width:100%;

  @media(max-width:768px){
   justify-content:center;
  align-items:center;
  }
 
`;

const BottomBar = styled.div`
  background-color: #4D148C;
  color: #fff;
  padding: 30px 20px;
  
`;

const BottomContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 300;


  @media (max-width: 900px) {
    flex-direction: column;
    gap: 15px;
    align-items: center;
    text-align: center;
  }
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap:wrap;
  justify-content:center;
  
  a {
    color: #fff;
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
`;

const ImgSocial = styled.img`


@media(max-width:768px){
width:80%;
}
`

const Footer = () => {
  return (
    <FooterWrapper>
      <MainFooter>
        <MultiColumn>
          <div>
            <ColumnHeading>Our Company</ColumnHeading>
            <LinkList>
              {['About FedEx', 'Our Portfolio', 'Investor Relations', 'Careers'].map(link => (
                <ListItem key={link}><FooterLink href="#">{link}</FooterLink></ListItem>
              ))}
            </LinkList>
          </div>
          <div style={{ marginTop: '41px' }}> {/* Offset to align with first column heading */}
            <LinkList>
              {['FedEx Blog', 'Corporate Responsibility', 'Newsroom', 'Contact Us'].map(link => (
                <ListItem key={link}><FooterLink href="#">{link}</FooterLink></ListItem>
              ))}
            </LinkList>
          </div>
        </MultiColumn>

        <Column>
          <ColumnHeading>More From FedEx</ColumnHeading>
          <LinkList>
            {['FedEx Compatible', 'FedEx Developer Portal', 'FedEx Logistics'].map(link => (
              <ListItem key={link}><FooterLink href="#">{link}</FooterLink></ListItem>
            ))}
          </LinkList>
        </Column>

        <Column>
          <ColumnHeading>Language</ColumnHeading>
          <LanguageSection>
            <CountryLabel>
              <span><img src={globeicon} alt="globeicon"/></span> United States
            </CountryLabel>
            <LanguageSelect>
              English <span>▼</span>
            </LanguageSelect>
          </LanguageSection>
        </Column>
      </MainFooter>

      <SocialSection>
        <SocialHeading>Follow FedEx</SocialHeading>
        <IconGroup>
          {/* Using text/emojis as placeholders for the actual SVG icons */}
          {/* <span>✉️</span> <span>Facebook</span> <span>X</span> <span>IG</span> <span>in</span> <span>YT</span> <span>P</span> */}
       <ImgSocial src={socialicons} alt='socialicons' />
        </IconGroup>
      </SocialSection>

      <BottomBar>
        <BottomContent>
          <span>© FedEx 1995-2026</span>
          <LegalLinks>
            <a href="#">Site Map</a> | <a href="#">Cookie Consent</a> | <a href="#">Terms of Use</a> | <a href="#">Privacy & Security</a> | <a href="#">Ad Choices</a>
          </LegalLinks>
        </BottomContent>
      </BottomBar>
    </FooterWrapper>
  );
};

export default Footer;