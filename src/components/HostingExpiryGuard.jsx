

// // src/components/WebsiteExpiryGuard.jsx

// import React, { useEffect, useState } from 'react';
// import styled, { keyframes } from 'styled-components';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../firebaseConfig'; // Adjust path as necessary
// import Swal from 'sweetalert2';
// import { useLocation, useNavigate } from 'react-router-dom';

// // Keyframes for a subtle fade-in of the overlay
// const fadeInOverlay = keyframes`
//   from { opacity: 0; }
//   to { opacity: 1; }
// `;

// // Styled component for the full-page overlay
// const ExpiredOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background-color: rgba(0, 0, 0, 0.98); /* Very dark, nearly opaque */
//   color: white;
//   z-index: 9999999999999999999999; /* Extremely high z-index to cover everything */
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   animation: ${fadeInOverlay} 1s ease-out forwards; /* Smooth fade-in */

//   button {
//     padding: 10px 20px; /* Adjusted padding */
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//     background-color: #4A90E2; /* Professional blue */
//     color: white;
//     font-size: 1.1rem; /* Slightly larger text */
//     margin-top: 20px; /* Spacing from paragraphs */
//     transition: background-color 0.3s ease; /* Smooth hover effect */
//   }
  
//   button:hover {
//     background-color: #357ABD; /* Darker blue on hover */
//   }
  
//   h1 {
//     font-size: 4rem;
//     margin-bottom: 20px;
//     color: #e74c3c; /* Red color for warning */
//     text-shadow: 0px 0px 15px rgba(231, 76, 60, 0.5);
//   }

//   p {
//     font-size: 1.5rem;
//     margin-bottom: 10px;
//     color: #f0f0f0;
//   }

//   strong {
//     color: #f1c40f; /* Yellow for emphasis */
//   }

//   @media (max-width: 768px) {
//     h1 {
//       font-size: 2.5rem;
//     }
//     p {
//       font-size: 1.1rem;
//     }
//     button {
//       font-size: 1rem;
//       padding: 8px 15px;
//     }
//   }
// `;

// const HostingExpiryGuard = () => {
//   // 1. Initialize isWebsiteExpired to false
//   const [isWebsiteExpired, setIsWebsiteExpired] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();


//     const checkWebsiteExpiry = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const qs = await getDocs(collection(db, 'hostings'));
//         const hostings = qs.docs.map(d => ({ id: d.id, ...d.data() }));

//         const now = new Date();
//         now.setHours(0, 0, 0, 0); // Normalize current date to start of day

//         let anyHostingIsExpired = false; // Renamed for clarity
//         for (const item of hostings) {
//           // Ensure item.expiry_date exists and is a Firestore Timestamp
//           if (item.expiry_date && item.expiry_date.toDate) {
//             const expiryDateJS = item.expiry_date.toDate();
//             expiryDateJS.setHours(0, 0, 0, 0); // Normalize expiry date to start of day

//             // Check if expiry date is in the past AND its status is marked 'active' or not 'expired'
//             // The problem hosting's status is 'active' as of July 1, 2025 (current time is June 17, 2025)
//             // So, it's not expired yet.
//             // If expiryDateJS < now means it's passed.
//             // You had a check 'item.status === 'expired'' here before.
//             // Based on your database data (status: "active"), you probably want to check
//             // if the expiry date has passed, REGARDLESS of the current status in DB,
//             // and THEN this guard will display the overlay.
//             // The `useHostingExpiryChecker` or backend process is then responsible for *setting* `status: "expired"`.

//             // Let's adjust the condition to strictly check if the date has passed.
//             if (expiryDateJS < now) {
//                 // To confirm it's actually expired according to the date and not just in the future
//                 // For the 'vGU9kKt6mh6MY79M09wr' data, July 1, 2025 is *after* June 17, 2025,
//                 // so this condition (expiryDateJS < now) will currently be FALSE.
//                 // The site will *not* show as expired with this current Firestore data.
//                 console.log(`Checking ${item.hosting_name} (ID: ${item.id}): Expiry Date: ${expiryDateJS.toLocaleDateString()}, Current Date: ${now.toLocaleDateString()}. Date has passed: ${expiryDateJS < now}`);

