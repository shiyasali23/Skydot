import React, { useContext } from "react";
import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";
import { ordersContext } from "../Contexts/OrdersContext";

const OrdersPage = () => {
  const { ordersArray } = useContext(ordersContext);

  console.log(ordersArray);
  return (
    <div className="orders-page">
      <NavBar />

      <div className="orders-header">
        <h5 className="orders-header-value">Date</h5>
        <h5 className="orders-header-value">Tracking ID</h5>
        <h5 className="orders-header-value">Name</h5>
        <h5 className="orders-header-value">City</h5>
        <h5 className="orders-header-value">Toatl Price</h5>
        <h5 className="orders-header-value">Quantity</h5>
        <h5 className="orders-header-value">Delivered</h5>
        <h5 className="orders-header-value">Status</h5>
        <h5 className="orders-header-value">Untaken</h5>
      </div>

      <div className="orders-container">
        {ordersArray.map((order) => (
          <div className="orders-card">
            <h5 className="orders-card-value">
              {new Date(order.created).toISOString().split('T')[0]}
            </h5>
            <h5 className="orders-card-value">{order.owner_details.tracking_id}</h5>
            <h5 className="orders-card-value">{order.owner_details.name}</h5>
            <h5 className="orders-card-value">{order.owner_details.city}</h5>
            <h5 className="orders-card-value">${order.total_price}</h5>
            <h5 className="orders-card-value">3</h5>
            <h5 className="orders-card-value">False</h5>
            <h5 className="orders-card-value">{order.status}</h5>
            <Link
              style={{
                textDecoration: "none",
                height: "40%",
                width: "125px",
                display: "flex",
                justifyContent: "center",
              }}
              to={`/manage-orders/${order.id}`}
            >
              <h5 className="orders-edit-bttn">Edit</h5>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
