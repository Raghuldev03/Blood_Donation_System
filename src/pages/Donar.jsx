import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import "./donar/Donar.css";
import { useDispatch } from "react-redux";
import { login } from "../redux/Slice/Adminauth"; // same slice, used for all roles

function Donar() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/donar/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          donarEmail: email,
          password: password,
        }),
      });

      const message = await response.text();

      if (response.ok && message === "Donor login successful") {
        alert("🎉 Login successful!");
        dispatch(login({ role: "donor", email })); // 👈 pass email
        navigate("/donar/viewcampain");
      } else {
        alert("❌ " + message);
      }
    } catch (err) {
      alert("❌ Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <div className="login-image" />

          <div className="login-form">
            <div className="logo-row">
              <img
                src="/blood-donation.png"
                alt="Blood Donation Logo"
                className="logo-icon"
              />
              <h5
                className="login-subtitle"
                style={{ color: "#800000", fontWeight: "bold" }}
              >
                Sign into Donor Account
              </h5>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="donarEmail"
                placeholder="Email address"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a
                href="/donar/forgetpassword"
                className="forgot-password"
                target="_blank"
                rel="noopener noreferrer"
              >
                Forgot password?
              </a>
              <br />
              <button type="submit" className="login-button">
                Login
              </button>
            </form>

            <p className="signup-text" style={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <a href="/donar/signup" className="signup-link">
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
      <div className="donar footer">
        <Footer />
      </div>
    </>
  );
}

export default Donar;
