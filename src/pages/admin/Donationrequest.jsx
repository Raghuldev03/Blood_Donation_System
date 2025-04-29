import React, { useEffect, useState } from "react";
import axios from "axios";

function DonationRequest() {
  const [donations, setDonations] = useState([]);
  const [rescheduleData, setRescheduleData] = useState({});
  const [filter, setFilter] = useState("All");

  const fetchDonations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/donar/donation/all"
      );
      setDonations(response.data);
    } catch (error) {
      console.error("Failed to fetch donations:", error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const updateStatus = async (donation, status) => {
    try {
      // Removed the unused 'response' variable
      await axios.put(
        `http://localhost:8080/donar/donation/updateStatusByEmail?donorEmail=${donation.donorEmail}&status=${status}`
      );

      alert(`Donation ${status} successfully!`);
      fetchDonations(); // Refresh the donations list
    } catch (error) {
      alert("Failed to update donation status.");
      console.error(error);
    }
  };

  const handleRescheduleChange = (id, field, value) => {
    setRescheduleData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleRescheduleSubmit = async (donation) => {
    const { date, time } = rescheduleData[donation.id] || {};
    if (!date || !time) {
      alert("Please select both date and time to reschedule.");
      return;
    }

    try {
      const updatedDonation = {
        ...donation,
        date, // Update the date
        time, // Update the time
        status: "Rescheduled", // Update the status to "Rescheduled"
      };

      // Send a PUT request to update the status and date fields of the donation
      await axios.put(
        `http://localhost:8080/donar/donation/updateDonationStatusAndDate?donorEmail=${donation.donorEmail}`,
        updatedDonation
      );

      alert("Donation rescheduled successfully!");
      fetchDonations(); // Refresh the donations list
    } catch (error) {
      console.error("Error rescheduling donation:", error);
      alert("Failed to reschedule donation.");
    }
  };

  const filteredDonations = donations.filter((d) =>
    filter === "All" ? true : d.status === filter
  );

  return (
    <div style={{ padding: "20px", marginTop: "5%" }}>
      <h2>Donation Requests</h2>

      <div style={{ marginBottom: "20px" }}>
        {["All", "Approved", "Cancelled", "Rescheduled"].map((type) => (
          <button
            key={type}
            style={{
              marginRight: "10px",
              padding: "8px 12px",
              backgroundColor: filter === type ? "#1976d2" : "#e0e0e0",
              color: filter === type ? "#fff" : "#000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <table
        border="1"
        style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Donor Name</th>
            <th>Email</th>
            <th>Blood Group</th>
            <th>Campaign</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Blood Bank</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDonations.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                No donation requests found.
              </td>
            </tr>
          ) : (
            filteredDonations.map((donation) => (
              <tr key={donation.id}>
                <td>{donation.donorName}</td>
                <td>{donation.donorEmail}</td>
                <td>{donation.bloodType}</td>
                <td>
                  {donation.campaignName ? donation.campaignName : "None"}
                </td>{" "}
                {/* Updated line */}
                <td>{donation.date}</td>
                <td>{donation.time}</td>
                <td>{donation.status}</td>
                <td>{donation.bloodBankName}</td>
                <td>
                  <button
                    style={{
                      marginRight: "5px",
                      background: "#4caf50",
                      color: "white",
                    }}
                    onClick={() => updateStatus(donation, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    style={{
                      marginRight: "5px",
                      background: "#f44336",
                      color: "white",
                    }}
                    onClick={() => updateStatus(donation, "Cancelled")}
                  >
                    Cancel
                  </button>
                  <div style={{ marginTop: "5px" }}>
                    <input
                      type="date"
                      onChange={(e) =>
                        handleRescheduleChange(
                          donation.id,
                          "date",
                          e.target.value
                        )
                      }
                      style={{ marginRight: "5px" }}
                    />
                    <input
                      type="time"
                      onChange={(e) =>
                        handleRescheduleChange(
                          donation.id,
                          "time",
                          e.target.value
                        )
                      }
                      style={{ marginRight: "5px" }}
                    />
                    <button
                      style={{ background: "#ff9800", color: "white" }}
                      onClick={() => handleRescheduleSubmit(donation)}
                    >
                      Reschedule
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DonationRequest;
