import React from "react";


function About() {
  return (
    <div className="text-center mb-5">
      <p className="lead text-muted">
        <br></br>
        Discover how your contributions can bring hope and transform lives for
        those in need.
      </p>
      <br></br>

      <div className="container my-5 py-5 px-4 px-md-5">
        <div
          className="row align-items-center g-5"
          style={{
            borderRadius: "8px", // Optional: Add rounded corners
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
            border: "1px solid #e0e0e0", // Optional: Add a border
          }}
        >
          {/* Image Section */}
          <div className="col-md-5 text-center">
            <img
              src="/assets/charity-about.png"
              alt="Charity helping people"
              className="img-fluid rounded-4"
              style={{
                width: "100%",
                height: "auto",
                marginBottom: "50px",             }}
            />
          </div>

          {/* Content Section */}
          <div className="col-md-7">
            <h2 className="fw-bold mb-4" style={{ color: "#e60023" }}>
              Our Society
            </h2>
            <p className="fs-5 text-muted mb-3">
              Our charity is dedicated to saving lives and uplifting communities
              through two vital forms of giving —{" "}
              <strong>blood donation</strong> and{" "}
              <strong>monetary support</strong>. We believe both acts of
              kindness are powerful tools to create a healthier society.
            </p>
            <p className="fs-5 text-muted mb-4">
              Blood donors provide the gift of life to patients in need,
              supporting hospitals and emergency care. Meanwhile, financial
              donors empower us to organize health camps, education drives, food
              relief, and much more for underprivileged communities.
            </p>
            <p className="fs-5 text-muted">
              Whether you're donating blood or funds, you're becoming a part of
              a meaningful mission.
            </p>

            <button
              className="btn px-4 py-2"
              style={{
                backgroundColor: "#ff3752",
                color: "#fff",
                fontWeight: "600",
                borderRadius: "10px",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)", // Add shadow to the button
              }}
              onClick={() => (window.location.href = "/charity")} // Redirect to the charity page
            >
              Join Our Mission
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
