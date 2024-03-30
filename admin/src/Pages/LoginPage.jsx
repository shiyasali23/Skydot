import React, { useState, useEffect, useContext } from "react";
import Message from "../Components/Message";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ordersContext } from "../Contexts/OrdersContext";
import { notificationContext } from "../Contexts/NotificationContext";
import { productsContext } from "../Contexts/ProductsContext";

const LoginPage = () => {
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("token");

  const { fetchOrders } = useContext(ordersContext);
  const { fetchProducts } = useContext(productsContext);
  const { fetchNotifications } = useContext(notificationContext);

  useEffect(() => {
    if (storedToken) {
      navigate("/orders");
    }
  }, [navigate, storedToken]);

  const handleLogin = async () => {
    setMessage(null);
    if (!username || !password) {
      setMessage("Username and password are required");
      return;
    }

    try {
      const response = await axios.post("/api/adminpanel/login/", {
        username: username,
        password: password,
      });

      const token = response.data["access"];
      await fetchData(token);
     
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage("Invalid username or password");
      } else if (error.response && error.response.status === 500) {
        setMessage("Internal server error");
      } else {
        setMessage("An error occurred while logging in.");
      }
    }
  };

  const fetchData = async (token) => {
    try {
      await Promise.all([
        fetchOrders(token),
        fetchProducts(token),
        fetchNotifications(token),
      ]);
      navigate("/orders");
      localStorage.setItem("token", token);
    } catch (error) {
      console.log("Error fetching data:");
    }
  };

  

  return (
    <div className="login-page">
      {message && <Message message={message} />}
      <form className="login-form" onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}>
        <h3 className="login-heading">Skydot admin</h3>
        <div className="login-form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
