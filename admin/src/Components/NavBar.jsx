import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import Message from "./Message";

const NavBar = ({ }) => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="nav-bar">
      <div className="nav-left">
        <h1 className="nav-logo">Skydot</h1>

        <Link style={{ textDecoration: "none" }} to="/dashboard">
        <i className="fa-solid fa-chart-simple" style={{fontSize:'23px',cursor:'pointer'}}></i>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/notification">
          <i className="fa-solid fa-bell" style={{fontSize:'23px',cursor:'pointer'}}></i>
        </Link>

      </div>

      <div className="nav-right">
        <Link style={{ textDecoration: "none", margin: 0, padding: 0 }} to="/">
          <h4 className="nav-item">
            Orders<p className="line"></p>{" "}
          </h4>
        </Link>

        <Link style={{ textDecoration: "none" }} to="/products">
          <h4 className="nav-item">
            Products<p className="line"></p>{" "}
          </h4>
        </Link>

        <i className="fa-solid fa-right-from-bracket" style={{fontSize:'20px',color:'black',cursor:'pointer'}} onClick={logOut}></i>

      </div>
    </div>
  );
};

export default NavBar;
