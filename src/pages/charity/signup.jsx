import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./charity.css";
import Footer from "../../components/footer";

function BloodSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bloodBankName: "",
    email: "",
    registrationNumber: "",
    licenseNumber: "",
    bloodBankType: "",
    availableBloodComponents: "",
    contactNumber: "",
    licenseValidityDate: "",
    authorizedPersonName: "",
    personAadhar: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/vault/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration request sent! Wait for admin approval.");
        navigate("/vault");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <div className="bloodbank-container-signup">
        <div className="bloodbank-card-signup">
          <div className="bloodbank-image-signup"></div>

          <div className="bloodbank-form-signup">
            <div className="logo-row-bloodbank">
              <img
                src="/blood-donation.png"
                alt="Blood Donation Logo"
                className="logo-icon"
              />
              <h5
                className="bloodbank-subtitle"
                style={{ color: "#800000", fontWeight: "bold" }}
              >
                Blood Bank Registration
              </h5>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="input-group-bloodbank">
                <input
                  type="text"
                  name="bloodBankName"
                  placeholder="Blood Bank Name"
                  className="bloodbank-input"
                  value={formData.bloodBankName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="bloodbank-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group-bloodbank">
                <input
                  type="text"
                  name="registrationNumber"
                  placeholder="Registration Number"
                  className="bloodbank-input"
                  pattern="^[A-Za-z0-9]{8}$"
                  title="Registration Number must be 8 characters (letters and numbers)"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="licenseNumber"
                  placeholder="License Number"
                  className="bloodbank-input"
                  pattern="^[A-Za-z0-9]{8}$"
                  title="License Number must be 8 characters (letters and numbers)"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group-bloodbank">
                <select
                  name="bloodBankType"
                  className="bloodbank-input"
                  value={formData.bloodBankType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Blood Bank Type</option>
                  <option value="Government">Government</option>
                  <option value="Private">Private</option>
                  <option value="NGO">NGO</option>
                  <option value="Hospital">Hospital</option>
                </select>

                <select
                  name="availableBloodComponents"
                  className="bloodbank-input"
                  value={formData.availableBloodComponents}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Blood Components</option>
                  <option value="Whole Blood">Whole Blood</option>
                  <option value="Plasma">Plasma</option>
                  <option value="Platelets">Platelets</option>
                  <option value="Red Blood Cells">Red Blood Cells</option>
                </select>
              </div>

              <div className="input-group-bloodbank">
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Contact Number"
                  className="bloodbank-input"
                  pattern="[0-9]{10}"
                  title="Phone number must be exactly 10 digits"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                />

                <div className="bloodbank-input-container">
                  <label
                    htmlFor="licenseValidityDate"
                    className="bloodbank-label"
                  >
                    License Validity Date
                  </label>
                  <input
                    type="text"
                    name="licenseValidityDate"
                    id="licenseValidityDate"
                    className="bloodbank-input"
                    placeholder="YYYY-MM-DD"
                    value={formData.licenseValidityDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-group-bloodbank">
                <input
                  type="text"
                  name="authorizedPersonName"
                  placeholder="Authorized Person Name"
                  className="bloodbank-input"
                  value={formData.authorizedPersonName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="personAadhar"
                  placeholder="Authorized Person Aadhar Number"
                  className="bloodbank-input"
                  pattern="\d{12}"
                  title="Aadhar number must be exactly 12 digits"
                  value={formData.personAadhar}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group-bloodbank">
                <textarea
                  name="address"
                  placeholder="Full Address"
                  className="bloodbank-input full-width"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="bloodbank-button">
                Register
              </button>
            </form>

            <p className="bloodbank-text" style={{ color: "#800000" }}>
              Partner with us to save lives ❤️
            </p>
            <p className="bloodbank-text">
              Already registered?{" "}
              <a href="/vault" className="bloodbank-link">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="bloodbank-signup-footer">
        <Footer />
      </div>
    </>
  );
}

export default BloodSignup;
