import React, { useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { cartContext } from "../../Contexts/CartContext";

const Header = () => {
  const { cartArray } = useContext(cartContext);
  const cartLength = cartArray.length;

  return (
    <div className="navbar" >
      <div className="nav-container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 className="nav-logo">SKYDOT</h1>
        </Link>

        <ul className="nav-list">
          <Link style={{ textDecoration: "none" }} to="/shirts">
            <li>Shirts</li>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/pants">
            <li>Pants</li>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/t-shirts">
            <li>T-Shirts</li>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/orders">
            <li>Orders</li>
          </Link>
        </ul>

        <div className="nav-cart-container">
          <p
            className="cart-quantity"
            style={{ display: cartLength > 0 ? "inline" : "none" }}
          >
            {cartLength}
          </p>
          <Link style={{ textDecoration: "none", color: "black" }} to="/cart">
            <span
              style={{ display: cartLength > 0 ? "inline" : "none" }}
              className="cart-icon fa-solid fa-cart-shopping"
            ></span>
          </Link>
        </div>
      </div>
      
    </div>
  );
};

export default Header;
