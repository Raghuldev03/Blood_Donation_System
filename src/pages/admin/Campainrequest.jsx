import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin1.css";

function CampaignRequest() {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Add searchTerm state

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/campaign/all");
      const data = Array.isArray(res.data) ? res.data : [res.data];
      setCampaigns(data);
    } catch (error) {
      window.alert("Error fetching campaigns: " + error.message); // Display error as an alert
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:8080/valut/campaign/approve/${id}`);
      fetchCampaigns();
    } catch (error) {
      window.alert("Error approving campaign: " + error.message); // Display error as an alert
    }
  };

  const handleClose = async (id) => {
    try {
      await axios.patch(`http://localhost:8080/valut/campaign/close/${id}`);
      fetchCampaigns();
    } catch (error) {
      window.alert("Error closing campaign: " + error.message); // Display error as an alert
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/valut/campaign/delete/${id}`);
      fetchCampaigns();
    } catch (error) {
      window.alert("Error deleting campaign: " + error.message); // Display error as an alert
    }
  };

  return (
    <div className="campaign-request-container">
      <div className="header-container">
        <h2 className="header-title">Campaign Request</h2>
        <div className="view-valut-searchbar">
          <input
            type="text"
            placeholder="🔍 Search by Registration Number, Campaign Name, or Date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      {campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <table className="campaign-table">
          <thead>
            <tr>
              <th>CampaignId</th>
              <th>RegistrationNumber</th>
              <th>Campaign Name</th>
              <th>Description</th>
              <th>Blood Type</th>
              <th>Date</th>
              <th>Location</th>
              <th>Target</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns
              .filter(
                (c) =>
                  c.registrationNumber
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) || // Use optional chaining
                  c.campaignName
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) || // Use optional chaining
                  c.date?.toLowerCase().includes(searchTerm.toLowerCase()) // Use optional chaining
              )
              .map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.registrationNumber}</td>
                  <td>{c.campaignName}</td>
                  <td>{c.description}</td>
                  <td>{c.bloodTypeNeeded}</td>
                  <td>{c.date}</td>
                  <td>{c.location}</td>
                  <td>{c.targetCollection}</td>
                  <td>
                    <span
                      className={`status-badge status-${c.status.toLowerCase()}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="action-buttons">
                    {c.status === "Pending" && (
                      <button
                        className="approve-btn"
                        onClick={() => handleApprove(c.id)}
                      >
                        Approve
                      </button>
                    )}
                    {c.status === "Approved" && (
                      <button
                        className="close-btn"
                        onClick={() => handleClose(c.id)}
                      >
                        Close
                      </button>
                    )}
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(c.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CampaignRequest;