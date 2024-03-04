import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const adminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loginAdmin = async () => {
      try {
        const response = await axios.get('/api/adminpanel/login');
        const data = response.data;     
        setOrdersArray(data['access']);
      } catch (error) {
        console.error('Login Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchorders();
  }, []);
  return (
    <adminContext.Provider value={{ loginAdmin:loginAdmin, loading:loading,  }}>
      {children}
    </adminContext.Provider>
  );
};
