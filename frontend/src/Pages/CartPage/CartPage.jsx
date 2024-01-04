import React, { useContext, useState } from "react";
import "./CartPage.css";
import Footer from "../../Components/Footer/Footer";
import BasketContainer from "../../Components/BasketContainer/BasketContaier";
import { cartContext } from "../../Contexts/CartContext";
import Header from "../../Components/Header/Header";
import { useNavigate } from "react-router-dom";


const CartPage = () => {
  const { cartArray } = useContext(cartContext);
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const shippingFee = selectedShipping === "express" ? 40 : 0;
  const subtotal = cartArray.reduce((accumulator, product) => accumulator + product.total, 0);
  const navigate = useNavigate()

  const handleChekout = () =>{
    navigate('/checkout')
  }

  return (
    <div className="cart">
      <Header/>
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
          <div className="subtotal">
            <h5>Subtotal</h5>
            <p>$ {subtotal}</p>
          </div>

          <div className="shipping">
            <div className="shipping-selector">
              <div>
                <input
                  type="radio"
                  id="standard-shipping"
                  name="shipping"
                  checked={selectedShipping === "standard"}
                  onChange={() => setSelectedShipping("standard")}
                />
                <label htmlFor="standard-shipping">Standard </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="express-shipping"
                  name="shipping"
                  checked={selectedShipping === "express"}
                  onChange={() => setSelectedShipping("express")}
                />
                <label htmlFor="express-shipping">Express </label>
              </div>
            </div>
            <div className="shipping-fee">
              <p>
                {selectedShipping === "standard" ? "Free" : `${shippingFee}`}
              </p>
            </div>
          </div>

          <div className="total">
            <h5>Total</h5>
            <p>$ {subtotal + shippingFee}</p>
          </div>
          <div className="chechkout">
            <button onClick={handleChekout}>Checkout</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;


