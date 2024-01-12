import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <h1 className="nav-logo">
        Skydot <span style={{fontSize:'15px',letterSpacing:'6px'}}></span>
      </h1>

      <div className="nav-list">
        <Link style={{ textDecoration: "none", margin:0,padding:0 }} to="/">
          <h4 className="nav-item">Orders<p className="line"></p></h4>
          
        </Link>
        <Link style={{ textDecoration: "none" }} to="/products">
          <h4 className="nav-item">Products<p className="line"></p></h4>
          

        </Link>
        <Link style={{ textDecoration: "none" }} to="/dashbord">
          <h4 className="nav-item">Dashbord<p className="line"></p></h4>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
