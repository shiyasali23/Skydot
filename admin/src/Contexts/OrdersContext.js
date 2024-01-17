import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const ordersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [ordersArray, setOrdersArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchorders = async () => {
      try {
        const response = await axios.get('/api/orders');
        const orders = response.data;     
        setOrdersArray(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchorders();
  }, []);

  const updateOrder = ()=>{
    console.log('hi');
  }


  return (
    <ordersContext.Provider value={{ ordersArray:ordersArray, loading:loading, updateOrder:updateOrder }}>
      {children}
    </ordersContext.Provider>
  );
};
