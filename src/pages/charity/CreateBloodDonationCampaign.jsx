import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // to get the registrationNumber
import axios from "axios";
import "./charity1.css"; // Updated CSS file name

function CreateBloodDonationCampaign() {
  const { registrationNumber } = useSelector((state) => state.auth.user); // Get registration number from redux state
  const [formData, setFormData] = useState({
    campaignName: "",
    registrationNumber: registrationNumber || "", // Pre-fill with the registration number
    date: "",
    bloodTypeNeeded: "",
    location: "",
    targetCollection: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (registrationNumber) {
      setFormData((prevData) => ({
        ...prevData,
        registrationNumber: registrationNumber, // Automatically set registrationNumber from redux
      }));
    }
  }, [registrationNumber]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/valut/campaign/create",
        formData
      );
      console.log("Campaign created:", response);
      setMessage("Campaign submitted for admin approval!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      window.alert("Error creating campaign: " + errorMessage); // Show error in alert box
      setMessage("Failed to create campaign. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="campaign-container">
      <h1 className="campaign-title">Create Blood Donation Campaign</h1>
      <form className="campaign-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="campaignName"
          placeholder="Campaign Name"
          value={formData.campaignName}
          onChange={handleInputChange}
          required
          className="campaign-input"
        />
        <input
          type="text"
          name="registrationNumber"
          placeholder="Valut Registration Number"
          value={formData.registrationNumber}
          onChange={handleInputChange}
          required
          className="campaign-input"
          disabled // Make this field non-editable
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
          className="campaign-input"
        />
        <input
          type="text"
          name="bloodTypeNeeded"
          placeholder="Blood Type Needed"
          value={formData.bloodTypeNeeded}
          onChange={handleInputChange}
          required
          className="campaign-input"
        />
        <input
          type="text"
          name="location"
          placeholder="Campaign Location"
          value={formData.location}
          onChange={handleInputChange}
          required
          className="campaign-input"
        />
        <input
          type="number"
          name="targetCollection"
          placeholder="Target Blood Collection (Units)"
          value={formData.targetCollection}
          onChange={handleInputChange}
          required
          className="campaign-input"
        />
        <textarea
          name="description"
          placeholder="Campaign Description"
          value={formData.description}
          onChange={handleInputChange}
          required
          className="campaign-textarea"
        />
        <button
          type="submit"
          disabled={loading}
          className="campaign-submit-button"
        >
          {loading ? "Submitting..." : "Create Campaign"}
        </button>
      </form>
      {message && <p className="campaign-message">{message}</p>}
    </div>
  );
}

export default CreateBloodDonationCampaign;
