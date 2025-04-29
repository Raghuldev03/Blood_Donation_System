function viewrequest() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#b71c1c",
    marginBottom: "10px",
  };

  const messageStyle = {
    fontSize: "1.2rem",
    color: "#555",
    textAlign: "center",
    maxWidth: "600px",
    lineHeight: "1.6",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Under Development</h1>
      <p style={messageStyle}>
        This feature is currently under development. Please check back later!
      </p>
    </div>
  );
}

export default viewrequest;
