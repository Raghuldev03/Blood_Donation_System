import React from "react";
import "./nav.css";
function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#800000" }}
      className="text-light py-5 mt-5"
    >
      <div className="container" style={{ height: "50px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <i
              className="bi bi-telephone-fill fs-5 me-2"
              style={{ color: "#fffff7" }}
            ></i>
            <span style={{ color: "#fffff7" }}>
              Need Help? Call us: +91 1234567890
            </span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <a
              href="mailto:blood@gmail.com"
              className="text-light text-decoration-none"
              aria-label="Send email"
            >
              <i className="bi bi-envelope-fill fs-5"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light text-decoration-none"
              aria-label="Instagram"
            >
              <i className="bi bi-instagram fs-5"></i>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light text-decoration-none"
              aria-label="Facebook"
            >
              <i className="bi bi-facebook fs-5"></i>
            </a>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div
          className="text-center small"
          style={{ color: "#ffff7", marginTop: "-10px" }}
        >
          © {new Date().getFullYear()} Developed by Raghul B . All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
export default Footer;
