import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css"; 

const Login = ({ setIsAuthenticated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!name || !email) {
      alert("Please enter both name and email");
      return;
    }

    try {
      await axios.post(
        "https://frontend-take-home-service.fetch.com/auth/login",
        { name, email },
        { withCredentials: true }
      );

      setIsAuthenticated(true);
      navigate("/search");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your details.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
