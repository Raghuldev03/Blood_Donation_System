import React, { useState } from "react";
import "./Donar.css";
import Footer from "../../components/footer";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    donarName: "",
    donarEmail: "",
    password: "",
    phoneNumber: "",
    donarAge: "",
    bloodGroup: "",
    address: "",
    lastDonationDate: "",
    available: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "lastDonationDate") {
      const lastDonationDate = new Date(value);
      const currentDate = new Date();
      const differenceInTime = currentDate - lastDonationDate;
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        available: differenceInDays > 90 ? "true" : "false",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const age = parseInt(formData.donarAge, 10);

    if (formData.password.length < 6) {
      alert("❌ Password must be at least 6 characters long.");
      return;
    }

    if (age < 18 || age > 50) {
      alert("❌ Age must be between 18 and 50 to register.");
      return;
    }
    if (formData.phoneNumber.length !== 10) {
      alert("❌ Phone number must be exactly 10 digits long.");
      return;
    }
    // Proceed with form submission
    const form = new URLSearchParams(formData);
    try {
      const response = await fetch("http://localhost:8080/donar/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: form.toString(),
      });

      const result = await response.text();
      if (result === "true") {
        alert("🎉 New registration successful!");
        navigate("/Donar");
      } else {
        alert("❌ Registration failed. Please check your details.");
      }
    } catch (error) {
      alert("❌ Registration failed. Please try again later.");
      console.error("Registration error:", error);
    }
  };

  return (
    <>
      <div className="login-container-signup">
        <div className="login-card-signup">
          <div className="login-image-signup"></div>

          <div className="login-form-signup">
            <div className="logo-row-signup">
              <img
                src="/blood-donation.png"
                alt="Blood Donation Logo"
                className="logo-icon"
              />
              <h5
                className="login-subtitle"
                style={{ color: "#800000", fontWeight: "bold" }}
              >
                New Donar Registration
              </h5>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="input-group-signup">
                <input
                  type="text"
                  name="donarName"
                  placeholder="Full Name"
                  className="login-input-signup"
                  value={formData.donarName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="donarEmail"
                  placeholder="Email"
                  className="login-input-signup"
                  value={formData.donarEmail}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group-signup">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="login-input-signup"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="login-input-signup"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group-signup">
                <input
                  type="number"
                  name="donarAge"
                  placeholder="Age"
                  className="login-input-signup"
                  value={formData.donarAge}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="bloodGroup"
                  placeholder="Blood Group (e.g. O+)"
                  className="login-input-signup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group-signup">
                <label>Last Donation Date</label>
                <input
                  type="date"
                  name="lastDonationDate"
                  placeholder="Last Donation Date"
                  className="login-input-signup"
                  value={formData.lastDonationDate}
                  onChange={handleChange}
                  required
                />
                <select
                  name="available"
                  className="login-input-signup"
                  value={formData.available}
                  onChange={handleChange}
                  required
                >
                  <option value="">Are you available to donate?</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <textarea
                name="address"
                placeholder="Address"
                className="login-input-signup full-width"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit" className="login-button-signup">
                Register
              </button>
            </form>

            <p className="signup-text" style={{ color: "#800000" }}>
              Join us to save lives ❤️
            </p>
            <p className="signup-text">
              Already have an account?{" "}
              <a href="/Donar" className="signup-link-signup">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="admin-signup-footer">
        <Footer />
      </div>
    </>
  );
}

export default Signup;
