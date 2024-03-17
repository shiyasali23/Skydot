import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const productsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productsArray, setProductsArray] = useState([]);
  const [message, setMessage] = useState("");

  
  
  const fetchProducts = async () => {
    try {
      const storedToken = localStorage.getItem('token')
      const response = await axios.get('/api/adminpanel/products', {
        headers: {
          Authorization: `Bearer ${storedToken}` 
        }
      });
      const products = response.data;     
      setProductsArray(products);
    } catch (error) {
      if (error.response.status === 401) {
        setMessage("Authentication error: Please login again.");
        console.error('Authentication error', error);
      } else if (error.response.status === 500) {
        setMessage("Internal server error");
        console.error('Internal server error', error);
      } else {
        setMessage("An unknown error occurred");
        console.error('Error', error);
      }
    } 
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  
  const updateProduct = async (product) => {
    console.log(product);
    try {
      const storedToken = localStorage.getItem('token');
      const response = await axios.post('/api/adminpanel/products', product, {
        headers: {
          Authorization: `Bearer ${storedToken}` 
        }
      });
      const products = response.data;     
      setProductsArray(products);
    } catch (error) {
      if (error.response.status === 401) {
        setMessage("Authentication error: Please login again.");
        console.error('Authentication error', error);
      } else if (error.response.status === 500) {
        setMessage("Internal server error");
        console.error('Internal server error', error);
      } else {
        setMessage("An unknown error occurred");
        console.error('Error', error);
      }
    }
  };
  
  const registerProduct = async (product) => {
    console.log(product);
    try {
      const storedToken = localStorage.getItem('token');
      const response = await axios.post('/api/adminpanel/product/create', product, {
        headers: {
          Authorization: `Bearer ${storedToken}` 
        }
      });
      const products = response.data;     
      setProductsArray(products);
    } catch (error) {
      if (error.response.status === 401) {
        setMessage("Authentication error: Please login again.");
        console.error('Authentication error', error);
      } else if (error.response.status === 500) {
        setMessage("Internal server error");
        console.error('Internal server error', error);
      } else {
        setMessage("An unknown error occurred");
        console.error('Error', error);
      }
    }
  };

 
  

  return (
    <productsContext.Provider value={{ productsArray, message, updateProduct,fetchProducts,registerProduct  }}>
      {children}
    </productsContext.Provider>
  );
};
