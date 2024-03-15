import React, { useState, createContext, useContext } from "react";
import axios from "axios";
import { productsContext } from "./ProductsContext";
import { ordersContext } from "./OrdersContext";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {

  const [message, setMessage] = useState("");
  
  const {fetchProducts} = useContext(productsContext)
  const{fetchOrders} = useContext(ordersContext)

  const fetchAdminLogin = async (username, password) => {
    setMessage("");

  
    try {
      const response = await axios.post("/api/adminpanel/login/", {
        username: username,
        password: password,
      }, {
        headers: {
          "Content-type": "application/json",
        }
      });
      localStorage.setItem('token',response.data.access)
      fetchProducts()
      fetchOrders()
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized:");
        setMessage("Invalid username or password");
      } else if (error.response && error.response.status === 500) {
        console.log("Internal Server Error:");
        setMessage("Internal server error");
      } else {
        console.log("An error occurred:");
        setMessage("An error occurred while logging in.");
      }
    } 
  };
  
  
  return (
    <AdminContext.Provider value={{ message,setMessage, fetchAdminLogin }}>
      {children}
    </AdminContext.Provider>
  );
};
