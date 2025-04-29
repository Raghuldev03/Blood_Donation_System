import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";
import "./report.css";

const Report = () => {
  const [donors, setDonors] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [bloodRequests, setBloodRequests] = useState([]);
  const [campaigns, setCampaigns] = useState([]); // 🆕 Campaign data

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [bloodBankStatusFilter, setBloodBankStatusFilter] = useState("ALL");
  const [campaignStatusFilter, setCampaignStatusFilter] = useState("ALL"); // 🆕 Campaign filter

  useEffect(() => {
    axios
      .get("http://localhost:8080/donors")
      .then((res) => setDonors(res.data))
      .catch((err) => console.error("Error fetching donors:", err));

    axios
      .get("http://localhost:8080/bloodbanks")
      .then((res) => setBloodBanks(res.data))
      .catch((err) => console.error("Error fetching blood banks:", err));

    axios
      .get("http://localhost:8080/request")
      .then((res) => setBloodRequests(res.data))
      .catch((err) => console.error("Error fetching requests:", err));

    axios
      .get("http://localhost:8080/campain") // 🆕 Fetch campaigns
      .then((res) => setCampaigns(res.data))
      .catch((err) => console.error("Error fetching campaigns:", err));
  }, []);

  const downloadExcel = (data, fileName, sheetName) => {
    if (data.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, fileName);
  };

  const filteredRequests =
    statusFilter === "ALL"
      ? bloodRequests
      : bloodRequests.filter(
          (req) => req.status?.toLowerCase() === statusFilter.toLowerCase()
        );

  const filteredBloodBanks =
    bloodBankStatusFilter === "ALL"
      ? bloodBanks
      : bloodBanks.filter(
          (bank) =>
            bank.status?.toLowerCase() === bloodBankStatusFilter.toLowerCase()
        );

  const filteredCampaigns =
    campaignStatusFilter === "ALL"
      ? campaigns
      : campaigns.filter(
          (camp) =>
            camp.status?.toLowerCase() === campaignStatusFilter.toLowerCase()
        );

  return (
    <div className="report-container">
      {/* Donor Report */}
      <div className="report-card">
        <div className="report-content">
          <h2 className="report-title">Donor Report</h2>
          <p className="report-text">
            Total Donors:{" "}
            <span className="report-highlight">{donors.length}</span>
          </p>
          <button
            className="report-button"
            onClick={() => downloadExcel(donors, "Donor_Report.xlsx", "Donors")}
          >
            Download Donor Report
          </button>
        </div>
      </div>

      {/* Blood Bank Report */}
      <div className="report-card">
        <div className="report-content">
          <h2 className="report-title">Blood Bank Report</h2>
          <div className="filter-section">
            <label className="report-text">Filter by Status: </label>
            <select
              className="report-dropdown"
              value={bloodBankStatusFilter}
              onChange={(e) => setBloodBankStatusFilter(e.target.value)}
            >
              <option value="ALL">All</option>
              <option value="APPROVED">Approved</option>
              <option value="UNAPPROVED">Unapproved</option>
            </select>
          </div>
          <p className="report-text">
            Filtered Blood Banks:{" "}
            <span className="report-highlight">
              {filteredBloodBanks.length}
            </span>
          </p>
          <button
            className="report-button"
            onClick={() =>
              downloadExcel(
                filteredBloodBanks,
                `BloodBank_Report_${bloodBankStatusFilter}.xlsx`,
                "Blood Banks"
              )
            }
          >
            Download Blood Bank Report
          </button>
        </div>
      </div>

      {/* Blood Request Report */}
      <div className="report-card">
        <div className="report-content">
          <h2 className="report-title">Blood Quantity Requests</h2>
          <div className="filter-section">
            <label className="report-text">Filter by Status: </label>
            <select
              className="report-dropdown"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
          <p className="report-text">
            Filtered Requests:{" "}
            <span className="report-highlight">{filteredRequests.length}</span>
          </p>
          <button
            className="report-button"
            onClick={() =>
              downloadExcel(
                filteredRequests,
                `BloodRequests_${statusFilter}.xlsx`,
                "Requests"
              )
            }
          >
            Download Request Report
          </button>
        </div>
      </div>

      {/* ✅ Campaign Report */}
      <div className="report-card">
        <div className="report-content">
          <h2 className="report-title">Campaign Report</h2>
          <div className="filter-section">
            <label className="report-text">Filter by Status: </label>
            <select
              className="report-dropdown"
              value={campaignStatusFilter}
              onChange={(e) => setCampaignStatusFilter(e.target.value)}
            >
              <option value="ALL">All</option>
              <option value="APPROVED">Approved</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>
          <p className="report-text">
            Filtered Campaigns:{" "}
            <span className="report-highlight">{filteredCampaigns.length}</span>
          </p>
          <button
            className="report-button"
            onClick={() =>
              downloadExcel(
                filteredCampaigns,
                `Campaigns_${campaignStatusFilter}.xlsx`,
                "Campaigns"
              )
            }
          >
            Download Campaign Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;
