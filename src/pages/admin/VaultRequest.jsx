import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

function VaultRequest() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Add searchTerm state

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/pending-approvals")
      .then((response) => {
        setPendingRequests(response.data);
      })
      .catch((error) => {
        window.alert("Error fetching pending approvals: " + error.message); // Show error in alert
      });
  }, []);

  const approveRequest = (id) => {
    axios
      .post(`http://localhost:8080/admin/approve/${id}`)
      .then(() => {
        setPendingRequests((prev) =>
          prev.map((request) =>
            request.id === id
              ? { ...request, status: "Approved", approved: true }
              : request
          )
        );
        window.alert("Request approved successfully!"); // Show success message in alert
      })
      .catch((error) => {
        window.alert("Error approving request: " + error.message); // Show error in alert
      });
  };

  const rejectRequest = (id) => {
    axios
      .delete(`http://localhost:8080/admin/reject/${id}`)
      .then(() => {
        setPendingRequests((prev) =>
          prev.map((request) =>
            request.id === id
              ? { ...request, status: "Rejected", approved: false }
              : request
          )
        );
        window.alert("Request rejected successfully!");
      })
      .catch((error) => {
        window.alert("Error rejecting request: " + error.message);
      });
  };

  return (
    <div className="container-valut">
      <div className="header-container">
        <h2 className="header-title">Pending Blood Bank Approvals</h2>
        <div className="view-valut-searchbar">
          <input
            type="text"
            placeholder="🔍 Search by Registration Number, Bank Name, or Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <table className="request-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Blood Bank Name</th>
            <th>Email</th>
            <th>Registration Number</th>
            <th>License Number</th>
            <th>Type</th>
            <th>Components</th>
            <th>Contact</th>
            <th>License Validity</th>
            <th>Authorized Person</th>
            <th>Aadhar</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingRequests
            .filter(
              (request) =>
                request.bloodBankName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                request.email
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                request.registrationNumber
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
            )
            .map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.bloodBankName}</td>
                <td>{request.email}</td>
                <td>{request.registrationNumber}</td>
                <td>{request.licenseNumber}</td>
                <td>{request.bloodBankType}</td>
                <td>{request.availableBloodComponents}</td>
                <td>{request.contactNumber}</td>
                <td>{request.licenseValidityDate}</td>
                <td>{request.authorizedPersonName}</td>
                <td>{request.personAadhar}</td>
                <td>{request.address}</td>
                <td>
                  <span
                    style={{
                      fontWeight: "bold",
                      color:
                        request.status === "Approved"
                          ? "green"
                          : request.status === "Rejected"
                          ? "red"
                          : "orange",
                    }}
                  >
                    {request.status || "Pending"}
                  </span>
                </td>
                <td>
                  {request.status !== "Approved" &&
                    request.status !== "Rejected" && (
                      <div className="action-buttons">
                        <button
                          onClick={() => approveRequest(request.id)}
                          className="approve-button"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectRequest(request.id)}
                          className="reject-button"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default VaultRequest;
