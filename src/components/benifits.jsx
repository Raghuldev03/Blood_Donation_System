function Benifits() {
  return (
    <div className="container my-5 py-4">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold" style={{ color: "rgb(255, 55, 82)" }}>
          Benefitis of Blood
          <span style={{ color: "#aa0000" }}> Donation</span>
        </h1>
        <p className="lead text-muted">
          Discover how your blood donation can make a life-saving difference.
        </p>
      </div>
      <br></br>
      <div className="row row-cols-1 row-cols-md-3 g-5">
        {/* Card 1 */}
        <div className="col">
          <div
            className="card h-100 border-0 shadow-lg rounded-4 p-2 card-hover"
            style={{
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <img
              src="/assets/image1.jpg"
              className="card-img-top rounded-top-4"
              alt="Donor saving a life"
              style={{ height: "320px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h4 className="card-title fw-bold text-danger mb-3">
                Blood Donation Saves Lives
              </h4>
              <p className="card-text fs-5">
                Just one donation can save up to three lives. Your simple act
                can bring hope to those facing medical emergencies.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col">
          <div
            className="card h-100 border-0 shadow-lg rounded-4 p-2 card-hover"
            style={{
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <img
              src="/assets/image2.jpg"
              className="card-img-top rounded-top-4"
              alt="Healthy donor smiling"
              style={{ height: "320px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h4 className="card-title fw-bold text-danger mb-3">
                Boost Your Health
              </h4>
              <p className="card-text fs-5">
                Donating blood improves heart health and promotes new cell
                production, benefiting both body and mind.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col">
          <div
            className="card h-100 border-0 shadow-lg rounded-4 p-2 card-hover"
            style={{
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <img
              src="/assets/images3.jpg"
              className="card-img-top rounded-top-4"
              alt="Group of blood donors"
              style={{ height: "320px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h4 className="card-title fw-bold text-danger mb-3">
                Become a Lifesaving Hero
              </h4>
              <p className="card-text fs-5">
                Join a strong network of compassionate people and inspire others
                to step forward and give the gift of life.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hover styles */}
      <style jsx>{`
        .card-hover:hover {
          transform: scale(1.03);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}

export default Benifits;
