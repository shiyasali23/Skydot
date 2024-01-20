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
      </div>

      <div className="orders-container">
        {ordersArray ? (
          ordersArray.map((order, index) => (
            <div className="orders-card" key={index}>
              <h5 className="orders-card-value">
                {new Date(order.created).toISOString().split("T")[0]}
              </h5>
              <h5 className="orders-card-value">{order.tracking_id}</h5>
              <h5 className="orders-card-value">{order.owner_details.name}</h5>
              <h5 className="orders-card-value">{order.owner_details.city}</h5>
              <h5 className="orders-card-value">${order.total_price}</h5>
              <h5 className="orders-card-value">3</h5>
              <h5 className="orders-card-value">
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
              <h5 className="orders-card-value">{order.status}</h5>
              <Link
                style={{
                  textDecoration: "none",
                  height: "40%",
                  width: "90px",
                  display: "flex",
                  justifyContent: "center",
                }}
                to={`/manage-orders/${order.id}`}
              >
                <h5 className="orders-edit-bttn">Took</h5>
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  height: "100%",
                  width: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                to={`/manage-orders/${order.id}`}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>
            </div>
          ))
        ) : (
          <h3
            style={{
              width: "100%",
              height: "100%",
              textAlign: "center",
              margin: "10% 0px",
            }}
          >
            Oops Something Went Wrong...
          </h3>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
