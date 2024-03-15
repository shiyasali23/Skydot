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

  const handleSubmit = (e)=>{
    e.preventDefault()
    updateOrder(order)
  }


  return (
    <div className="manage-order-page">
      <NavBar />

      <form action="" onSubmit={handleSubmit} className="manage-order-form">
        <div className="manage-order-left">
          <div className="manage-order-value-container">
            <h5 className="manage-order-value">Delivered At</h5>
            <h5 className="manage-order-value">
              {order?.deliveredAt ? (
                new Date(order.deliveredAt).toLocaleDateString()
              ) : (
                <i
                  className="fa-solid fa-x"
                  style={{
                    color: "red",
                    fontSize: "13px",
                    fontWeight: "800",
                  }}
                ></i>
              )}
            </h5>
          </div>

          <div className="manage-order-value-container">
            <h5 className="manage-order-value">Ordered At</h5>
            <h5 className="manage-order-value">
              {new Date(order ? order.created : "").toLocaleDateString()}
            </h5>
          </div>

          <div className="manage-order-value-container">
            <h5 className="manage-order-value">Name</h5>
            <h5 className="manage-order-value">{order?.customer?.name}</h5>
          </div>

          <div className="manage-order-value-container">
            <h5 className="manage-order-value">Email</h5>
            <h5 className="manage-order-value">
              {order?.customer?.email}
            </h5>
          </div>

          <div className="manage-order-value-container">
            <h5 className="manage-order-value">Phone Number</h5>
            <h5 className="manage-order-value">
              {order?.customer?.phone_number}
            </h5>
          </div>

          <div className="manage-order-value-container">
            <h5 className="manage-order-value">City</h5>
            <h5 className="manage-order-value">
              {order?.customer?.city}
            </h5>
          </div>

          <div className="manage-order-value-container">
            <h5 className="manage-order-value">Pincode</h5>
            <h5 className="manage-order-value">
              {order?.customer?.pincode}
            </h5>
          </div>

          <div className="manage-order-value-container">
            <h5 className="manage-order-value">Address</h5>
            <h5 className="manage-order-value">
              {order?.customer?.address}
            </h5>
          </div>
        </div>

        <div className="manage-order-right">
          <div className="manage-order-right-top">
            <div className="manage-order-value-container">
              <h5 className="manage-order-value">Status</h5>
              {order?.deliveredAt ? (
                <h5 className="manage-order-value">{new Date(order.deliveredAt).toLocaleDateString()}</h5>
                
              ) : (
                <select
                  className="manage-order-select"
                  name="order-status"
                  id="order-status"
                  onChange={(e) =>
                    setOrder({ ...order, status: e.target.value })
                  }
                >
                  <option value="processing">Processing</option>
                  <option value="moved">Moved</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancell</option>
                  <option value="returned">Returned</option>
                  <option value="failed">Failed</option>
                </select>
              )}
            </div>

            <div className="manage-order-value-container">
              <h5 className="manage-order-value">Total Price</h5>
              <h5 className="manage-order-value">
                ${order ? order.total_price : ""}
              </h5>
            </div>

            <div className="manage-order-value-container">
              <h5 className="manage-order-value">Shipping Price</h5>
              <h5 className="manage-order-value">
                {order ? order.shipping_price : ""}
              </h5>
            </div>

            <div className="manage-order-value-container">
              <h5 className="manage-order-value">Payment Method</h5>
              <h5 className="manage-order-value">
                {order ? order.payment_method : ""}
              </h5>
            </div>
          </div>

          <div className="order-items-conatiner">
            {order?.order_items &&
              order.order_items.map((item) => (
                <div className="order-item-value-container" key={item.id}>
                  <h5 className="order-item-value">{item.product_name}</h5>
                  <h5 className="order-item-value">{item.size}</h5>
                  <h5 className="order-item-value">{item.quantity}</h5>
                </div>
              ))}
          </div>

          <div className="manage-order-right-bottom">
            <button type="submit"  className="order-save-button">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManageOrders;
