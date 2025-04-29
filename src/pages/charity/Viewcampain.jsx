import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./charity1.css";

function ViewCampain() {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/valut/campain/approvedcampain")
      .then((response) => {
        setCampaigns(response.data);
      })
      .catch((error) => {
        window.alert("Error fetching approved campaigns: " + error.message); 
      });
  }, []);

  const handleRequestClick = (campaignId, bloodType) => {
    console.log(`Request made for campaign ID: ${campaignId}`);
    // Navigate to the request history page with bloodType as state
    navigate("/valut/history", { state: { bloodType } });
  };

  const filteredCampaigns = campaigns.filter(
    (c) =>
      (c.campaignName &&
        c.campaignName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.location &&
        c.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.registrationNumber && c.registrationNumber.includes(searchTerm))
  );

  return (
    <div className="vc-container">
      <h2 className="vc-title">Approved Campaigns</h2>

      <input
        type="text"
        className="vc-search"
        placeholder="Search by name, location, or registration number..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="vc-card-grid">
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => (
            <div key={campaign.id} className="vc-card">
              <h3 className="vc-card-title">{campaign.campaignName}</h3>
              <p>
                <strong>Registration Number:</strong>{" "}
                {campaign.registrationNumber}
              </p>
              <p>
                <strong>Date:</strong> {campaign.date}
              </p>
              <p>
                <strong>Blood Type:</strong> {campaign.bloodTypeNeeded}
              </p>
              <p>
                <strong>Location:</strong> {campaign.location}
              </p>
              <p>
                <strong>Target:</strong> {campaign.targetCollection}
              </p>
              <p>
                <strong>Description:</strong> {campaign.description}
              </p>
              <span className="vc-status-badge vc-status-approved">
                {campaign.status}
              </span>
              <button
                className="vc-request-button"
                onClick={() =>
                  handleRequestClick(campaign.id, campaign.bloodTypeNeeded)
                }
              >
                Request
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No approved campaigns found.
          </p>
        )}
      </div>
    </div>
  );
}

export default ViewCampain;
