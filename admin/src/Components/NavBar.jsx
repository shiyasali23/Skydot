import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom


const NavBar = () => {
  return (
    <div className="nav-bar">
      <h1 className="nav-logo">
        Skydot-admin <span style={{fontSize:'15px',letterSpacing:'6px'}}></span>
      </h1>
      <div className="nav-list">
        
        <Link style={{ textDecoration: "none", margin:0,padding:0 }} to="/">
          <h4 className="nav-item">Orders<p className="line"></p> </h4>      
        </Link>
       
        <Link style={{ textDecoration: "none" }} to="/products">
          <h4 className="nav-item">Products<p className="line"></p> </h4>
        </Link>
       
        <Link style={{ textDecoration: "none" }} to="/dashboard">
          <h4 className="nav-item">Dashboard<p className="line"></p> </h4>
        </Link>
       
        <Link style={{ textDecoration: "none" }} to="/notification">
        <i className="fa-solid fa-bell"></i>
        </Link> 
        
        <Link style={{ textDecoration: "none" }} to="/notification">
        <i className="fa-solid fa-right-from-bracket"></i>
        </Link>
      
      </div>
    </div>
  );
};

export default NavBar;
