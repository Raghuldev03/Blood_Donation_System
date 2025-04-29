// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Availability({ donorId }) {
//   const [lastDonationDate, setLastDonationDate] = useState(null);
//   const [availability, setAvailability] = useState("");

//   useEffect(() => {
//     if (donorId) {
//       fetchLastDonationDate();
//     }
//   }, [donorId]);

//   const fetchLastDonationDate = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/donor/getLastDonation/${donorId}`
//       );
//       if (response.data) {
//         const donor = response.data;
//         setLastDonationDate(donor.lastDonationDate);
//         checkAvailability(donor.lastDonationDate);
//       }
//     } catch (error) {
//       console.error("Error fetching last donation date:", error);
//     }
//   };

//   const checkAvailability = (lastDonationDate) => {
//     const currentDate = new Date();
//     const lastDonation = new Date(lastDonationDate);
//     const diffTime = currentDate - lastDonation;
//     const diffDays = diffTime / (1000 * 3600 * 24);

//     if (diffDays >= 90) {
//       setAvailability("Available");
//       updateAvailabilityStatus(true);
//     } else {
//       setAvailability("Not Available");
//       updateAvailabilityStatus(false);
//     }
//   };

//   const updateAvailabilityStatus = async (available) => {
//     try {
//       await axios.patch(
//         `http://localhost:8080/donor/updateAvailability/${donorId}`,
//         null,
//         {
//           params: { available },
//         }
//       );
//     } catch (error) {
//       console.error("Error updating availability status:", error);
//     }
//   };

//   return (
//     <div>
//       <h3>Donor Availability</h3>
//       <p>
//         Last Donation Date:{" "}
//         {lastDonationDate
//           ? new Date(lastDonationDate).toLocaleDateString()
//           : "N/A"}
//       </p>
//       <p>Availability Status: {availability}</p>
//     </div>
//   );
// }

// export default Availability;