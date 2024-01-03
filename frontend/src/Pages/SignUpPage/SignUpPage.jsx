import React, { useContext, useEffect, useState } from "react";
import "./SignUpPage.css";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Contexts/UserContext";

const SignUpPage = () => {
  const localUser = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false;

  const { signUpUser, signMessage } = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [localEmail, setLocalEmail] = useState("");
  const [localName, setLocalName] = useState("");
  const [localPassword, setLocalPassword] = useState("");
  const [localPassword2, setLocalPassword2] = useState("");
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate()

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (localPassword === localPassword2) {
      try {
        setLoading(true);
        await signUpUser(localName, localEmail, localPassword);
        console.log(signMessage);
      } catch (error) {
        setLocalError("Sign up failed");
        console.error("Sign up failed", error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setLocalError("Passwords do not match");
    }
  };
  
  useEffect(() => {
    if (localUser) {
      navigate('/');
    }
  },);
 
  return (
    <div className="signup-page">
      <div className="signup-form">
        <Link to="/">
          <p className="go-back-text">Go back</p>
        </Link>
        <h2 className="form-title">Sign up</h2>
        <form
          className="register-form"
          id="register-form"
          onSubmit={handleSubmit}
        >
          <input
            required
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
          />

          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            value={localEmail}
            onChange={(e) => setLocalEmail(e.target.value)}
          />

          <input
            required
            type="password"
            name="pass"
            id="pass"
            placeholder="Password"
            onChange={(e) => setLocalPassword(e.target.value)}
          />

          <input
            required
            type="password"
            name="re_pass"
            id="re_pass"
            placeholder="Repeat your password"
            onChange={(e) => setLocalPassword2(e.target.value)}
          />

          <button
            className="login-button login"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="message-container">
          {localError && <p className="error-message">{localError}</p>}
          {signMessage && <p>{signMessage}</p>}
        </div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