//                 anyHostingIsExpired = true;
//                 console.warn(`Website blocked: Hosting "${item.hosting_name}" (ID: ${item.id}) expiry date has passed.`);
//                 break; // Found one that has expired by date, no need to check further
//             }
//           }
//         }
//         setIsWebsiteExpired(anyHostingIsExpired);

//       } catch (err) {
//         console.error("Error checking website expiry:", err);
//         setError("Failed to verify website status. Please check your internet connection.");
//         Swal.fire('Critical Error', 'Failed to load website status. Please try refreshing.', 'error');
//       } finally {
//         setLoading(false);
//       }
//     };


//       useEffect(() => {
//     checkWebsiteExpiry();
//   }, []);


//      useEffect(() => {
//         const id = setInterval(()=>{
// checkWebsiteExpiry();
//         },5*60*1000)

//         return()=>clearInterval(id)
    
//   }, []);

//   // If loading, render nothing to avoid flicker before decision
//   if (loading) {
//     return null;
//   }

//   // 2. Corrected shouldShowOverlay condition
//   const shouldShowOverlay =
//     isWebsiteExpired && // ONLY show if a hosting plan is actually expired (date passed)
//     location.pathname !== '/admindashboard' &&
//     location.pathname !== '/adminlogin';

//   // If the website is determined to be expired AND not on an excluded route, render the full-page overlay
//   if (shouldShowOverlay) {
//     return (
//       <ExpiredOverlay>
//         <h1>Website Expired</h1>
//         <p>This website's hosting plan has expired.</p>
//         <p>Please if this website belongs to you, click on the renew hosting button to renew your hosting plan.</p>
//         <p>You can also contact support for assistance</p>
//         <p><strong>echobyteconcept@gmail.com</strong></p>
//         <p>Thank you for your understanding.</p>
//         <button onClick={() => navigate('/admindashboard')}>Renew hosting</button>
//       </ExpiredOverlay>
//     );
//   }

//   // 3. Explicitly return null if the overlay should NOT be shown
//   return null;
// };

// export default HostingExpiryGuard;



// src/components/WebsiteExpiryGuard.jsx

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { collection, getDocs, doc, updateDoc, writeBatch } from 'firebase/firestore'; 
import { db } from '../firebaseConfig'; // Adjust path as necessary
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

// Keyframes for a subtle fade-in of the overlay
const fadeInOverlay = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Styled component for the full-page overlay
const ExpiredOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.98); /* Very dark, nearly opaque */
  color: white;
  z-index: 9999999999999999999999; /* Extremely high z-index to cover everything */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  animation: ${fadeInOverlay} 1s ease-out forwards; /* Smooth fade-in */

  button {
    padding: 10px 20px; /* Adjusted padding */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #4A90E2; /* Professional blue */
    color: white;
    font-size: 1.1rem; /* Slightly larger text */
    margin-top: 20px; /* Spacing from paragraphs */
    transition: background-color 0.3s ease; /* Smooth hover effect */
  }
  
  button:hover {
    background-color: #357ABD; /* Darker blue on hover */
  }
  
  h1 {
    font-size: 4rem;
    margin-bottom: 20px;
    color: #e74c3c; /* Red color for warning */
    text-shadow: 0px 0px 15px rgba(231, 76, 60, 0.5);
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #f0f0f0;
  }

  strong {
    color: #f1c40f; /* Yellow for emphasis */
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.1rem;
    }
    button {
      font-size: 1rem;
      padding: 8px 15px;
    }
  }
