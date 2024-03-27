import React, { useState, useEffect, useContext } from "react";
import Message from "../Components/Message";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ordersContext } from "../Contexts/OrdersContext";
import { productsContext } from "../Contexts/ProductsContext";
import { notificationContext } from "../Contexts/NotificationContext";

const LoginPage = () => {
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {fetchOrders} = useContext(ordersContext);
  const {fetchProducts} = useContext(productsContext);
  const {fetchNotifications} = useContext(notificationContext)
  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      navigate("/orders");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null)
    if (username && password) {
      try {
        const response = await axios.post(
          "/api/adminpanel/login/",
          {
            username: username,
            password: password,
          },
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const token = response.data['access']
        localStorage.setItem("token", token);
        fetchOrders(token)
        fetchProducts(token)
        fetchNotifications(token)
        navigate("/orders");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setMessage("Invalid username or password");
        } else if (error.response && error.response.status === 500) {
          setMessage("Internal server error");
        } else {
          setMessage("An error occurred while logging in.");
        }
      }
    } else {
      setMessage("User name password required")
    }
  };

  return (
    <div className="login-page">
      {message && <Message message={message} setMessage={setMessage}/>}
      <form className="login-form" noValidate onSubmit={handleSubmit}>
        <h3 className="login-heading">Skydot admin</h3>
        <div className="login-form-group">
        <label htmlFor="username">Username</label>

          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="login-input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="invalid-feedback">Username Required</div>
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
