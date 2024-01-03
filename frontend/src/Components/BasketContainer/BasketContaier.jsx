import React, { useState, useContext } from "react";
import "./BasketContaier.css";
import { cartContext } from "../../Contexts/CartContext";

const BasketContainer = ({ id, size }) => {
  const { cartArray, setCartArray } = useContext(cartContext);
  const [quantity, setQuantity] = useState(1);
  const selectedProduct = cartArray.find((item) => item.id === id);
  const availableStocks = selectedProduct[`stock_${size}`];
  const subTotal = selectedProduct.userNeeds[`${size}`] * selectedProduct['price']

  const handleQuantityChange = (event) => {
    const newQuantity = Number(event.target.value);
    setQuantity(newQuantity);
    updateCart(newQuantity)
  };

  const updateCart = (newQuantity) => {
    const index = cartArray.indexOf(selectedProduct);
    const updatedCartArray = [...cartArray];
    updatedCartArray[index].userNeeds[`${size}`] = newQuantity;
    setCartArray(updatedCartArray);
  };

  const deleteBasket = ()=>{
    const index = cartArray.indexOf(selectedProduct);
    const updatedCartArray = [...cartArray];
    delete updatedCartArray[index].userNeeds[size];
    setCartArray(updatedCartArray);
  }
  

  return (
    <div className="basket-container">
      <div className="basket-image">
        <img src={selectedProduct.main_image} alt={selectedProduct.name} />
      </div>
      <div className="basket-name">
        <p>{selectedProduct.name}</p>
      </div>
      <div className="basket-size">
        <p>{size}</p>
      </div>
      <div className="basket-quantity">
        <select onChange={handleQuantityChange} value={quantity}>
          {Array.from({ length: availableStocks }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="basket-subtotal">
        <p>$ {subTotal}</p>
      </div>
      <div className="basket-trash">
        <i className="fa-solid fa-trash deleticon" onClick={deleteBasket}></i>
      </div>
    </div>
  );
};

export default BasketContainer;


