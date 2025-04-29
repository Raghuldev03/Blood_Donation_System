import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./charity2.css";

function Request() {
  const location = useLocation();
  const bloodTypeFromState = location.state?.bloodType || "";
  const [donors, setDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState(bloodTypeFromState);

  useEffect(() => {
    axios
      .get("http://localhost:8080/valut/viewdonar")
      .then((response) => {
        setDonors(response.data);
      })
      .catch((error) => {
        window.alert("Error fetching donor data: " + error.message);
      });
  }, []);

  const handleRequestClick = (donarId) => {
    console.log(`Request for donor ID: ${donarId}`);
  };

  const isLastDonationGreaterThan90Days = (lastDonationDate) => {
    if (!lastDonationDate) return false;
    const lastDonation = new Date(lastDonationDate);
    const currentDate = new Date();
    const differenceInTime = currentDate - lastDonation;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays > 90;
  };

  const filteredDonors = donors.filter((donor) =>
    donor.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="req-container">
      <div className="header-container">
        <h1 className="request-title">Donor Request</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Blood Group"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <table className="donor-table">
        <thead>
          <tr>
            <th className="table-header">Donor ID</th>
            <th className="table-header">Name</th>
            <th className="table-header">Email</th>
            <th className="table-header">Phone Number</th>
            <th className="table-header">Age</th>
            <th className="table-header">Blood Group</th>
            <th className="table-header">Address</th>
            <th className="table-header">Last Donation Date</th>
            <th className="table-header">Availability &gt; 90</th>
            <th className="table-header">Request</th>
          </tr>
        </thead>
        <tbody>
          {filteredDonors.length > 0 ? (
            filteredDonors.map((donar) => (
              <tr key={donar.donarId}>
                <td className="table-cell">{donar.donarId}</td>
                <td className="table-cell">{donar.donarName}</td>
                <td className="table-cell">{donar.donarEmail}</td>
                <td className="table-cell">{donar.phoneNumber}</td>
                <td className="table-cell">{donar.donarAge}</td>
                <td className="table-cell">{donar.bloodGroup}</td>
                <td className="table-cell">{donar.address}</td>
                <td className="table-cell">{donar.lastDonationDate || "NA"}</td>
                <td className="table-cell">
                  {isLastDonationGreaterThan90Days(donar.lastDonationDate)
                    ? "Yes"
                    : "No"}
                </td>
                <td className="request-button-cell">
                  <button
                    className="request-button"
                    onClick={() => handleRequestClick(donar.donarId)}
                    disabled={
                      !isLastDonationGreaterThan90Days(donar.lastDonationDate)
                    }
                  >
                    Request
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="no-data-cell">
                No donors found matching the search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Request;