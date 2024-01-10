import React from "react";
import "./OrderCard.css";

const OrderCard = ({ order }) => {
  const extractDate = (timestamp) => {
    return timestamp ? timestamp.slice(0, 10) : "";
  };
  return (
    <div className="order-card">
      <div className="order-card-top">
        <div className="order-card-top-left">
          <h6 className="order-owner-details">{order.owner_details?.name}</h6>
          <h6 className="order-owner-details">
            {order.owner_details?.phone_number}
          </h6>
          <h6 className="order-owner-details">{order.owner_details?.city}</h6>
          <h6 className="order-owner-details">
            {order.owner_details?.pincode}
          </h6>
          <h6 className="order-owner-details">
            {order.owner_details?.address}
          </h6> 
        </div>
        <div className="order-card-top-right">
          <h6 className="order-details">
            {order?.status
              ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
              : ""}
          </h6>
          <h6 className="order-details">{order?.total_price}</h6>
          <h6 className="order-details">{order?.payment_method}</h6>
          <h6 className="order-details">{extractDate(order?.created)}</h6>
          <h6 className="order-details">{order?.tracking_id}</h6>
        </div>
      </div>
      <div className="order-card-bottom">
        {order.order_items &&
          order.order_items.map((item, index) => (
            <div key={index} className="order-items-container">
              <h5 className="order-item-details">{item.product_name}</h5>
              <h5 className="order-item-details">{item.size}</h5>
              <h5 className="order-item-details">{item.quantity}</h5>
            </div>
          ))}
          <button className="order-cancel-button">Cancel Order</button>
      </div>
    </div>
  );
};

export default OrderCard;
