import React, { useState, createContext, useEffect } from "react";

export const checkoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [checkoutObj, setCheckoutObj] = useState({}); 
  const checkoutItems = checkoutObj?.checkoutItems ?? [];
  const ItemsArray = [];
 

checkoutItems.forEach((cartItem) => {
  const { id, userNeeds } = cartItem;

  Object.entries(userNeeds).forEach(([size, quantity]) => {
    ItemsArray.push({
      product: id,
      size: size,
      quantity: quantity,
    });
  });
});



  return (
    <checkoutContext.Provider
      value={{
        checkoutObj: checkoutObj,
        setCheckoutObj: setCheckoutObj,
        ItemsArray:ItemsArray,
      }}
    >
      {children}
    </checkoutContext.Provider>
  );
};



// const cartArray = [
//     {
//         id:"ez9zbRyQrFngX8bHbybtno",
//         name:"Cream casual pants",
//         price:900,
//         created:"2024-01-03T16:43:36.056001Z",
//         userNeeds:{
//             X:1,
//             M:2
//         }
//     },
//     {
//         id:"jgLRviZnZMzKbTDgvzZaVA",
//         name:"Grey formal pants",
//         price:800,
//         created:"2024-01-03T16:43:36.056001Z",
//         userNeeds:{
//             L:3,
//             XL:1,
//             S:4
//         }
//     },
// ]

// const ItemsArray = [
//     {
//         id : ez9zbRyQrFngX8bHbybtno,
//         size : "x",
//         quantity : 1
//     },
//     {
//         id : ez9zbRyQrFngX8bHbybtno,
//         size : "M",
//         quantity : 2
//     },
//     {
//         id : jgLRviZnZMzKbTDgvzZaVA,
//         size : "L",
//         quantity : 3
//     },
//     {
//         id : jgLRviZnZMzKbTDgvzZaVA,
//         size : "XL",
//         quantity : 1
//     },
//     {
//         id : jgLRviZnZMzKbTDgvzZaVA,
//         size : "S",
//         quantity : L
//     },
// ]
