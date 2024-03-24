import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const ordersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [ordersArray, setOrdersArray] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetchOrders(storedToken);
    }
  }, []);

  const fetchOrders = async (token) => {
    setMessage(null);
    try {
      const response = await axios.get("/api/frontend/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const orders = response.data;
      setOrdersArray(orders);
      return { ordersArray: orders };
    } catch (error) {
      if (error.response.status === 401) {
        setMessage("Authentication error Please login again.");
      } else if (error.response.status === 500) {
        setMessage("Internal server error");
      } else {
        setMessage("An unknown error occurred");
      }
    }
    return { success: false, errorMessage: message };
  };

  const updateOrder = async (order) => {
    setMessage(null);
    try {
      const storedToken = localStorage.getItem("token");
      const response = await axios.put(
        `/api/frontend/order/update/${order.id}/`,
        order,
        {
          headers: {
            Authorization: `Bearer`, 
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

      return { success: true, load:false };
    } catch (error) {
      if (error.response && error.response.status === 500) {
        return { success: false, load: "Server Error. Try Again" };
      } else if (error.response && error.response.status === 401) {
        return { success: false, load: "Unauthorized, Login Again" };
      } else {

        return { success: false, load: "An Unknown Error Occurred" };
      }
    }
  };

  return (
    <ordersContext.Provider
      value={{ ordersArray, message, updateOrder, fetchOrders }}
    >
      {children}
    </ordersContext.Provider>
  );
};
