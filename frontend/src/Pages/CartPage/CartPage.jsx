import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CartPage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import BasketContainer from "../../Components/BasketContainer/BasketContaier";
import { cartContext } from "../../Contexts/CartContext";
import { checkoutContext } from "../../Contexts/CheckoutContext";

const CartPage = () => {
  const { cartArray } = useContext(cartContext);
  const { setCheckoutObj } = useContext(checkoutContext);
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const shippingFee = selectedShipping === "express" ? 40 : 0;
  const subtotal = cartArray.reduce(
    (accumulator, product) => accumulator + product.total,
    0
  );
  const navigate = useNavigate();

  const handleChekout = () => {
    const cartInfo = {
      shippingPrice: shippingFee,
      totalPrice: subtotal + shippingFee,
    };

    const checkoutData = {
      checkoutItems: cartArray,
      checkoutInfo: cartInfo,
    };
    setCheckoutObj(checkoutData);

    navigate("/checkout");
  };
  return (
    <div className="cart-page">
      <Header />
      <div className="cart-container">
        <div className="cart-left">
          {cartArray.map((product) =>
            Object.keys(product.userNeeds).map((size) => (
              <BasketContainer
                key={`${product.id}_${size}`}
                id={product.id}
                size={size}
              />
            ))
          )}
        </div>

        <div className="cart-right">
          <div className="cart-right-top">
            <div className="cart-details">
              <form action="" className="cart-info cart-coupon-from">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="cart-coupon-input"
                />
                <button type="submit" className="cart-coupon-submit">
                  Apply
                </button>
              </form>

              <div className="cart-info">
                <h5 className="cart-info-head">Subtotal</h5>
                <h6 className="cart-info-value">$ {subtotal}</h6>
              </div>

              <div className="cart-info">
                <h5 className="cart-info-head">Coupon Discount</h5>
                <h6 className="cart-info-value"> - $ 0 </h6>
              </div>

              <div className="cart-info">
                <h5 className="cart-info-head">Taxprice</h5>
                <h6 className="cart-info-value">18% GST Included </h6>
              </div>

              <div className="cart-info">
                <h5 className="cart-info-head">Total Price</h5>
                <h6 className="cart-info-value">$ {subtotal + shippingFee}</h6>
              </div>
           
            </div>
          </div>
          <div className="cart-right-bottom">
            <button className="cart-checkout-button" onClick={handleChekout}>
              Checkout
            </button>
          </div>
        
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
