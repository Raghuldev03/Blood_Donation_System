import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/Slice/Adminauth";
import Footer from "../components/footer";

function Charity() {
  const [email, setEmail] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/vault/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, registrationNumber }),
    });

    const text = await res.text();

    if (res.ok) {
      alert("Login successful");

      // Assuming the response contains the registrationNumber
      dispatch(login({ role: "charity", registrationNumber })); // Dispatch with registrationNumber
      navigate("/valut/dashboard"); // Redirect to the dashboard
    } else {
      alert(text); // Show error message if login fails
    }
  };

  return (
    <>
      <div className="login-container-charity">
        <div className="login-card">
          <div className="login-image-charity" />
          <div className="login-form">
            <div className="logo-row">
              <img
                src="/blood-donation.png"
                alt="Blood Donation Logo"
                className="logo-icon"
              />
              <h5
                className="login-subtitle"
                style={{ color: " #800000", fontWeight: "bold" }}
              >
                Sign into Blood Bank
              </h5>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                name="registrationNumber"
                placeholder="Registration Number"
                className="login-input"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                required
              />
              <a href="#!" className="forgot-password">
                Forgot Registration Number?
              </a>
              <br />
              <button type="submit" className="login-button">
                Login
              </button>
            </form>

            <p className="signup-text" style={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <a href="/vault/signup" className="signup-link">
                Register here
              </a>
            </p>

            <div className="terms-row">
              <a href="#!" className="terms-link">
                Terms of use
              </a>
              <a href="#!" className="terms-link">
                Privacy policy
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="charity footer">
        <Footer />
      </div>
    </>
  );
}

export default Charity;