import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const notificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notificationsArray, setNotificationsArray] = useState([]);
  const [message, setMessage] = useState(null);
  const storedToken = localStorage.getItem('token')

useEffect(()=>{
if (storedToken) {
  fetchNotifications(storedToken)
}
},[storedToken])


  const fetchNotifications = async (token) => {
    setMessage(null);
    try {
      const response = await axios.get("/api/adminpanel/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const notifications = response.data;
      setNotificationsArray(notifications);
    } catch (error) {
      handleErrors(error)
    }
  };

  const updateNotification = async (id) => {
    setMessage(null);
    try {
      const storedToken = localStorage.getItem("token");
      const response = await axios.put(
        `/api/adminpanel/message/update/${id}/`,
        {
          seen: true,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      const updatedNotification = response.data;
      setNotificationsArray((prevArray) => prevArray.map((notification) => {
        if (notification.id === updatedNotification.id) {
          return updatedNotification;
        } else {
          return notification;
        }
      }));

      return { notificationsArray };
    } catch (error) {
      handleErrors(error)
      return { success: false };
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
    <notificationContext.Provider
      value={{ notificationsArray, message, setMessage, updateNotification,fetchNotifications }}
    >
      {children}
    </notificationContext.Provider>
  );
};
