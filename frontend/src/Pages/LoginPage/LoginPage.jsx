import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Contexts/UserContext";
import "./LoginPage.css";

const LoginPage = () => {

  const { loginUser, loginMessage } = useContext(userContext);
  const [localError, setLocalError] = useState(null);
  const [localPassword, setLocalPassword] = useState("");
  const [localEmail, setLocalEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const localUser = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false;



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await loginUser(localEmail, localPassword);
      console.log(loginMessage); 
    } catch (error) {
      setLocalError("Login failed");
      console.error("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (localUser) {
      navigate('/');
    }
  },);
  
  return (
    
    <div className="login-page">
      <Link to="/">
        <p className="go-back-text">Go back</p>
      </Link>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          
          <input
          required
            className="input email-input"
            type="email"
            value={localEmail}
            placeholder="Email"
            onChange={(e) => setLocalEmail(e.target.value)}
          />
          <input
          required
            className="input password-input"
            type="password"
            value={localPassword}
            placeholder="Password"
            onChange={(e) => setLocalPassword(e.target.value)}
          />
          <button
            className="login-button login"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          
          <div className="message-container">
            {localError && <p className="error-message">{localError}</p>}
            {loginMessage && <p className="error-message">{loginMessage}</p>}
          </div>

         
          <Link to="/signup">Sign up</Link>
        </form>
      </div>
    </div>
  );
}


export default LoginPage;
