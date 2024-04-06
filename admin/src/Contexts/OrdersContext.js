import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const ordersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [ordersArray, setOrdersArray] = useState([]);
  const [message, setMessage] = useState(null);
  const [serverSatus, setServerSatus] = useState(null)
  const [loading, setLoading] = useState(null)


  const storedToken = localStorage.getItem('token')

  useEffect(()=>{
  if (storedToken) {
    fetchOrders(storedToken)
  }
  },[storedToken])




  const fetchOrders = async (token) => {
    setServerSatus(null);
    try {
      const response = await axios.get("/api/frontend/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const orders = response.data;
      setOrdersArray(orders);
    } catch (error) {
      setServerSatus("Server not responding.Please Reaload Again")
    }
  };



  const updateOrder = async (order) => {
    setMessage(null);
    setLoading(true)
    try {
      const storedToken = localStorage.getItem("token");
      const response = await axios.put(
        `/api/frontend/order/update/${order.id}/`,
        order,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      const updatedOrder = response.data;
      setOrdersArray((prevArray) => {
        return prevArray.map((order) => {
          if (order.id === updatedOrder.id) {
            return updatedOrder;
          } else {
            return order;
          }
        });
      });

      return { success: true, load: false };
    } catch (error) {
      handleErrors(error)
      return { success: false };
    }finally{
      setLoading(null)
    }
  };

  const handleErrors = (error) => {
    if (error.response && error.response.status === 401) {
      setMessage("Authentication error: Please login again.");
      localStorage.removeItem("token");
    } else if (error.response && error.response.status === 500) {
      setMessage("Internal server error");
    } else if (error.response && error.response.status === 404) {
      setMessage("Product not found. Something went wrong");
    } else if (error.response && error.response.status === 400) {
      setMessage("Bad request. Please check your input data.");
    } else if (error.response && error.response.status === 403) {
      setMessage("Forbidden. You don't have permission to access this resource.");
    } else if (error.response && error.response.status === 409) {
      setMessage("Conflict. This action conflicts with the current state of the server.");
    } else {
      setMessage("An unknown error occurred");
    }
  };
  

  return (
    <ordersContext.Provider
      value={{ ordersArray, message,serverSatus,loading, updateOrder, fetchOrders }}
    >
      {children}
    </ordersContext.Provider>
  );
};
