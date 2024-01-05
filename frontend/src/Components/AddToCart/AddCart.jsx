import React, { useContext, useState } from "react";
import "./AddCart.css";
import { productsContext } from "../../Contexts/ProductsContext";
import { cartContext } from "../../Contexts/CartContext";

const AddCart = ({ id }) => {
  const { productsArray } = useContext(productsContext);
  const { cartArray, setCartArray } = useContext(cartContext);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [display, setDisplay] = useState('hidden')

  const selectedProduct = productsArray.find((product) => product.id === id);
  const updatedProduct = cartArray.find((product) => product.id === id) || {
    ...selectedProduct,
  };


  const stocksObj = {
    XS: selectedProduct.stock_XS,
    S: selectedProduct.stock_S,
    M: selectedProduct.stock_M,
    L: selectedProduct.stock_L,
    XL: selectedProduct.stock_XL,
  };


  const handleSizeClick = (size) => {
    const isSelected = selectedSizes.includes(size);
    if (isSelected) {
      setSelectedSizes(selectedSizes.filter((selected) => selected !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const addToCart = () => {
    updatedProduct["userNeeds"] = updatedProduct["userNeeds"] || {};

    selectedSizes.forEach((size) => {
      updatedProduct["userNeeds"][size] =
        updatedProduct["userNeeds"][size] || {};
      updatedProduct["userNeeds"][size] = 1;
    });

    updateCart(updatedProduct);
    setSelectedSizes([]);
  };

  const onBagClick = () => {
    setDisplay((prevDisplay) => (prevDisplay === 'hidden' ? 'visible' : 'hidden'));
  };
  
  const updateCart = (updatedProduct) => {
    setCartArray((prevCart) => {
      const index = prevCart.findIndex(
        (product) => product.id === updatedProduct.id
      );
      const newCart = [...prevCart];

      if (index !== -1) {
        newCart[index] = updatedProduct;
      } else {
        newCart.push(updatedProduct);
      }

      return newCart;
    });
  };

  return (
    <div className="addcart-wraper">
      <div className="sizes-container">
        {Object.keys(stocksObj).map(
          (size) =>
            stocksObj[size] > 0 && (
              <button
                key={size}
                className="addcart-size-button"
                onClick={() => handleSizeClick(size)}
                style={{
                  background: selectedSizes.includes(size)
                    ? "black"
                    : "transparent",
                  color: selectedSizes.includes(size) ? "white" : "black",
                  visibility: display 
                }}
              >
                {size}
              </button>
            )
        )}
      </div>

      <div className="bag-container">
        <i
          className="fa-solid fa-bag-shopping"
          onClick={() => {
            selectedSizes.length > 0 && addToCart();
            onBagClick();
          }}
        ></i>
      </div>
    </div>
  );
};

export default AddCart;
