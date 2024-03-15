import React, { useState, useContext, useEffect } from "react";
import Message from "../Components/Message";
import { AdminContext } from "../Contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { fetchAdminLogin, message } = useContext(AdminContext); 
  const storedToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (storedToken) {
      navigate("/orders"); 
    }
  }, [storedToken, navigate]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchAdminLogin(username, password);
  };

  return (
    <div className="login-page">
      {message && <Message message={message} />}
      <form className="login-form" noValidate onSubmit={handleSubmit}>
        <div className="login-form-group">
          <input
            type="text"
            placeholder="Username"
            required
            className="login-input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="invalid-feedback">Username Required</div>
        </div>
        <div className="login-form-group">
          <input
            type="password"
            placeholder="Password"
            required
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="invalid-feedback">Password Required</div>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
