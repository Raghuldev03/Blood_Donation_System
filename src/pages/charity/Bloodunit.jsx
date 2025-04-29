import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./Bloodunit.css"; // Assuming you have a separate CSS file

function Bloodunit() {
  const registrationNumber = useSelector(
    (state) => state.auth.user.registrationNumber
  );
  const [bloodQuantities, setBloodQuantities] = useState([]);
  const [requestQuantity, setRequestQuantity] = useState({});

  const fetchBloodQuantities = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/valut/bloodquantity/${registrationNumber}`
      );
      setBloodQuantities(res.data);
    } catch (err) {
      window.alert("Failed to load blood data."); // Show error in alert
    }
  }, [registrationNumber]);

  useEffect(() => {
    if (registrationNumber) fetchBloodQuantities();
  }, [registrationNumber, fetchBloodQuantities]);

  const requestBlood = async (bloodType) => {
    const quantity = requestQuantity[bloodType];
    if (!quantity || isNaN(quantity) || parseInt(quantity) <= 0) {
      window.alert("Enter a valid request quantity."); // Show validation error in alert
      return;
    }

    try {
      await axios.post("http://localhost:8080/valut/bloodrequest", {
        registrationNumber,
        bloodType,
        quantity: parseInt(quantity),
        date: new Date().toISOString(),
      });
      window.alert("Request submitted successfully."); // Show success message in alert
      setRequestQuantity({});
    } catch (err) {
      window.alert("Failed to submit request."); // Show error in alert
    }
  };

  return (
    <div className="bloodunit-container p-6 max-w-4xl mx-auto">
      <h1 className="title text-3xl font-semibold mb-6 text-red-600">
        Your Blood Quantity
      </h1>

      <table className="blood-table table-auto w-full border border-gray-300 rounded-lg shadow-xl">
        <thead>
          <tr>
            <th className="header border px-4 py-3 text-sm text-white bg-gradient-to-r from-red-500 to-red-600">
              Blood Type
            </th>
            <th className="header border px-4 py-3 text-sm text-white bg-gradient-to-r from-red-500 to-red-600">
              Quantity
            </th>
            <th className="header border px-4 py-3 text-sm text-white bg-gradient-to-r from-red-500 to-red-600">
              Status
            </th>
            <th className="header border px-4 py-3 text-sm text-white bg-gradient-to-r from-red-500 to-red-600">
              Collected On
            </th>
            <th className="header border px-4 py-3 text-sm text-white bg-gradient-to-r from-red-500 to-red-600">
              Request
            </th>
          </tr>
        </thead>
        <tbody>
          {bloodQuantities.map((bq, index) => (
            <tr
              key={index}
              className="table-row hover:bg-gray-100 transition-all duration-200"
            >
              <td className="cell border px-4 py-3 text-gray-700">
                {bq.bloodType}
              </td>
              <td className="cell border px-4 py-3 text-gray-700">
                {bq.quantity} unit
              </td>
              <td
                className={`cell border px-4 py-3 ${
                  bq.quantity < 5 ? "text-red-600" : "text-green-600"
                } font-semibold`}
              >
                {bq.quantity < 5 ? "Low" : "Sufficient"}
              </td>
              <td className="cell border px-4 py-3 text-gray-500">
                {new Date(bq.dateOfCollection).toLocaleDateString()}
              </td>
              <td className="cell border px-4 py-3 flex items-center">
                <input
                  type="number"
                  min="1"
                  placeholder="unit"
                  value={requestQuantity[bq.bloodType] || ""}
                  onChange={(e) =>
                    setRequestQuantity({
                      ...requestQuantity,
                      [bq.bloodType]: e.target.value,
                    })
                  }
                  className="input-field border px-3 py-2 w-28 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                />
                <button
                  className="request-btn bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out ml-2"
                  onClick={() => requestBlood(bq.bloodType)}
                >
                  Request
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bloodunit;
