import React, { useContext } from 'react';
import styled from 'styled-components';
import loc1 from '../Images/loc1.png'
import { Context } from './Context';

const MobileHeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: 'Roboto', sans-serif;

  /* Hidden on desktop and tablet */
  @media (min-width: 769px) {
    display: none;
  }
`;

const HeroImageArea = styled.div`
  position: relative;
  height: 250px;
  background-image: linear-gradient(rgba(77, 20, 140, 0.4), rgba(77, 20, 140, 0.4)), 
                    url('https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=800&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const HeroTitle = styled.h1`
  color: white;
  font-size: 38px;
  font-weight: 300;
  text-align: center;
  line-height: 1.1;
  width: 100%;
  max-width: 300px;
  
`;
const ActionTiles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  border-bottom: 1px solid #ddd;
  padding: 20px;
  transform: translateY(-50px); /* negative value moves it upward */
  z-index: 2; /* make sure it sits above the image */
  position: relative; /* needed for z-index to work */
`;

// const Tile = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 20px 10px;
//   text-align: center;
//   background-color: ${props => props.active ? '#4D148C' : '#fff'};
//   color: ${props => props.active ? '#fff' : '#333'};
//   border-right: 1px solid #ddd;
  

//   &:last-child {
//     border-right: none;
//   }

//   span {
//     font-size: 12px;
//     font-weight: 700;
//     text-transform: uppercase;
//     margin-top: 10px;
//   }
// `;

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
  text-align: center;
  background-color: ${props => props.active ? '#4D148C' : '#fff'};
  color: ${props => props.active ? '#fff' : '#333'};
  border-right: 1px solid #ddd;
  position: relative;
  transform: ${props => props.active ? 'translateY(-10px)' : 'translateY(0)'}; /* shift active tile up */
  transition: transform 0.3s ease; /* smooth movement */

  &:last-child {
    border-right: none;
  }

  span {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    margin-top: 10px;
  }
`;

const TrackingSection = styled.div`
  padding: 0px 5px;
  background-color: #fff;
    transform: translateY(-30px); /* negative value moves it upward */
  z-index: 2; /* make sure it sits above the image */
  position: relative; /* needed for z-index to work */
`;

const TrackingInputGroup = styled.div`
  display: flex;
  border: 1px solid #ccc;
  height: 55px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  padding: 0 15px;
  font-size: 16px;
  font-style: italic;
  outline: none;
  color: #666;
`;

const TrackButton = styled.button`
  background-color: #ff6200;
  color: white;
  border: none;
  padding: 0 10px;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const MobileHero = () => {
     const {setTrackingNumber, setShowTrackerModal} = useContext(Context);



  return (
    <MobileHeroContainer>
      {/* Background with Title */}
      <HeroImageArea>
        <HeroTitle>Ship, manage, track, deliver</HeroTitle>
      </HeroImageArea>

      {/* 3-Tile Navigation */}
      <ActionTiles>
        <Tile>
          <div style={{ fontSize: '24px' }}>📦</div>
          <span>Rate & Ship</span>
        </Tile>
        <Tile active>
          <div style={{ fontSize: '24px' }}>🔍</div>
          <span>Track</span>
        </Tile>
        <Tile>
          <div style={{ fontSize: '24px' }}>
            <img src={loc1} alt='loc1'/>
          </div>
          <span>Locations</span>
        </Tile>
      </ActionTiles>

      {/* Tracking Input */}
      <TrackingSection>
        <TrackingInputGroup>
          <Input placeholder="TRACKING ID" onChange={(e)=>setTrackingNumber(e.target.value)}/>
          <TrackButton onClick={()=>setShowTrackerModal(true)}>
            TRACK
             {/* <span>→</span> */}
          </TrackButton>
        </TrackingInputGroup>
      </TrackingSection>
    </MobileHeroContainer>
  );
};

export default MobileHero;