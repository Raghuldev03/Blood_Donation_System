import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";

function ApprovedDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = useSelector((state) => state.auth.email);

  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:8080/donar/certificate/approved?email=${email}`)
        .then((res) => {
          setDonations(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching donations", err);
          setLoading(false);
        });
    }
  }, [email]);

  if (loading) return <p>Loading...</p>;

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        marginTop: "7%"
      }}
    >
      <h2 style={{ textAlign: "center", color: "#b71c1c", fontWeight:"bold" }}>
        Approved Certificates
      </h2>
      {donations.length === 0 ? (
        <p style={{ color: "gray", textAlign: "center" }}>
          No certificates available.
        </p>
      ) : (
        donations.map((donation) => (
          <div
            key={donation.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "1rem",
              margin: "1rem 0",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p>
              <strong>Donor Name:</strong> {donation.donorName}
            </p>
            <p>
              <strong>Donation Date:</strong>{" "}
              {new Date(donation.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Location:</strong> {donation.location}
            </p>
            <p>
              <strong>Status:</strong> {donation.status}
            </p>
            <button
              onClick={() => generateCertificate(donation)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#b71c1c",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Download Certificate
            </button>
          </div>
        ))
      )}
    </div>
  );
}

function generateCertificate(donation) {
  const doc = new jsPDF();

  // Corrected logo URL path
  const logoUrl = `${window.location.origin}/assets/charity-about.png`; // Ensure the logo is in the 'public/assets' folder
  doc.addImage(logoUrl, "PNG", 80, 10, 50, 50);

  // Add title
  doc.setFontSize(22);
  doc.setTextColor("#b71c1c");
  doc.text("Blood Donation Certificate", 105, 80, { align: "center" });

  // Add donor details
  doc.setFontSize(14);
  doc.setTextColor("#333");
  doc.text(
    `This is to certify that ${
      donation.donorName
    } has donated blood on ${new Date(donation.date).toLocaleDateString()} at ${
      donation.location
    }.`,
    20,
    100,
    { maxWidth: 170 }
  );

  // Add campaign and blood bank details
  doc.text(
    `The donation was made under the campaign "${
      donation.campaignName || "None"
    }", organized by ${donation.bloodBankName || "None"}.`,
    20,
    120,
    { maxWidth: 170 }
  );

  // Add general description
  doc.setFontSize(12);
  doc.setTextColor("#555");
  doc.text(
    "Blood donation is a noble act that saves lives. Your contribution is deeply appreciated and makes a significant impact on the community.",
    20,
    140,
    { maxWidth: 170 }
  );

  // Add footer
  doc.setFontSize(10);
  doc.setTextColor("#777");
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 280, {
    align: "center",
  });

  // Save as PDF
  doc.save(`Blood_Donation_Certificate_${donation.donorName}.pdf`);
}

export default ApprovedDonations;
