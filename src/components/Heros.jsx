function Heros() {
  return (
    <div
      className="hero-section position-relative"
      style={{
        backgroundImage: `url("/assets/hero-background.jpg")`, // Correct path for public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "70vh",
      }}
    >
      <div
        className="overlay position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for better text visibility
        }}
      />
      <div className="container position-relative text-center text-white d-flex align-items-center justify-content-center h-100">
        <div>
          <h1 className="display-4 fw-bold mb-4">Save a Life, Donate Blood</h1>
          <p className="lead fs-4 mb-5">
            Your donation can make a life-saving difference. Join us in making
            an impact.
          </p>
          <a
            href="/Donar"
            className="btn btn-danger btn-lg px-4 py-2 text-uppercase fw-bold"
            style={{ borderRadius: "30px" }}
          >
            Donate Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default Heros;
