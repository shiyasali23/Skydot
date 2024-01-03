import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const productsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productsArray, setProductsArray] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        const updatedProducts = response.data;
    
        const productsWithUserNeeds = updatedProducts.map(product => ({
          ...product,    
     
          total: product.price
        }));
    
        setProductsArray(productsWithUserNeeds);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    

    fetchProducts();
  }, []); 

  return (
    <productsContext.Provider value={{ productsArray }}>
      {children}
    </productsContext.Provider>
  );
};