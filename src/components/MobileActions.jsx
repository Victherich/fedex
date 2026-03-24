// import React from 'react';
// import styled from 'styled-components';

// const MobileQuickLinks = styled.section`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 40px 20px;
//   font-family: 'Roboto', sans-serif;
//   background-color: #fff;

//   /* This ensures the section is hidden on desktop/tablet */
//   @media (min-width: 769px) {
//     display: none;
//   }
// `;

// const LinkItem = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-bottom: 50px;
//   cursor: pointer;
//   width: 100%;

//   &:last-child {
//     margin-bottom: 0;
//   }
// `;

// const IconWrapper = styled.div`
//   width: 120px;
//   height: 120px;
//   margin-bottom: 15px;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   svg {
//     width: 100%;
//     height: 100%;
//     fill: none;
//     stroke: #4D148C; /* FedEx Purple */
//     stroke-width: 1.2;
//   }
// `;

// const LinkLabel = styled.span`
//   color: #007ab7; /* FedEx blue for action links */
//   font-size: 14px;
//   font-weight: 700;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
//   text-align: center;
// `;

// const MobileActions = () => {
//   const actions = [
//     {
//       label: "Drop off a package",
//       icon: (
//         <svg viewBox="0 0 24 24">
//           <circle cx="12" cy="6" r="3" />
//           <path d="M12 9v6m-4-3h8m-9 9h10a2 2 0 0 0 2-2v-5H5v5a2 2 0 0 0 2 2z" />
//         </svg>
//       )
//     },
//     {
//       label: "Redirect a package",
//       icon: (
//         <svg viewBox="0 0 24 24">
//           <rect x="3" y="11" width="14" height="8" rx="1" />
//           <path d="M17 11l4 2-4 2" />
//           <path d="M7 11V8a2 2 0 0 1 2-2h8" />
//         </svg>
//       )
//     },
//     {
//       label: "Store hours and services",
//       icon: (
//         <svg viewBox="0 0 24 24">
//           <path d="M3 9l1-4h16l1 4" />
//           <rect x="4" y="9" width="16" height="10" />
//           <path d="M9 13v6m6-6v6" />
//         </svg>
//       )
//     },
//     {
//       label: "Service alerts",
//       icon: (
//         <svg viewBox="0 0 24 24">
//           <path d="M12 2L2 20h20L12 2z" />
//           <line x1="12" y1="9" x2="12" y2="13" />
//           <line x1="12" y1="17" x2="12.01" y2="17" />
//         </svg>
//       )
//     },
//     {
//       label: "Return a package",
//       icon: (
//         <svg viewBox="0 0 24 24">
//           <rect x="4" y="4" width="16" height="16" rx="2" transform="rotate(45 12 12)" />
//           <path d="M10 14l-2-2 2-2" />
//           <path d="M8 12h8a2 2 0 0 1 2 2v2" />
//         </svg>
//       )
//     }
//   ];

//   return (
//     <MobileQuickLinks>
//       {actions.map((action, index) => (
//         <LinkItem key={index}>
//           <IconWrapper>
//             {action.icon}
//           </IconWrapper>
//           <LinkLabel>{action.label}</LinkLabel>
//         </LinkItem>
//       ))}
//     </MobileQuickLinks>
//   );
// };

// export default MobileActions;







import React from 'react';
import styled from 'styled-components';
import i1 from '../Images/i1.jpeg'
import i2 from '../Images/i2.jpeg'
import i3 from '../Images/i3.jpeg'
import i4 from '../Images/i4.jpeg'
import i5 from '../Images/i5.jpeg'

const MobileQuickLinks = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  font-family: 'Roboto', sans-serif;
  background-color: #fff;

  /* Ensures section remains hidden on desktop/tablet */
  @media (min-width: 769px) {
    display: none;
  }
`;

const LinkItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  cursor: pointer;
  width: 100%;

  &:last-child {
    margin-bottom: 0;
  }
`;

const IconWrapper = styled.div`
  width: 140px; // Slightly larger to accommodate image detail
  height: 140px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const LinkLabel = styled.span`
  color: #007ab7; // FedEx blue for action links
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: center;
`;

const MobileActions = () => {
  const actions = [
    {
      label: "Drop off a package",
      image: i1
    },
    {
      label: "Redirect a package",
      image:i2
    },
    {
      label: "Store hours and services",
      image: i3
    },
    {
      label: "Service alerts",
      image: i4
    },
    {
      label: "Return a package",
      image:i5
    }
  ];

  return (
    <MobileQuickLinks>
      {actions.map((action, index) => (
        <LinkItem key={index}>
          <IconWrapper>
            <img src={action.image} alt={action.label} />
          </IconWrapper>
          <LinkLabel>{action.label}</LinkLabel>
        </LinkItem>
      ))}
    </MobileQuickLinks>
  );
};

export default MobileActions;