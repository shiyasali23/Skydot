import React from "react";
import { Spinner } from "react-bootstrap";

function Loader({ text }) {
  return (
    <div
      className="loader-container"
      style={{
        display: "block",
        margin: "auto",
        width: "98%",
        height: "82%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "rgba(0, 0, 0, 0.05)",
      }}
    >
      <h3 className="">
        <Spinner
          animation="border"
          role="status"
          style={{
            height: "70px",
            width: "70px",
            margin: "auto",
            display: "block",
            marginBottom: "50px",
          }}
        ></Spinner>
        {text},Please Wait
      </h3>
    </div>
  );
}

export default Loader;
