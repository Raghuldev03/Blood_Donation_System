import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import "./admin/Admin.css";
import { useDispatch } from "react-redux";
import { login } from "../redux/Slice/Adminauth"; // Corrected import path

function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          adminUsername: username,
          adminPassword: password,
        }),
      });

      const message = await response.text(); 

      if (response.ok && message === "Admin login successful") {
        alert("🎉 Login successful!");
        dispatch(login({ role: "admin" }));
        navigate("/admin/donarmanage");
      } else {
        alert("❌ " + message);
      }
    } catch (err) {
      alert("❌ Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <div className="login-container-admin">
        <div className="login-card">
          <div className="login-image-admin" />

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
                Sign into Admin Account
              </h5>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="adminUsername"
                placeholder="Username"
                className="login-input"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                name="adminPassword"
                placeholder="Password"
                className="login-input"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="login-button">
                Login
              </button>
            </form>

            <p
              className="signup-text"
              style={{ textAlign: "center", color: " #800000" }}
            >
              Note ! Only for Admin{" "}
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
      <div className="admin footer">
        <Footer />
      </div>
    </>
  );
}

export default Admin;
