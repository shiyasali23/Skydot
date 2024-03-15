import React, { useContext, useState } from "react";
import { AdminContext } from "../Contexts/AuthenticationContext";

const Message = ({ message }) => {
    const {setMessage} = useContext(AdminContext)
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    setMessage("");
  };

  return visible ? (
    <div
      className="message"
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#f44336",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        fontSize: "14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "280px"
      }}
    >
      <span>{message}</span>
      <button
        onClick={handleClose}
        style={{
          background: "none",
          border: "none",
          color: "inherit",
          cursor: "pointer"
        }}
      >
        ×
      </button>
    </div>
  ) : null;
};

export default Message;
