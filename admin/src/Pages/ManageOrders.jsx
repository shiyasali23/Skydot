import React from "react";
import NavBar from "../Components/NavBar";

const ManageOrders = () => {
  return (
    <div className="manage-orders-page">
      <NavBar />

      <form action="" className="manage-orders-form">
        <div className="manage-order-left">
          <h5 className="manage-orders-value">98765432</h5>

          <h5 className="manage-orders-value">23-03-2024</h5>
          <h5 className="manage-orders-value">Shiyas.23@gmail.com</h5>
          <h5 className="manage-orders-value">8943424121</h5>
          <h5 className="manage-orders-value">Kozhikode</h5>
          <h5 className="manage-orders-value">673307</h5>
          <h5 className="manage-orders-value">
            Kunnummal House Post Moodadi koyilandi kozhikode
          </h5>
        </div>

        <div className="manage-order-right">
          <div className="manage-orders-right-top">
            <select name="order-status" id="order-status" style={{width:'40%',marginLeft:'140px',height:'15%'}}>
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
