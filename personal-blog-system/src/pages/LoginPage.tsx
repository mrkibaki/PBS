import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../components/UserContext";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Error during login");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = await login(username, password);
      console.log("data: is wat ? data is :", data);
      if (data.status === "success") {
        setUser({ username: username });
        navigate("/home");
      } else {
        console.log("Setting error because data.success is not true");
        setError("Opps, something gets wrong, please try it again :)");
      }
    } catch (error) {
      console.log("Setting error because an error occurred:", error);
      setError("Opps, something gets wrong, please try it again :)");
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
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
