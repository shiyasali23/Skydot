import React, { useContext } from "react";
import NavBar from "../Components/NavBar";
import { notificationContext } from "../Contexts/NotificationContext";
import Message from "../Components/Message";


const NotificationPage = () => {
  const { notificationsArray, updateNotification, message, setMessage } = useContext(notificationContext);

  const handleSeen = async (id) => {
    const { notificationsArray, load } = await updateNotification(id);
    if (load) {
      setMessage(load);
    } 
  };
console.log(notificationsArray);
  return (
    <div className="notification-page">
    <NavBar />
    {message && <Message message={message} setMessage={setMessage}/>}
    <div className="notification-wrapper">
      {message ? (
        <h3 className="error-message">{message}</h3>
      ) : (
        notificationsArray.map((notification, index) => (
          <div key={index} className="notification-container">
            <p className="notification-text">{notification.body}</p>
            {notification.seen ? (
              <div className="disabled-seen-button"><div/></div>
            ) : (
              <button className="notification-seen-button" onClick={() => handleSeen(notification.id)}>Seen</button>
            )}
          </div>
        ))
      )}
    </div>
  </div>
  );
};

export default NotificationPage;