`;

const HostingExpiryGuard = () => {
  const [isWebsiteExpired, setIsWebsiteExpired] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Define checkWebsiteExpiry function outside useEffect to prevent recreating it on every render
  // and so it can be called by setInterval as well.
  const checkWebsiteExpiry = async () => {
    setLoading(true);
    setError(null);

    try {
      const qs = await getDocs(collection(db, 'hostings'));
      const hostings = qs.docs.map(d => ({ id: d.id, ...d.data() }));

      const now = new Date();
      now.setHours(0, 0, 0, 0); // Normalize current date to start of day

      let anyHostingIsExpired = false;
      const batch = writeBatch(db); // Initialize a Firestore batch for multiple updates
      let updatesCount = 0; // NEW: Keep track of updates added to batch

      for (const item of hostings) {
        if (item.expiry_date && item.expiry_date.toDate) {
          const expiryDateJS = item.expiry_date.toDate();
          expiryDateJS.setHours(0, 0, 0, 0); // Normalize expiry date to start of day

          // Check if the expiry date has passed AND the status is NOT already 'expired'
          if (expiryDateJS < now && item.status !== 'expired') {
            const hostingRef = doc(db, 'hostings', item.id);
            batch.update(hostingRef, { status: 'expired' }); // Add update to the batch
            updatesCount++; // Increment count
            console.log(`Adding ${item.hosting_name} (ID: ${item.id}) to batch to mark as expired.`);
          }

          // Separately, determine if *any* hosting that causes the website to expire has passed its date.
          // This ensures the overlay appears based on date, even if the status hasn't been updated yet.
          if (expiryDateJS < now) {
            anyHostingIsExpired = true;
            console.warn(`Website blocked: Hosting "${item.hosting_name}" (ID: ${item.id}) expiry date has passed.`);
          }
        }
      }
      
      // Commit all batched updates if there are any
      // MODIFIED: Use updatesCount instead of batch.docs.size
      if (updatesCount > 0) {
        console.log(`Committing batch with ${updatesCount} updates.`);
        await batch.commit();
        // You might want a Swal here to indicate background updates, but it could be annoying on every load.
        // Swal.fire('Update', `${batch.docs.size} hosting(s) marked as expired in background.`, 'info');
      }

      setIsWebsiteExpired(anyHostingIsExpired);

    } catch (err) {
      console.error("Error checking or updating website expiry:", err);
      setError("Failed to verify website status. Please check your internet connection.");
      Swal.fire('Critical Error', 'Failed to load website status.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Effect to run the check once on component mount
  useEffect(() => {
    checkWebsiteExpiry();
  }, []); // Empty dependency array means it runs once

  // Effect to run the check periodically (e.g., every 5 minutes)
  useEffect(() => {
    const id = setInterval(() => {
      checkWebsiteExpiry();
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(id); // Clean up the interval on unmount
  }, [checkWebsiteExpiry]); // Re-run if checkWebsiteExpiry changes (due to useCallback, it won't)


  // If loading, render nothing to avoid flicker before decision
  if (loading) {
    return null;
  }

  // Determine if the overlay should be shown
  const shouldShowOverlay =
    isWebsiteExpired && // ONLY show if a hosting plan is actually expired (date passed)
    location.pathname !== '/admindashboard' &&
    location.pathname !== '/adminlogin';

  // If the website is determined to be expired AND not on an excluded route, render the full-page overlay
  if (shouldShowOverlay) {
    return (
      <ExpiredOverlay>
        <h1>Website Expired</h1>
        <p>This website's hosting plan has expired.</p>
        <p>Please if this website belongs to you, click on the renew hosting button to renew your hosting plan.</p>
        <p>You can also contact support for assistance</p>
        <p><strong>echobyteconcept@gmail.com</strong></p>
        <p>Thank you for your understanding.</p>
        <button onClick={() => navigate('/admindashboard')}>Renew hosting</button>
      </ExpiredOverlay>
    );
  }

  // Explicitly return null if the overlay should NOT be shown
  return null;
};

export default HostingExpiryGuard;