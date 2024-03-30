import React, { useContext, useEffect } from "react";
import NavBar from "../Components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { ordersContext } from "../Contexts/OrdersContext";

const OrdersPage = () => {
  const { ordersArray, message } = useContext(ordersContext);
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("token");

  const unMovedOrders = ordersArray.filter(order => order.status === 'processing').length;
  
  useEffect(() => {
    if (!storedToken) {
      navigate("/");
    }
  },[]);
  return (
    <div className="orders-page">
      <NavBar />
      {message ? ( 
        <h2 className="error-message">{message}</h2>
      ) : (
        <table className="table">
                    <thead className="table-thead">
            <tr className="table-tr">
              <th className="table-header">Date</th>
              <th className="table-header">Tracking ID</th>
              <th className="table-header">Quantity</th>
              <th className="table-header">Name</th>
              <th className="table-header">City</th>
              <th className="table-header">Delivered</th>
              <th className="table-header">Status</th>
              <th className="table-header">
                <p style={{ fontSize: '15px', color: 'red', margin: "0", padding: '0', width: '40%', height: '100%', textAlign: 'center' }}>{unMovedOrders > 0 ? unMovedOrders : ''}</p>
                <i className="fa-solid fa-truck-fast"> </i>
              </th>
            </tr>
          </thead>
          <tbody className="table-tbody">
            {ordersArray.map((order, index) => (
              <tr className="table-row" key={order.id}>
                <td className="table-value">
                  {new Date(order.created).toISOString().split("T")[0]}
                </td>
                <td className="table-value">{order.tracking_id}</td>
                <td className="table-value">
                  {order.order_products.reduce(
                    (total, product) => total + product.quantity,
                    0
                  )}
                </td>
                <td className="table-value">{order.customer.name}</td>
                <td className="table-value">{order.customer.city}</td>
                <td className="table-value">
                  {order?.deliveredAt ? (
                    new Date(order.deliveredAt).toISOString().split("T")[0]
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
                </td>
                <td className="table-value">{order.status}</td>
                <td className="table-value">
                  <Link
                    to={`/edit-orders/${order.id}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  
  
};

export default OrdersPage;
