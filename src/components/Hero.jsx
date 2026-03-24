import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import p9 from '../Images/p9.png'
import { Context } from './Context';

const HeroSection = styled.section`
  position: relative;
  background-color: #fff;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 100px; // Space for the overlapping bar

  @media (max-width: 768px) {
    margin-bottom: 0;
    display:none;
  }
`;

const HeroContent = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  align-items: center;
  min-height: 500px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TextSide = styled.div`
  flex: 1;
  padding: 60px;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 40px 20px;
    text-align: center;
  }
`;

const ImageSide = styled.div`
  flex: 1.5;
  height: 500px;
  background-image: url(${p9});
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 300;
  line-height: 1.1;
  color: #333;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 30px;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const GearLink = styled.a`
  font-weight: 700;
  color: #007ab7;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 14px;

  &:hover { text-decoration: underline; }
`;

// Floating Action Bar
const ActionBar = styled.div`
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f2f2f2;
  border-radius: 20px;
  display: flex;
  padding: 20px 40px;
  width: 90%;
  max-width: 1100px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  z-index: 1;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1024px) {
    flex-direction: column;
    position: relative;
    bottom: 0;
    transform: none;
    left: 0;
    width: 100%;
    border-radius: 0;
    padding: 30px 20px;
    gap: 30px;
  }
`;

const IconGroup = styled.div`
  display: flex;
  gap: 30px;
  flex: 1;

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    gap: 20px;
  }
`;

const ActionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  
  span {
    font-size: 13px;
    font-weight: 700;
    margin-top: 10px;
    max-width: 80px;
    line-height: 1.2;
  }
`;

const TrackingInputGroup = styled.div`
  display: flex;
  flex: 1;
  max-width: 400px;
  background: white;
  border: 1px solid #ccc;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 100%;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  padding: 15px;
  font-size: 16px;
  outline: none;
  &::placeholder { font-style: italic; color: #999; }
`;

const TrackButton = styled.button`
  background-color: #ff6200;
  color: white;
  border: none;
  padding: 0 30px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  
  &:hover { background-color: #e55a00; }
`;

const Hero = () => {
    const {setTrackingNumber, setShowTrackerModal} = useContext(Context);


  return (
    <HeroSection>
      <HeroContent>
        <TextSide>
          <Title>Keep your automotive supply chain moving</Title>
          <Subtitle>
            From tires to transmissions, FedEx handles every part. Reach customers fast with flexible delivery options and logistics that scale with you.
          </Subtitle>
          <GearLink href="#">GEAR UP TO SHIP</GearLink>
        </TextSide>
        <ImageSide />
      </HeroContent>

      <ActionBar>
        <IconGroup>
          <ActionItem>
            <div style={{fontSize: '24px'}}>📋</div>
            <span>Get a quote</span>
          </ActionItem>
          <ActionItem>
            <div style={{fontSize: '24px'}}>📦</div>
            <span>Ship now</span>
          </ActionItem>
          <ActionItem>
            <div style={{fontSize: '24px'}}>🏪</div>
            <span>Find FedEx locations</span>
          </ActionItem>
          <ActionItem>
            <div style={{fontSize: '24px'}}>🎧</div>
            <span>Contact support</span>
          </ActionItem>
        </IconGroup>

        <TrackingInputGroup>
          <Input placeholder="Tracking number" onChange={(e)=>setTrackingNumber(e.target.value)}/>
          <TrackButton onClick={()=>setShowTrackerModal(true)}>TRACK</TrackButton>
        </TrackingInputGroup>
      </ActionBar>
    </HeroSection>
  );
};

export default Hero;