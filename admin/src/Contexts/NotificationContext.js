import React, { useState, createContext, useEffect, Children } from "react";
import axios from "axios";

export const notificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notificationsArray, setNotificationsArray] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetchNotifications(storedToken);
    }
  }, []);

  const fetchNotifications = async (storedToken) => {
    setMessage(null);
    try {
      const response = await axios.get("/api/adminpanel/messages", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      const notifications = response.data;
      setNotificationsArray(notifications);
    } catch (error) {
      if (error.response.status === 401) {
        setMessage("Authentication error Please login again.");
        localStorage.removeItem("token");
      } else if (error.response.status === 500) {
        setMessage("Internal server error");
      } else {
        setMessage("An unknown error occurred");
      }
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
    <notificationContext.Provider
      value={{ notificationsArray, message, setMessage, updateNotification, }}
    >
      {children}
    </notificationContext.Provider>
  );
};
