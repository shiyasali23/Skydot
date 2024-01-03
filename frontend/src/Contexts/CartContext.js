import React, { useState, createContext } from 'react';

export const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartArray, setCartArray] = useState([]);

  const filteredCartArray = cartArray.filter((product) => {
    return Object.keys(product.userNeeds).length > 0;
  });

  const updatedCartArray = filteredCartArray.map((product) => {
    const totalprice = Object.values(product.userNeeds).reduce((accumulator, quantity) => accumulator + quantity, 0) * product.price;
    return { ...product, total: totalprice }; 
  });

  return (
    <cartContext.Provider value={{ cartArray: updatedCartArray, setCartArray }}>
      {children}
    </cartContext.Provider>
  );
};
