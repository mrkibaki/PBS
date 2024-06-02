import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !password) {
      setMessage(
        "Opps, something is missing, did you leave anything blank? :3"
      );
      return;
    }

    try {
      const newUser = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (newUser.ok) {
        navigate("/login");
        return;
      }

      const result = await newUser.json();
      setMessage(result.message || "An error occurred");
    } catch (error) {
      console.error(error);
      setMessage("An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input type="submit" value="Register" />
      {message && <p>{message}</p>}
    </form>
  );
};

export default RegisterPage;
