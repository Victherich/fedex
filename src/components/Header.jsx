// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import { Context } from './Context';
// import { FaChevronDown } from 'react-icons/fa';

// const HeaderContainer = styled.header`
//   background-color: #4D148C; // FedEx Purple
//   color: white;
//   font-family: 'Roboto', sans-serif;
//   padding: 0 20px;
//   height: 80px;
//   display: flex;
//   align-items: center;
//   position: sticky;
//   top: 0;
//   z-index: 10;
// `;

// const NavContent = styled.div`
//   max-width: 1400px;
//   width: 100%;
//   margin: 0 auto;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

// const LogoSection = styled.div`
//   display: flex;
//   align-items: center;
//   font-size: 32px;
//   font-weight: 900;
//   letter-spacing: -1.5px;
//   cursor: pointer;

//   span:first-child { color: white; }
//   span:last-child { color: #ff6200; } // FedEx Orange
// `;

// const DesktopNav = styled.nav`
//   display: flex;
//   align-items: center;
//   gap: 25px;

//   @media (max-width: 1024px) {
//     display: none;
//   }
// `;

// const NavItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 5px;
//   font-size: 16px;
//   font-weight: 400;
//   cursor: pointer;
//   padding: 10px 0;

//   &:hover {
//     opacity: 0.8;
//   }

//   span{
//   margin-top:5px;
//   }
// `;

// const UtilitySection = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 20px;
// `;

// const UserAuth = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   font-size: 16px;
//   cursor: pointer;

//   @media (max-width: 1024px) {
//     span { display: none; } // Hide text on mobile as per screenshot
//   }
// `;

// const IconBtn = styled.div`
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   font-size: 24px;
// `;

// const Hamburger = styled.div`
//   display: none;
//   flex-direction: column;
//   gap: 5px;
//   cursor: pointer;

//   div {
//     width: 25px;
//     height: 2px;
//     background-color: white;
//   }

//   @media (max-width: 1024px) {
//     display: flex;
//   }
// `;

// const Header = () => {
//     const navigate = useNavigate();
//     const {setShowTrackerModal, showTrackerModal}=useContext(Context);
  

//   return (
//     <HeaderContainer>
//       <NavContent>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
//           <LogoSection onClick={()=>navigate('/')}>
//             <span>Fed</span><span>Ex</span>
//           </LogoSection>

//           <DesktopNav>
//             <NavItem>Shipping <span><FaChevronDown/></span></NavItem>
//             <NavItem onClick={()=>setShowTrackerModal(true)}>Tracking <span><FaChevronDown/></span></NavItem>
//             <NavItem>Design & Print <span><FaChevronDown/></span></NavItem>
//             <NavItem>Locations <span><FaChevronDown/></span></NavItem>
//             <NavItem>Support <span><FaChevronDown/></span></NavItem>
//           </DesktopNav>
//         </div>

//         <UtilitySection>
//           <UserAuth>
//             <span>Sign Up or Log In</span>
//             <IconBtn>
//               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                 <circle cx="12" cy="7" r="4"></circle>
//               </svg>
//             </IconBtn>
//           </UserAuth>
          
//           {/* Desktop Search */}
//           <IconBtn className="desktop-only" style={{ display: window.innerWidth > 1024 ? 'flex' : 'none' }}>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <circle cx="11" cy="11" r="8"></circle>
//               <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//             </svg>
//           </IconBtn>

//           <Hamburger>
//             <div />
//             <div />
//             <div />
//           </Hamburger>
//         </UtilitySection>
//       </NavContent>
//     </HeaderContainer>
//   );
// };

// export default Header;




import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Context } from './Context';
import { FaChevronDown } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background-color: #4D148C;
  color: white;
  font-family: 'Roboto', sans-serif;
  padding: 0 20px;
  height: 80px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
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
  cursor: pointer;

  span:first-child { color: white; }
  span:last-child { color: #ff6200; }
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: 25px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
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
  cursor: pointer;

  @media (max-width: 1024px) {
    span { display: none; }
  }
`;

const IconBtn = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
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


// ✅ MOBILE MENU
const MobileMenu = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  background: #4D148C;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
z-index:200;
  transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-150%)')};
  transition: 0.3s ease;
`;

const MobileItem = styled.div`
  font-size: 18px;
  cursor: pointer;
color:white;
  &:hover {
    opacity: 0.8;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const { setShowTrackerModal } = useContext(Context);
  const menuRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  if (menuOpen) {
    document.addEventListener('mousedown', handleClickOutside);
  }

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [menuOpen]);

  return (
    <>
      <HeaderContainer>
        <NavContent>
          
          {/* LEFT */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <LogoSection onClick={() => navigate('/')}>
              <span>Fed</span><span>Ex</span>
            </LogoSection>

            <DesktopNav>
               <NavItem onClick={()=>navigate('/')}>Home </NavItem>
              <NavItem onClick={()=>navigate('/shipping')}>Shipping </NavItem>
              <NavItem onClick={() => setShowTrackerModal(true)}>Tracking </NavItem>
              <NavItem onClick={()=>navigate('/design')}>Design & Print </NavItem>
              <NavItem onClick={()=>navigate('/locations')}>Locations </NavItem>
              <NavItem onClick={()=>navigate('/support')}>Support </NavItem>
            </DesktopNav>
          </div>

          {/* RIGHT */}
          <UtilitySection>

            <UserAuth>
              <span>Sign Up or Log In</span>
              <IconBtn>
                <svg width="28" height="28" stroke="white" fill="none" strokeWidth="1.5">
                  <circle cx="12" cy="7" r="4"></circle>
                  <path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"></path>
                </svg>
              </IconBtn>
            </UserAuth>

            {/* SEARCH (always visible, no window.innerWidth) */}
            <IconBtn>
              <svg width="22" height="22" stroke="white" fill="none" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.6" y2="16.6"></line>
              </svg>
            </IconBtn>

            {/* HAMBURGER */}
            <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
              <div />
              <div />
              <div />
            </Hamburger>

          </UtilitySection>
        </NavContent>
      </HeaderContainer>

      {/* MOBILE MENU */}
      <MobileMenu ref={menuRef} open={menuOpen}>
                <MobileItem onClick={()=>{setMenuOpen(false);navigate('/')}}>Home</MobileItem>
        <MobileItem onClick={()=>{setMenuOpen(false);navigate('/shipping')}}>Shipping</MobileItem>
        <MobileItem onClick={() => {setShowTrackerModal(true);setMenuOpen(false)}}>Tracking</MobileItem>
        <MobileItem onClick={()=>{setMenuOpen(false);navigate('/design')}}>Design & Print</MobileItem>
        <MobileItem onClick={()=>{setMenuOpen(false);navigate('/locations')}}>Locations</MobileItem>
        <MobileItem onClick={()=>{setMenuOpen(false);navigate('/support')}}>Support</MobileItem>
      </MobileMenu>
    </>
  );
};

export default Header;