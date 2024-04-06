import React, { useContext, useEffect } from "react";
import NavBar from "../Components/NavBar";
import { notificationContext } from "../Contexts/NotificationContext";
import Message from "../Components/Message";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

const NotificationPage = () => {
  const {
    notificationsArray,
    updateNotification,
    message,
    serverSatus,
    setMessage,
    loading,
  } = useContext(notificationContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/");
    }
  }, []);

  const handleSeen = (id) => {
    updateNotification(id);
  };

  return (
    <div className="notification-page">
      <NavBar />
      {message && <Message message={message} setMessage={setMessage} />}
      {serverSatus ? (
        <h2 className="error-message">{serverSatus}</h2>
      ) : loading? (<Loader text={"Updating Notification"}/>) :(
        <>
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
