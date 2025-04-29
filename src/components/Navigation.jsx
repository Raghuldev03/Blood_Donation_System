import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/Slice/Adminauth";
import "./nav.css";

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, role } = useSelector((state) => state.auth.user);
  const [charityDropdown, setCharityDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleCharityDropdown = () => {
    setCharityDropdown((prev) => !prev);
  };

  return (
    <nav>
      <div className="logo-container">
        <img src="/blood-donation.png" alt="Logo" className="logo" />
        <h1>Being Human Blood Donation Society</h1>
      </div>
      <ul>
        {!isLoggedIn && (
          <>
            <Link to="/">Home</Link>
            <Link to="/admin">Admin</Link>
            <Link to="/vault">Blood Vault</Link>
            <Link to="/donar">Donor</Link>
          </>
        )}

        {isLoggedIn && role === "admin" && (
          <>
            <div className="dropdown">
              <span className="dropdown-title">
                <Link to="/admin/donarmanage" className="dropdown-link">
                  Donor Manage
                </Link>{" "}
              </span>
            </div>

            <div className="dropdown">
              <span className="dropdown-title">
                <Link to="/admin/bloodbankmanage" className="dropdown-link">
                  Blood Vault
                </Link>{" "}
                <span
                  className={`arrow ${charityDropdown ? "rotate" : ""}`}
                  onClick={toggleCharityDropdown}
                >
                  ⮟
                </span>
              </span>
              <div
                className={`dropdown-content ${
                  charityDropdown ? "active" : ""
                }`}
              >
                <Link to="/admin/vaultrequest">Vault Request</Link>
                <Link to="/admin/campainrequest">Campain Request</Link>
                <Link to="/admin/quantityupdate">Quantity-Update</Link>
              </div>
            </div>
            <Link to="/admin/donationapprove" className="navcontent-link">
              Donation
            </Link>
            <Link to="/admin/report" className="navcontent-link">
              Reports
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}

        {isLoggedIn && role === "donor" && (
          <>
            {" "}
            <Link to="/donar/viewcampain">View Campain</Link>
            <Link to="/donar/viewbloodrequest">View Request</Link>
            <Link to="/donar/donation">Donation</Link>
            <Link to="/donar/certificate">Certificate</Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}

        {isLoggedIn && role === "charity" && (
          <>
            <Link to="/valut/dashboard">Donars</Link>
            <Link to="/valut/createcampaign">Campain</Link>
            <Link to="/valut/Viewcampain">View-Campain</Link>
            <Link to="/valut/history">Blood-Request</Link>
            <Link to="/valut/bloodunit">Bloodunit</Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
