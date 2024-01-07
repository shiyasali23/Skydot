import React, { useContext, useEffect, useState } from "react";
import "./CheckoutPage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { guestContext } from "../../Contexts/GuestContext";
import { orderContext } from "../../Contexts/OrderContext";
import { checkoutContext } from "../../Contexts/CheckoutContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { registerGuest } = useContext(guestContext);
  const { orderInfo } = useContext(orderContext);
  const {ItemsArray, checkoutObj} = useContext(checkoutContext)
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const totalPrice = checkoutObj?.checkoutInfo?.totalPrice || 0;
  const checkoutLength = checkoutObj?.checkoutItems?.length
  const navigate = useNavigate() 
  
  useEffect(()=>{
    if (!checkoutLength) {
      navigate('/cart')
    }
  },[checkoutLength,navigate])

  const handleSubmit = () => {
    registerGuest(name, email, phonenumber, city, pincode, address, isWhatsapp);
  };

  return (
    <div className="checkout-page">
      <Header />

      <div className="checkout-page-container">
        <div className="checkout-left">
          <div className="checkout-alert-container">
            <p
              className="cac-message"
              style={{
                display: orderInfo && orderInfo.message ? "flex" : "none",
              }}
            >
              {orderInfo.message}
            </p>
          </div>

          <form className="checkout-form">
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="checkout-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              className="checkout-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              name="phonenumber"
              type="number"
              placeholder="Phone number"
              className="checkout-input"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />

            <input
              name="city"
              type="text"
              placeholder="City"
              className="checkout-input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input
              name="pincode"
              type="number"
              placeholder="Pincode"
              className="checkout-input"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />

            <input
              name="address"
              type="text"
              placeholder="Address"
              className="checkout-input checkout-input-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="checkout-input-whatsapp">
              <h5 className="checkout-details-head">Get updates on WhatsApp</h5>
              <input
                name="whatsappUpdates"
                type="checkbox"
                checked={isWhatsapp}
                onChange={() => setIsWhatsapp(!isWhatsapp)}
              />
            </div>
          </form>
        </div>

        <div className="checkout-right">
          <div className="checkout-right-top">
            <div className="checkout-info">
            <form action="" className="checkout-coupon-form">
              <input
                type="text"
                placeholder="Coupon Code"
                className="checkout-coupon-input"
              />
              <button type="submit" className="checkout-coupon-submit">
                Apply
              </button>
            </form>

            <div className="checkout-products">
              
              {ItemsArray.map((item, i)=>(
                <div key={i} className="checkout-product-info">
                <h5 key={`${i}${item.name}`} className="product-info-value">{item.name}</h5>
                <h6 key={`${i}${item.size}`}  className="product-info-value">{item.size}</h6>
                <h6 key={`${i}${item.quantity}`} className="product-info-value">{item.quantity}</h6>
              </div>
              ))}
            
            </div>

            <div className="checkout-details">
              <h5 className="checkout-details-head">Coupon Discount</h5>
              <h6 className="checkout-details-value">- $0</h6>
            </div>

            <div className="checkout-details">
              <h5 className="checkout-details-head">Shipping price</h5>
              <h6 className="checkout-details-value">$0</h6>
            </div>
            <div className="checkout-details">
              <h5 className="checkout-details-head">Total Price</h5>
              <h6 className="checkout-details-value">${totalPrice}</h6>
            </div>
            </div>
          </div>
          <div className="checkout-right-bottom">
            <button
              type="submit"
              className="checkout-buy-button"
              onClick={handleSubmit}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
