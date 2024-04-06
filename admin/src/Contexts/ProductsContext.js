import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const productsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productsArray, setProductsArray] = useState([]);
  const [message, setMessage] = useState("");
  const [serverSatus, setserverSatus] = useState(null)
  const [loading, setLoading] = useState(null)

  const storedToken = localStorage.getItem("token");
  useEffect(() => {
    if (storedToken) {
      fetchProducts(storedToken);
    }
  }, [storedToken]);

  const fetchProducts = async (token) => {
    setserverSatus(null)
    try {
      const response = await axios.get("/api/adminpanel/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const products = response.data;
      setProductsArray(products);
    } catch (error) {
      setserverSatus("Server not responding.Please Reaload Again")
    }
  };

  const registerProduct = async (productData) => {
    setMessage(null);
    setLoading(true)
    try {
      const storedToken = localStorage.getItem("token");
      const response = await axios.post(
        "/api/adminpanel/product/create/",
        productData,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newProduct = response.data;
      setProductsArray((prevArray) => [...prevArray, newProduct]);
      return { success: true };
    } catch (error) {
      handleErrors(error);
      return { success: false };
    }finally{
      setLoading(null)
    }
  };

  const updateProduct = async (productData) => {
    setLoading(true)
    setMessage(null);
    try {
      const storedToken = localStorage.getItem("token");
      const response = await axios.put(
        `/api/adminpanel/product/update/${productData.id}/`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedProduct = response.data;
      setProductsArray((prevArray) => {
        return prevArray.map((product) => {
          if (product.id === updatedProduct.id) {
            return updatedProduct;
          } else {
            return product;
          }
        });
      });
      return { success: true };
    } catch (error) {
      handleErrors(error);
      return { success: false };
    }finally{
      setLoading(null)
    }
  };

  const deleteProduct = async (id) => {
    setMessage(null);
    setLoading(true)
    try {
      const storedToken = localStorage.getItem("token");
      const response = await axios.delete(
        `/api/adminpanel/product/delete/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      if (response.status === 204) {
        const dummyProductsArray = productsArray.filter(
          (product) => product.id !== id
        );
        setProductsArray(dummyProductsArray);
        return { deleteStatus: true };
      }
    } catch (error) {
      handleErrors(error);
      return { deleteStatus: false };
    }finally{
      setLoading(null)
    }
  };

  const handleErrors = (error) => {
    if (error.response && error.response.status === 401) {
      setMessage("Authentication error: Please login again.");
      localStorage.removeItem("token");
    } else if (error.response && error.response.status === 500) {
      setMessage("Internal server error");
    } else if (error.response && error.response.status === 404) {
      setMessage("Product not found. Something went wrong");
    } else if (error.response && error.response.status === 400) {
      setMessage("Bad request. Please check your input data.");
    } else if (error.response && error.response.status === 403) {
      setMessage(
        "Forbidden. You don't have permission to access this resource."
      );
    } else if (error.response && error.response.status === 409) {
      setMessage(
        "Conflict. This action conflicts with the current state of the server."
      );
    } else {
      setMessage("An unknown error occurred");
    }
  };
  return (
    <productsContext.Provider
      value={{
        productsArray,
        message,
        serverSatus,
        loading,

        setMessage,
        updateProduct,
        fetchProducts,
        registerProduct,
        deleteProduct,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};
