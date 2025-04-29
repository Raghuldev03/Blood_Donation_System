import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin1.css";

function BloodbankManage() {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBloodBanks();
  }, []);

  const fetchBloodBanks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/viewbloodbanks");
      setBloodBanks(res.data);
    } catch (error) {
      window.alert("Failed to fetch blood banks: " + error.message); // Show error in alert
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blood bank?"))
      return;
    try {
      await axios.delete(`http://localhost:8080/admin/deletebloodbank/${id}`);
      window.alert("Blood bank deleted successfully!"); // Show success message in alert
      setBloodBanks(bloodBanks.filter((bank) => bank.id !== id));
    } catch (error) {
      window.alert("Error deleting blood bank: " + error.message); // Show error in alert
    }
  };

  const handleUnapprove = async (id) => {
    try {
      await axios.patch(
        `http://localhost:8080/admin/unapprovebloodbank/${id}`,
        {
          approved: false,
          status: "UNAPPROVED",
        }
      );
      window.alert("Blood bank unapproved successfully!"); // Show success message in alert
      setBloodBanks(
        bloodBanks.map((bank) =>
          bank.id === id
            ? { ...bank, approved: false, status: "UNAPPROVED" }
            : bank
        )
      );
    } catch (error) {
      window.alert("Error unapproving blood bank: " + error.message); // Show error in alert
    }
  };

  const filteredBanks = bloodBanks.filter((bank) =>
    [
      bank.bloodBankName,
      bank.registrationNumber,
      bank.licenseNumber,
      bank.address,
    ].some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="admin-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="admin-table-container">
          <div className="view-donors-header">
            <h1 className="admin-title">Blood Bank Management</h1>
            <div className="view-donors-searchbar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search blood bank..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Reg No.</th>
                <th>License No.</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Type</th>
                <th>License Validity</th>
                <th>Authorized Person</th>
                <th>Aadhar</th>
                <th>Blood Components</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBanks.map((bank) => (
                <tr key={bank.id}>
                  <td>{bank.id}</td>
                  <td>{bank.bloodBankName}</td>
                  <td>{bank.email}</td>
                  <td>{bank.registrationNumber}</td>
                  <td>{bank.licenseNumber}</td>
                  <td>{bank.address}</td>
                  <td>{bank.contactNumber}</td>
                  <td>{bank.bloodBankType}</td>
                  <td>{bank.licenseValidityDate}</td>
                  <td>{bank.authorizedPersonName}</td>
                  <td>{bank.personAadhar}</td>
                  <td>{bank.availableBloodComponents}</td>
                  <td className="capitalize">{bank.status}</td>
                  <td>
                    <button
                      className="btn delete"
                      onClick={() => handleDelete(bank.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn unapprove"
                      onClick={() => handleUnapprove(bank.id)}
                    >
                      Unapprove
                    </button>
                  </td>
                </tr>
              ))}
              {filteredBanks.length === 0 && (
                <tr>
                  <td colSpan="15" className="no-data">
                    No blood banks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BloodbankManage;
