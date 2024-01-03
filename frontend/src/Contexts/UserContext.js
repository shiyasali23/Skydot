import axios from "axios";
import React, { createContext, useState } from "react";


export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [signMessage, setSignMessage] = useState(null);
  const [signStatus, setSignStatus] = useState(false)
  
  const [loginMessage, setLoginMessage] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);

    
  const signUpUser = async (name, email, password) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const response = await axios.post(
        "/api/users/register/",
        { name: name, email: email, password: password },
        config
      );
      if (response.status === 201) {
        console.info(response.data.message, response.data.status);
        setSignMessage("User signup success");
        setSignStatus(true);
        loginUser(email, password);
      }
    } catch (error) {
      if (error.response.status === 400) {
        console.info(error.message);
        setSignMessage("Email already registered");
      } else if (error.response.status === 500) {
        console.info(error.message);
        setSignMessage("Internal server error");
      } else {
        console.info(error.message);
        setSignMessage("Something went wrong");
      }
    }
  };

  const loginUser = async (email, password) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "/api/users/login/",
        { email: email, password: password },
        config
      );

      setUser(response.data);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      setLoginMessage("Login Sucess");
      setLoginStatus(true)
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        setLoginMessage("Username or Password is incorrect");
        console.error("Authentication failed:", error.message);
      } else {
        setLoginMessage("Something went wrong. Please try again later.");
        console.error("Error:", error.message);
      }
    } 
   
  };

  const logOutUser = ()=>{
    localStorage.removeItem("userInfo");
    setLoginStatus(false)
  }

  

  return (
    <userContext.Provider
      value={{
        loginUser: loginUser,
        loginMessage: loginMessage,
        loginStatus:loginStatus,
        signUpUser:signUpUser,
        signMessage:signMessage,
        signStatus:signStatus,
        logOutUser:logOutUser
      }}
    >
      {children}
    </userContext.Provider>
  );
};
