import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const ordersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [ordersArray, setOrdersArray] = useState([]);
  const [message, setMessage] = useState("");
  

  const fetchOrders = async () => {
    try {
      const storedToken = localStorage.getItem('token')
      const response = await axios.get("/api/frontend/orders", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      const orders = response.data;
      setOrdersArray(orders);
    } catch (error) {
      if (error.response.status === 401) {
        setMessage("Authentication error Please login again.");
        console.log(error);
      } else if (error.response.status === 500) {
        setMessage("Internal server error");
        console.log(error);
      } else {
        setMessage("An unknown error occurred");
        console.log(error);
      }
    } 
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrder = async (order) => {
    setMessage("");
    try {
      const storedToken = localStorage.getItem("token");  
      const response = await axios.put(`/api/frontend/order/update/${order.id}/`, order, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
  
      const data = response.data;
      console.log(data);
    } catch (error) {
      if (error.response.status === 404) {
        setMessage("Order not found");
        console.log(error);
      } else if (error.response.status === 500) {
        setMessage("Internal server error");
        console.log(error);
      } else {
        setMessage("An unknown error occurred");
        console.log(error);
      }
    } 
  };

  return (
    <ordersContext.Provider value={{ ordersArray, message, updateOrder,fetchOrders }}>
      {children}
    </ordersContext.Provider>
  );
};
