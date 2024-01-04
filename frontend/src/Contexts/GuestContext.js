import axios from "axios";
import React, { createContext, useState } from "react";


export const GuestContext = createContext();

export const GuestProvider = ({ children }) => {
  const [guest, setGuest] = useState(null);



    
  const RegisterGuest = async (name, email, password) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const response = await axios.post(
        "/api/Guests/register/",
        { name: name, email: email, password: password },
        config
      );
      if (response.status === 201) {
        console.info(response.data.message, response.data.status);
      }
    } catch (error) {
      if (error.response.status === 400) {
        console.info(error.message);
      } 
    }
  };


  return (
    <GuestContext.Provider
      value={{
        RegisterGuest: RegisterGuest,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
};
