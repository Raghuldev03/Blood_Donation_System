import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Donor1.css"; // Ensure this CSS file is styled properly

function DonationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { campaign } = location.state || {};
  const userEmail = useSelector((state) => state.auth.email);

  const [donorDetails, setDonorDetails] = useState(null);
  const [eligibleToDonate, setEligibleToDonate] = useState(false);
  const [bloodTypeMatch, setBloodTypeMatch] = useState(true);

  const [donationData, setDonationData] = useState({
    donorEmail: userEmail || "",
    donorName: "",
    bloodType: "", // Changed from bloodGroup to bloodType
    location: campaign?.location || "",
    campaignName: campaign?.campaignName || "",
    bloodBankName: "",
    date: campaign?.date || "",
    time: "",
    status: "Scheduled",
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    const fetchDonorDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/donar/details?email=${userEmail}`
        );
        const { donorName, lastDonationDate, bloodGroup } = res.data;

        setDonorDetails({ donorName, lastDonationDate, bloodGroup });

        setDonationData((prevData) => ({
          ...prevData,
          donorName,
          bloodType: bloodGroup, // Set the correct bloodType here
        }));

        const lastDate = new Date(lastDonationDate);
        const today = new Date();
        const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
        setEligibleToDonate(diffDays >= 90);

        if (campaign?.bloodTypeNeeded) {
          setBloodTypeMatch(bloodGroup === campaign.bloodTypeNeeded);
        }
      } catch (error) {
        console.error("Failed to fetch donor details", error);
      }
    };

    if (userEmail) {
      fetchDonorDetails();
    }
  }, [userEmail, campaign]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "bloodType" && campaign?.bloodTypeNeeded) {
      setBloodTypeMatch(value === campaign.bloodTypeNeeded);
    }
  };

  const donationRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/donar/donation/savedata",
        donationData
      );
      if (response.status === 200) {
        window.alert("Data submitted successfully!");
        navigate("/"); 
      }
    } catch (error) {
      console.error("Error submitting donation request:", error);
      window.alert("Failed to submit data. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    donationRequest(); 
  };

  return (
    <div className="donation-form-container">
      <h2 className="donation-form-title">Blood Donation Form</h2>
      <form className="donation-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Donor Email</label>
            <input
              type="email"
              name="donorEmail"
              value={donationData.donorEmail}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Donor Name</label>
            <input
              type="text"
              name="donorName"
              value={donationData.donorName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Blood Group</label>
            <input
              type="text"
              name="bloodType" // Changed from bloodGroup to bloodType
              value={donationData.bloodType}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Campaign Name</label>
            <input
              type="text"
              name="campaignName"
              value={donationData.campaignName}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={donationData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={donationData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={donationData.time}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Blood Bank Name</label>
            <input
              type="text"
              name="bloodBankName"
              value={donationData.bloodBankName}
              onChange={handleInputChange}
              required
            />
          </div>

          {donorDetails?.lastDonationDate && (
            <div className="form-group">
              <label>Last Blood Donation Date</label>
              <input
                type="text"
                value={new Date(
                  donorDetails.lastDonationDate
                ).toLocaleDateString()}
                disabled
              />
            </div>
          )}
        </div>

        {campaign?.bloodTypeNeeded && !bloodTypeMatch && (
          <p className="error-message">
            Blood type mismatch! Campaign requires{" "}
            <strong>{campaign.bloodTypeNeeded}</strong>, but your blood type is{" "}
            <strong>{donationData.bloodType}</strong>.
          </p>
        )}

        <div className="form-group eligibility-status">
          <label
            style={{
              fontWeight: "bold",
              color: eligibleToDonate ? "green" : "red",
            }}
          >
            Eligible to Donate: {eligibleToDonate ? "Yes ✅" : "No ❌"}
          </label>
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={
            !eligibleToDonate || (campaign?.bloodTypeNeeded && !bloodTypeMatch)
          }
        >
          Submit Donation
        </button>
      </form>
    </div>
  );
}

export default DonationPage;
