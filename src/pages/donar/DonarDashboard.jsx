import { Link } from "react-router-dom";

function DonarDashboard() {
  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ marginTop: "2rem" }}>
        <Link to="/donar/signup">Sign Up</Link>
        <br />
        <Link to="/donar/forgetpassword">Forget Password</Link>
      </div>
    </div>
  );
}

export default DonarDashboard;
