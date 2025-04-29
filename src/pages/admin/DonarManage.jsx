import React, { useState, useEffect } from "react";
import "./Admin.css";

function ViewDonors() {
  const [donors, setDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchDonors = () => {
    fetch("http://localhost:8080/admin/viewdonar")
      .then((response) => response.json())
      .then((data) => setDonors(data))
      .catch((error) => console.error("Error fetching donor data:", error));
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this donor?")) {
      fetch(`http://localhost:8080/admin/deletedonor/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            alert("Donor deleted successfully");
            fetchDonors();
          } else {
            alert("Failed to delete donor");
          }
        })
        .catch((error) => console.error("Error deleting donor:", error));
    }
  };

  const filteredDonors = donors.filter(
    (donor) =>
      donor.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.donarEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="view-donors-container">
      <div className="view-donors-header">
        <h1 className="view-donors-heading">Donor List :</h1>
        <div className="view-donors-searchbar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by Blood Group or Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="view-donors-table">
        <thead>
          <tr>
            <th>Donor ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Age</th>
            <th>Blood Group</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredDonors.map((donor) => (
            <tr key={donor.donarId}>
              <td>{donor.donarId}</td>
              <td>{donor.donarName}</td>
              <td>{donor.donarEmail}</td>
              <td>{donor.phoneNumber}</td>
              <td>{donor.donarAge}</td>
              <td>{donor.bloodGroup}</td>
              <td>{donor.address}</td>
              <td>
                <button
                  onClick={() => handleDelete(donor.donarId)}
                  className="view-donors-delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewDonors;
