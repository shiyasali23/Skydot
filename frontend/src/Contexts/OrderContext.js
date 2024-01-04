import React, { createContext, useContext, useEffect, useState } from "react";
import { checkoutContext } from "./CheckoutContext";
import axios from 'axios';

export const orderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { ItemsArray, checkoutObj } = useContext(checkoutContext);
  const order = {
    "owner": "C8YwWP6EnMmwk8iqPb62Ho",
    "taxPrice": 0.00,
    "shippingPrice": checkoutObj?.checkoutInfo?.shippingPrice ?? 0 ,
    "totalPrice": checkoutObj?.checkoutInfo?.shippingPrice ?? 0,
    "payment_method": "UPI",
    "tracking_id": "Ate23",
    "order_items": ItemsArray
  }


  
  const registerOrder = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const response = await axios.post("/api/orders/register/", order, config);
  
      if (response.status === 201) {
        console.error(response.data.message)
      }
    } catch (error) {
       if (error.response.status !== 500 && error.response.status !== 201) {
        console.error(error.response.data.message)
       }
       console.error("Backend not responding", error.message);
    }
  };
  


  return (
    <orderContext.Provider
      value={{
        registerOrder:registerOrder
      }}
    >
      {children}
    </orderContext.Provider>
  );
};




