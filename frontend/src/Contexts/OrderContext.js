import React, { createContext, useContext, useEffect, useState } from "react";
import { checkoutContext } from "./CheckoutContext";
import axios from "axios";

export const orderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { ItemsArray, checkoutObj } = useContext(checkoutContext);
  const [ orderInfo, setOrderInfo ] = useState({
    message: "",  
    data: null,
  })

  const registerOrder = async (ownerId, isWhatsapp) => {
    console.log("order", ownerId);
    const order = {
      owner: ownerId,
      tax_price: 0.0,
      shipping_price: checkoutObj?.checkoutInfo?.shippingPrice ?? 0,
      total_price: checkoutObj?.checkoutInfo?.shippingPrice ?? 0,
      isWhatsapp: isWhatsapp,
      payment_method: "UPI",
      tracking_id: "tdr3",
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
        setOrderInfo({
          message: response.data.message,
          data: response.data.data,
        });
        console.error(response.data.message);
      }
    } catch (error) {
      if (error.response.status !== 500 && error.response.status !== 201) {
        setOrderInfo({
          message: error.response.data.message,
          data: null, 
        });
        console.error(error.response.data.message);

      }
      setOrderInfo({
        message: "Backend not responding",
        data: null, 
      });
      console.error("Backend not responding", error.message);
    }
  };

  return (
    <orderContext.Provider
      value={{
        registerOrder: registerOrder,
        orderInfo:orderInfo
      }}
    >
      {children}
    </orderContext.Provider>
  );
};
