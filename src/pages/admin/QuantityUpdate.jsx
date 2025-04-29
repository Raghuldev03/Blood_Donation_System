import React, { useEffect, useState } from "react";
import axios from "axios";
import "./QuantityUpdate.css";

function QuantityUpdate() {
  const [requests, setRequests] = useState([]);
  const [hiddenRequests, setHiddenRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRequests = async (status = "") => {
    try {
      const res = await axios.get("http://localhost:8080/valut/bloodrequests", {
        params: { status: status },
      });
      setRequests(res.data);
    } catch (error) {
      window.alert("Failed to fetch requests: " + error.message);
    }
  };

  // Load hiddenRequests from localStorage and fetch requests
  useEffect(() => {
    const savedHidden = localStorage.getItem("hiddenRequests");
    if (savedHidden) {
      setHiddenRequests(JSON.parse(savedHidden));
    }
    fetchRequests();
  }, []);

  const updateHiddenRequests = (id) => {
    setHiddenRequests((prev) => {
      const updated = [...prev, id];
      localStorage.setItem("hiddenRequests", JSON.stringify(updated));
      return updated;
    });
  };

  const handleUpdateQuantity = async (
    registrationNumber,
    bloodType,
    addQty,
    id
  ) => {
    try {
      window.alert(
        `Approving request for ${bloodType} of ${registrationNumber}`
      );
      await axios.put(
        "http://localhost:8080/valut/bloodquantity/update",
        { quantity: addQty },
        {
          params: {
            registrationNumber: registrationNumber,
            bloodType: bloodType,
          },
        }
      );

      await axios.put("http://localhost:8080/valut/bloodrequest/status", null, {
        params: { id: id, status: "APPROVED" },
      });

      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === id ? { ...req, status: "APPROVED" } : req
        )
      );

      setTimeout(() => {
        updateHiddenRequests(id);
      }, 4000);
    } catch (error) {
      window.alert("Failed to update: " + error.message);
    }
  };

  const handleReject = async (id) => {
    try {
      window.alert(`Rejecting request with ID ${id}`);
      await axios.put("http://localhost:8080/valut/bloodrequest/status", null, {
        params: { id: id, status: "REJECTED" },
      });

      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === id ? { ...req, status: "REJECTED" } : req
        )
      );

      setTimeout(() => {
        updateHiddenRequests(id);
      }, 4000);
    } catch (error) {
      window.alert("Failed to reject request: " + error.message);
    }
  };

  return (
    <div className="quantity-update-container">
      <div className="header-container">
        <h2 className="header-title">Blood Quantity Requests</h2>
        <div className="view-valut-searchbar">
          <input
            type="text"
            placeholder="🔍 Search by Registration Number and Blood Type"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <table className="quantity-update-table">
        <thead>
          <tr>
            <th className="quantity-update-header">ID</th>
            <th className="quantity-update-header">Reg No</th>
            <th className="quantity-update-header">Blood Type</th>
            <th className="quantity-update-header">Requested Quantity</th>
            <th className="quantity-update-header">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests
              .filter(
                (req) =>
                  !hiddenRequests.includes(req.id) &&
                  (req.registrationNumber
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                    req.bloodType
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase()))
              )
              .map((req) => (
                <tr key={req.id} className="quantity-update-row">
                  <td className="quantity-update-cell">{req.id}</td>
                  <td className="quantity-update-cell">
                    {req.registrationNumber}
                  </td>
                  <td className="quantity-update-cell">{req.bloodType}</td>
                  <td className="quantity-update-cell">{req.quantity} unit</td>
                  <td className="quantity-update-cell">
                    {req.status === "APPROVED" ? (
                      <span className="quantity-update-approved">Approved</span>
                    ) : req.status === "REJECTED" ? (
                      <span className="quantity-update-rejected">Rejected</span>
                    ) : (
                      <div className="quantity-update-actions">
                        <input
                          type="number"
                          min="1"
                          defaultValue={req.quantity}
                          id={`qty-${req.id}`}
                          className="quantity-update-input"
                        />
                        <button
                          className="quantity-update-button approve"
                          onClick={() => {
                            const input = document.getElementById(
                              `qty-${req.id}`
                            );
                            handleUpdateQuantity(
                              req.registrationNumber,
                              req.bloodType,
                              parseInt(input.value || "0"),
                              req.id
                            );
                          }}
                        >
                          Approve
                        </button>
                        <button
                          className="quantity-update-button reject"
                          onClick={() => handleReject(req.id)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="5" className="quantity-update-no-data">
                No requests available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default QuantityUpdate;