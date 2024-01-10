import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./CartPage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import BasketCard from "../../Components/BasketCard/BasketCard";
import { cartContext } from "../../Contexts/CartContext";
import { checkoutContext } from "../../Contexts/CheckoutContext";

const CartPage = () => {
  const { cartArray } = useContext(cartContext);
  const { setCheckoutObj } = useContext(checkoutContext);
  const subtotal = cartArray.reduce(
    (accumulator, product) => accumulator + product.total,
    0
  );
  const navigate = useNavigate();

  const handleCheckout = () => {
    const cartInfo = {
      shippingPrice: 40,
      totalPrice: subtotal + 40,
    };

    const checkoutData = {
      checkoutItems: cartArray,
      checkoutInfo: cartInfo,
    };
    setCheckoutObj(checkoutData);

    navigate("/checkout");
  };

  const handleCouponSubmit = (e)=>{
    e.preventDefault();
  }

  return (
    <div className="cart-page">
      <Header />
      <div className="cart-container">
        {cartArray && cartArray.length > 0 ? (
          <>
            <div className="cart-left">
              {cartArray.map((product) =>
                Object.keys(product.userNeeds).map((size) => (
                  <BasketCard
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
                  <form action="" className="cart-coupon-from" id="cart-coupon-form" onSubmit={handleCouponSubmit}>
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      className="cart-coupon-input"
                    />
                    <button type="submit" className="cart-coupon-submit" form="cart-coupon-form">
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
                    <h6 className="cart-info-value">
                      $ {subtotal}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="cart-right-bottom">
                <button
                  className="cart-checkout-button"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        ) : (
          <h5 style={{ color: "#404838",marginLeft:'40px' }}>
            Your Cart Is Empty. Go To <Link to="/store">Store</Link>
          </h5>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
