import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Context } from './Context';
import { FaChevronDown } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background-color: #4D148C; // FedEx Purple
  color: white;
  font-family: 'Roboto', sans-serif;
  padding: 0 20px;
  height: 80px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const NavContent = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  font-size: 32px;
  font-weight: 900;
  letter-spacing: -1.5px;
  cursor: pointer;

  span:first-child { color: white; }
  span:last-child { color: #ff6200; } // FedEx Orange
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 25px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  padding: 10px 0;

  &:hover {
    opacity: 0.8;
  }

  span{
  margin-top:5px;
  }
`;

const UtilitySection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const UserAuth = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  cursor: pointer;

  @media (max-width: 1024px) {
    span { display: none; } // Hide text on mobile as per screenshot
  }
`;

const IconBtn = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 24px;
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;

  div {
    width: 25px;
    height: 2px;
    background-color: white;
  }

  @media (max-width: 1024px) {
    display: flex;
  }
`;

const Header = () => {
    const navigate = useNavigate();
  

  return (
    <HeaderContainer>
      <NavContent>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <LogoSection onClick={()=>navigate('/')}>
            <span>Fed</span><span>Ex</span>
          </LogoSection>

          <DesktopNav>
            <NavItem>Shipping <span><FaChevronDown/></span></NavItem>
            <NavItem>Tracking <span><FaChevronDown/></span></NavItem>
            <NavItem>Design & Print <span><FaChevronDown/></span></NavItem>
            <NavItem>Locations <span><FaChevronDown/></span></NavItem>
            <NavItem>Support <span><FaChevronDown/></span></NavItem>
          </DesktopNav>
        </div>

        <UtilitySection>
          <UserAuth>
            <span>Sign Up or Log In</span>
            <IconBtn>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </IconBtn>
          </UserAuth>
          
          {/* Desktop Search */}
          <IconBtn className="desktop-only" style={{ display: window.innerWidth > 1024 ? 'flex' : 'none' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </IconBtn>

          <Hamburger>
            <div />
            <div />
            <div />
          </Hamburger>
        </UtilitySection>
      </NavContent>
    </HeaderContainer>
  );
};

export default Header;