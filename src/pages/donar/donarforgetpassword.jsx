import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Donar.css";
import Footer from "../../components/footer";

function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      alert("❌ Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        "http://localhost:8080/donar/forgetPassword",
        null,
        {
          params: {
            donarEmail: email,
            password: newPassword,
          },
        }
      );

      if (response.data === "Password updated successfully") {
        alert("🎉 Password updated successfully!");
        navigate("/donar");
      } else {
        alert(`❌ ${response.data}`);
      }
    } catch (error) {
      alert(
        error.response?.data || "❌ Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-container forget-container">
        <div className="auth-box">
          <div className="logo-section">
            <img
              src="/blood-donation.png"
              alt="Blood Donation Logo"
              className="logo-icon"
            />
            <h5
              className="subtitle"
              style={{ color: "#800000", fontWeight: "bold" }}
            >
              Donor Password Reset
            </h5>
          </div>

          <h2 className="auth-title">Forget Password</h2>
          <p className="auth-desc">
            Please enter your email and new password to reset.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="donarEmail"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Enter New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Processing..." : "Reset Password"}
            </button>
          </form>

          <button
            onClick={() => navigate("/donar")}
            className="auth-button secondary-button"
          >
            Back to Login
          </button>
        </div>
      </div>

      <div className="footer-section">
        <Footer />
      </div>
    </>
  );
}

export default ForgetPassword;
