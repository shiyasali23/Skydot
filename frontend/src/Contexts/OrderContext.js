import React, { createContext, useContext, useEffect, useState } from "react";
import { checkoutContext } from "./CheckoutContext";
import axios from "axios";

export const orderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { ItemsArray, checkoutObj } = useContext(checkoutContext);

  const registerOrder = async (ownerId, isWhatsapp) => {
    console.log("order", ownerId);
    const order = {
      owner: ownerId,
      tax_price: 0.0,
      shipping_price: checkoutObj?.checkoutInfo?.shippingPrice ?? 0,
      total_price: checkoutObj?.checkoutInfo?.shippingPrice ?? 0,
      isWhatsapp: isWhatsapp,
      payment_method: "UPI",
      tracking_id: "thhffrr3",
      order_items: ItemsArray,
    };
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post("/api/orders/register/", order, config);

      if (response.status === 201) {
        console.error(response.data.message);
      }
    } catch (error) {
      if (error.response.status !== 500 && error.response.status !== 201) {
        console.error(error.response.data.message);
      }
      console.error("Backend not responding", error.message);
    }
  };

  return (
    <orderContext.Provider
      value={{
        registerOrder: registerOrder,
      }}
    >
      {children}
    </orderContext.Provider>
  );
};
