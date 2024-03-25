import React from "react";

const Message = ({ message, setMessage }) => {
  const onClose = () => {
    setMessage(null);
  };

  if (message) {
    return (
      <div
        style={{
          backgroundColor: "rgba(255, 0, 0, 0.75)",
          width: "20%",
          height: "10%",
          color: "white",
          position: "fixed",
          top: "8%",
          left: "47%",
          transform: "translate(-50%, -50%)",
          zIndex: "999",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "15px 5px",
        }}
        className="message-component"
      >
        <p
          style={{ textAlign: "center", color: "white", fontSize: "15px" }}
          className="message-component-text"
        >
          {message}
        </p>

        <i
          style={{
            color: "white",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight:'900'
          }}
          onClick={onClose}
          className="fa-solid fa-x"
        ></i>
      </div>
    );
  }
};

export default Message;
