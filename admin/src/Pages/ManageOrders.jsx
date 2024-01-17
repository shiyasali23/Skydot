import React, { useContext, useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { useParams } from "react-router-dom";
import { ordersContext } from "../Contexts/OrdersContext";

const ManageOrders = () => {
  const { id } = useParams();
  const { ordersArray, updateOrder } = useContext(ordersContext);
  const [order, setOrder] = useState(
    ordersArray.find((order) => order.id === id)
  );

  useEffect(() => {
    setOrder(ordersArray.find((order) => order.id === id));
  }, [ordersArray, id]);
  console.log(ordersArray,id,order);
  return (
    <div className="manage-orders-page">
      <NavBar />

      <form action="" className="manage-orders-form">
        <div className="manage-order-left">
          <h5 className="manage-orders-value">{order.owner_details?.name}</h5>

          <h5 className="manage-orders-value">23-03-2024</h5>
          <h5 className="manage-orders-value">{order.owner_details?.email}</h5>
          <h5 className="manage-orders-value">{order.owner_details?.phone_number}</h5>
          <h5 className="manage-orders-value">{order.owner_details?.city}</h5>
          <h5 className="manage-orders-value">{order.owner_details?.pincode}</h5>
          <h5 className="manage-orders-value">
          {order.owner_details.addres}
          </h5>
        </div>

        <div className="manage-order-right">
          <div className="manage-orders-right-top">
            <select
              name="order-status"
              id="order-status"
              style={{ width: "40%", marginLeft: "140px", height: "15%" }}
            >
              <option value="processing">Processing</option>
              <option value="shipped">Moved</option>
              <option value="shipped">Shipped</option>
              <option value="return">Return</option>
            </select>
            <h5 className="manage-orders-value">Not Delivered</h5>
            <h5 className="manage-orders-value">$1300</h5>
            <h5 className="manage-orders-value">$100</h5>
            <h5 className="manage-orders-value">UPI</h5>
          </div>

          <div className="manage-order-right-bottom">
            <div className="order-items-container">
              <h5 className="">Abstract Print Shirt</h5>
              <h5 className="">M</h5>
              <h5 className="">2</h5>
            </div>
            <div className="order-items-container">
              <h5 className="">Abstract Print Shirt</h5>
              <h5 className="">M</h5>
              <h5 className="">2</h5>
            </div>
          </div>

          <button className="order-save-button">Save</button>
        </div>
      </form>
    </div>
  );
};

export default ManageOrders;
