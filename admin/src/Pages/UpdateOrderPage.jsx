import React, { useContext, useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { ordersContext } from "../Contexts/OrdersContext";
import Message from "../Components/Message";

const UpdateOrderPage = () => {
  const { id } = useParams();
  const { ordersArray, updateOrder } = useContext(ordersContext);
  const [message, setMessage] = useState(null);

  const [order, setOrder] = useState(
    ordersArray.find((order) => order.id === id)
  );
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/");
    }
    setOrder(ordersArray.find((order) => order.id === id));
  }, [ordersArray, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success } = await updateOrder(order);

    if (success) {
      navigate("/orders");
    }
  };

  return (
    <div className="manage-order-page">
      <NavBar />
      {message && <Message message={message} setMessage={setMessage} />}

      <form action="" onSubmit={handleSubmit} className="manage-order-form">
        <div className="manage-order-left">
          <div className="manage-order-value-container">
            <h5 className="manage-order-value">Payment Method</h5>
            <h5 className="manage-order-value">
              {order ? order.payment_method : ""}
            </h5>
          </div>

          <div className="manage-order-value-container">
            <h5 className="manage-order-value">Ordered At</h5>
            <h5 className="manage-order-value">
              {new Date(order ? order.created : "").toLocaleDateString()}
            </h5>
          </div>

          <div className="manage-order-value-container">
            <h5 className="manage-order-value">Total Quantity</h5>
            <h5 className="manage-order-value">
              {order?.order_products?.reduce(
                (total, product) => total + product.quantity,
                0
              )}
            </h5>
          </div>

          <div className="manage-order-value-container">
            <h5 className="manage-order-value">Name</h5>
            <h5 className="manage-order-value">{order?.customer?.name}</h5>
          </div>

          <div className="manage-order-value-container">
            <h5 className="manage-order-value">Email</h5>
            <h5 className="manage-order-value">{order?.customer?.email}</h5>
          </div>

          <div className="manage-order-value-container">
            <h5 className="manage-order-value">Phone Number</h5>
            <h5 className="manage-order-value">
              {order?.customer?.phone_number}
            </h5>
          </div>

          <div className="manage-order-value-container">
            <h5 className="manage-order-value">City</h5>
            <h5 className="manage-order-value">{order?.customer?.city}</h5>
          </div>

          <div className="manage-order-value-container">
            <h5 className="manage-order-value">Pincode</h5>
            <h5 className="manage-order-value">{order?.customer?.pincode}</h5>
          </div>

          <div
            style={{ height: "100px" }}
            className="manage-order-value-container"
          >
            <h5 className="manage-order-value">Address</h5>
            <h5 className="manage-order-value">{order?.customer?.address}</h5>
          </div>
        </div>

        <div className="manage-order-right">
          <div className="manage-order-right-top">
            <div className="manage-order-value-container">
              <h5 className="manage-order-value">Note</h5>
              <textarea
                style={{ height: "100px", padding: "10px" }}
                className="manage-order-value"
                onChange={(e) => setOrder({ ...order, note: e.target.value })}
                value={order?.note || ""}
              ></textarea>
            </div>

            <div className="manage-order-value-container">
              <h5 className="manage-order-value">Status</h5>
              {order?.deliveredAt ? (
                <h5 className="manage-order-value">
                  Delivered-{new Date(order.deliveredAt).toLocaleDateString()}
                </h5>
              ) : (
                <select
                  className="manage-order-select"
                  name="order-status"
                  id="order-status"
                  onChange={(e) =>
                    setOrder({ ...order, status: e.target.value })
                  }
                >
                  <option value={order?.status}>{order?.status}</option>
                  <option value="processing">Processing</option>
                  <option value="moved">Moved</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="returned">Returned</option>
                  <option value="failed">Failed</option>
                </select>
              )}
            </div>

            <div className="manage-order-value-container">
              <h5 className="manage-order-value">Total Price</h5>
              <h5 className="manage-order-value">
                &#8377;{order ? order.total_price : ""}
              </h5>
            </div>

            <div className="manage-order-value-container">
              <h5 className="manage-order-value">Shipping Price</h5>
              <h5 className="manage-order-value">
                &#8377;{order ? order.shipping_price : ""}
              </h5>
            </div>
          </div>

          <div className="order-items-conatiner">
            {order?.order_products &&
              order.order_products.map((item) => (
                <div className="order-item-value-container" key={item.id}>
                  <h5 className="order-item-value">{item.product_name}</h5>
                  <h5 className="order-item-value">{item.size}</h5>
                  <h5 className="order-item-value">{item.quantity}</h5>
                </div>
              ))}
          </div>

          <div className="manage-order-right-bottom">
            <button type="submit" className="order-save-button">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateOrderPage;
