import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const productsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productsArray, setProductsArray] = useState([]);
  const [message, setMessage] = useState("");


  useEffect(()=>{
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetchProducts(storedToken)
    }
  },[])


  const fetchProducts = async (token) => {
    setMessage(null);
    try {
      const response = await axios.get("/api/adminpanel/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const products = response.data;
      setProductsArray(products);
    } catch (error) {
      if (error.response.status === 401) {
        setMessage("Authentication error Please login again.");
      } else if (error.response.status === 500) {
        setMessage("Internal server error");
      } else {
        setMessage("An unknown error occurred");
      }
    }
  };

  const updateProduct = async (product) => {
    setMessage(null);
    try {
      const storedToken = localStorage.getItem("token");
      const response = await axios.post("/api/adminpanel/products", product, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      const products = response.data;
      setProductsArray(products);
    } catch (error) {
      if (error.response.status === 401) {
        setMessage("Authentication error: Please login again.");
      } else if (error.response.status === 500) {
        setMessage("Internal server error");
      } else {
        setMessage("An unknown error occurred");
      }
    }
  };

  const registerProduct = async (product) => {
    setMessage(null);
    try {
      const storedToken = localStorage.getItem("token");
      const response = await axios.post(
        "/api/adminpanel/product/create",
        product,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const products = response.data;
      setProductsArray(products);
      setMessage("Product registration successful");
    } catch (error) {
      if (error.response.status === 401) {
        setMessage("Authentication error: Please login again.");
      } else if (error.response.status === 500) {
        setMessage("Internal server error");
      } else {
        setMessage("An unknown error occurred");
      }
    }
  };

  return (
    <productsContext.Provider
      value={{
        productsArray,
        message,

        setMessage,
        updateProduct,
        fetchProducts,
        registerProduct,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};
