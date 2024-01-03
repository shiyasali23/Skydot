import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../../Contexts/CartContext";
import { userContext } from "../../Contexts/UserContext";

const Header = () => {
  const { cartArray } = useContext(cartContext);
  const { logOutUser } = useContext(userContext);
  const cartLength = cartArray.length;
  const [localUser, setLocalUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLocalUser(JSON.parse(localStorage.getItem("userInfo")) || null);
  }, []);

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "logout") {
      logOutUser();
      setLocalUser(null);
    } else if (selectedValue === "account") {
      navigate("/account");
    }
  };

  return (
    <div className="navbar">
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
        </ul>
        <div className="user-login-dropdown">
          {localUser ? (
            <select
              className="user-select"
              onChange={(e) => handleDropdownChange(e)}
              value="user-name"
            >
              <option className="user-select-options" value="user-name">
                {localUser.name
                  ? localUser.name.charAt(0).toUpperCase() 
                  : ""}
              </option>

              <option className="user-select-options" value="account">
                Account
              </option>

              <option className="user-select-options" value="logout">
                Logout
              </option>
            </select>
          ) : (
            <Link style={{ textDecoration: "none" }} to="/login">
              <i class="fa-solid fa-user login-icon"></i>
            </Link>
          )}
        </div>
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
