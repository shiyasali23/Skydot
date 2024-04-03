import React, { useContext, useEffect } from "react";
import NavBar from "../Components/NavBar";
import { notificationContext } from "../Contexts/NotificationContext";
import Message from "../Components/Message";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const {
    notificationsArray,
    updateNotification,
    message,
    setMessage,
  } = useContext(notificationContext);
    const navigate = useNavigate();



  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/");
    }
  }, []);

  const handleSeen = async (id) => {
    const { load } = await updateNotification(id);
    if (load) {
      setMessage(load);
    }
  };
  return (
    <div className="notification-page">
      <NavBar />
      {!notificationsArray.length ? (
        <h2 className="error-message">Internal Server Error</h2>
      ) : (
        <>
          {message && <Message message={message} setMessage={setMessage} />}
  
          <div className="notification-wrapper">
            {notificationsArray.map((notification, index) => (
                <div key={index} className="notification-container">
                  <p className="notification-text">{notification.body}</p>
                  {notification.seen ? (
                    <div className="disabled-seen-button">
                      <div />
                    </div>
                  ) : (
                    <button
                      className="notification-seen-button"
                      onClick={() => handleSeen(notification.id)}
                    >
                      Seen
                    </button>
                  )}
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
  
};

export default NotificationPage;
