import React, { useState, useEffect } from "react";
import "./charity.css";

function Viewdonors() {
  const [donors, setDonors] = useState([]);

  const fetchDonors = () => {
    fetch("http://localhost:8080/admin/viewdonar")
      .then((response) => response.json())
      .then((data) => setDonors(data))
      .catch((error) => console.error("Error fetching donor data:", error));
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <div className="container" style={{ marginTop: "9%" }}>
      <h1 className="name">Donor List</h1>
      <table>
        <thead>
          <tr>
            <th>Donor ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Age</th>
            <th>Blood Group</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor) => (
            <tr key={donor.donarId}>
              <td>{donor.donarId}</td>
              <td>{donor.donarName}</td>
              <td>{donor.donarEmail}</td>
              <td>{donor.phoneNumber}</td>
              <td>{donor.donarAge}</td>
              <td>{donor.bloodGroup}</td>
              <td>{donor.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Viewdonors;
