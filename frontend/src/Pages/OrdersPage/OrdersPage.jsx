import React from "react";
import "./OrdersPage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const OrdersPage = () => {
  return (
    <div className="orders-page">
      <Header />
      <div className="orders-container">
        <form action="" class="orders-form">
          <input className="orders-input" type="text" placeholder="Enter OrderID or Phonenumber" />
          <input className="orders-submit" type="submit" value="Get" />
        </form>
        <div className="orders-wrapper">
          <div className="orders-card"></div>
          <div className="orders-card"></div>
          <div className="orders-card"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrdersPage;
