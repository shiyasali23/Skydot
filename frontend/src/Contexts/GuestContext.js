import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { orderContext } from "./OrderContext";

export const guestContext = createContext();

export const GuestProvider = ({ children }) => {
    const { registerOrder } = useContext(orderContext)
  const [guest, setGuest] = useState(null);

  const registerGuest = async (
    name,
    email,
    phonenumber,
    city,
    pincode,
    address,
    isWhatsapp
  ) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const response = await axios.post(
        "/api/guests/register/",
        {
          name: name,
          email: email,
          phone_number: phonenumber,
          city: city,
          pincode: pincode,
          address: address,
        },
        config
      );
  
      if (response.status === 201) {
        const ownerId = response.data.data.id
        registerOrder(ownerId, isWhatsapp);
        console.info(response.data.message, response.data.status);
      }
    } catch (error) {
      if (error.response.status !== 500 && error.response.status !== 201) {
        console.error(error.response.data.message);
      }
      console.error("Backend not responding", error.message);
    }
  };

  return (
    <guestContext.Provider
      value={{
        registerGuest: registerGuest,
      }}
    >
      {children}
    </guestContext.Provider>
  );
};
