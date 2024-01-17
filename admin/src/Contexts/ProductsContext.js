import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const productsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productsArray, setProductsArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        const products = response.data;     
        setProductsArray(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const updateProduct = async (editedProduct ) => {
    console.log('up',editedProduct);
  };


  return (
    <productsContext.Provider value={{ productsArray:productsArray, loading:loading, updateProduct:updateProduct }}>
      {children}
    </productsContext.Provider>
  );
};
