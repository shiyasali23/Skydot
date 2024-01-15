import React from "react";
import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

const OrdersPage = () => {
  return (
    <div className="orders-page">
      <NavBar />

      <div className="orders-header">
        <h5 className="orders-header-value">Date</h5>
        <h5 className="orders-header-value">Tracking ID</h5>
        <h5 className="orders-header-value">Name</h5>
        <h5 className="orders-header-value">City</h5>
        <h5 className="orders-header-value">Toatl Price</h5>
        <h5 className="orders-header-value">QNt</h5>
        <h5 className="orders-header-value">Delivery</h5>
        <h5 className="orders-header-value">Status</h5>
        <h5 className="orders-header-value">Untaken</h5>
      </div>

      <div className="orders-container">
        
        <div className="orders-card">
          <h5 className="orders-card-value">23-03-2024</h5>
          <h5 className="orders-card-value">9876544</h5>
          <h5 className="orders-card-value">Shiyas</h5>
          <h5 className="orders-card-value">Kozhikode</h5>
          <h5 className="orders-card-value">$1300</h5>
          <h5 className="orders-card-value">3</h5>
          <h5 className="orders-card-value">False</h5>
          <h5 className="orders-card-value">Prosessing</h5>
          <Link style={{ textDecoration: "none", height: "40%" }} to="/add-orders">
            <h5 className="orders-edit-bttn">Edit</h5>
          </Link>
        </div>
      
      </div>
    </div>
  );
};

export default OrdersPage;
