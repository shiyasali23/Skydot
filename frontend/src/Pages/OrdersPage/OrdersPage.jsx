import React, { useContext, useState } from "react";
import "./OrdersPage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import OrderCard from "../../Components/OrderCard/OrderCard";
import { orderContext } from "../../Contexts/OrderContext";

const OrdersPage = () => {
  const { getOrder, userOrders, loading } = useContext(orderContext);
  const [trackingId, setTrackingId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    getOrder(trackingId);
  };
console.log(userOrders);
  return (
    <div className="orders-page">
      <Header />
      <div className="orders-container">
        <form className="orders-form" onSubmit={handleSubmit}>
          <input
            required
            className="orders-input"
            type="text"
            placeholder="Enter Tracking Id"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
          <input className="orders-submit" type="submit" value="Get" />
        </form>
        <div className="orders-wrapper">
          {userOrders ? (
            <OrderCard order={userOrders} />
          ) : (
            <h3>Search Order With Tracking Id</h3>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrdersPage;
