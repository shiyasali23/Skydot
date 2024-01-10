import React, { useState, useContext } from "react";
import "./BasketCard.css";
import { cartContext } from "../../Contexts/CartContext";

const BasketContainer = ({ id, size }) => {
  const { cartArray, setCartArray } = useContext(cartContext);
  const [quantity, setQuantity] = useState(1);
  const selectedProduct = cartArray.find((item) => item.id === id);
  const availableStocks = selectedProduct[`stock_${size}`];
  const subTotal =
    selectedProduct.userNeeds[`${size}`] * selectedProduct["price"];

  const handleQuantityChange = (event) => {
    const newQuantity = Number(event.target.value);
    setQuantity(newQuantity);
    updateCart(newQuantity);
  };

  const updateCart = (newQuantity) => {
    const index = cartArray.indexOf(selectedProduct);
    const updatedCartArray = [...cartArray];
    updatedCartArray[index].userNeeds[`${size}`] = newQuantity;
    setCartArray(updatedCartArray);
  };

  const deleteBasket = () => {
    const index = cartArray.indexOf(selectedProduct);
    const updatedCartArray = [...cartArray];
    delete updatedCartArray[index].userNeeds[size];
    setCartArray(updatedCartArray);
  };

  return (
    <div className="basket-container">
      <div className="basket-left">
        <div className="basket-image">
          <img src={selectedProduct.main_image} alt={selectedProduct.name} />
        </div>
        <p className="basket-name">{selectedProduct.name}</p>
      </div>

      <div className="basket-right">
        <p className="basket-size">{size}</p>

        <select
          className="basket-qnt"
          onChange={handleQuantityChange}
          value={quantity}
        >
          {Array.from({ length: availableStocks }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>

        <p className="basket-subtotal">$ {subTotal}</p>

        <i
          className="fa-solid fa-trash basket-delete"
          onClick={deleteBasket}
        ></i>
      </div>
    </div>
  );
};

export default BasketContainer;
