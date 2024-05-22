// WelcomePage.tsx
import React from "react";
import { Link } from "react-router-dom";

const WelcomePage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        color: "#333",
      }}
    >
      <h1>PBS, Share your soulful thoughts!</h1>
      <div style={{ marginTop: "20px" }}>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register" style={{ marginLeft: "10px" }}>
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
