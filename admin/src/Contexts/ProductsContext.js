import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const productsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productsArray, setProductsArray] = useState([]);
  const [message, setMessage] = useState("");

  const storedToken = localStorage.getItem("token");
  useEffect(() => {
    if (storedToken) {
      fetchProducts(storedToken);
    }
  }, [storedToken]);

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

  const registerProduct = async (product, productImages) => {
    setMessage(null);
    try {
      const storedToken = localStorage.getItem("token");
      const createProductResponse = await axios.post("/api/adminpanel/product/create/", product, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-type": "application/json",
        },
      });
  
      if (createProductResponse.status === 201) {
        const product_id = createProductResponse.data;
        const uploadImagesResponse = await axios.post(
          `/api/adminpanel/product/images/create/${product_id}/`,
          productImages,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        setProductsArray((prevArray) => [...prevArray, uploadImagesResponse.data]);
        return { registrationStatus: true }; // Registration successful

      }
    } catch (error) {
      handleErrors(error);
      return { registrationStatus: false };
    }
  };
  
  const handleErrors = (error) => {
    if (error.response.status === 401) {
      setMessage("Authentication error: Please login again.");
      localStorage.removeItem("token");
    } else if (error.response.status === 500) {
      setMessage("Internal server error");
    } else {
      setMessage("An unknown error occurred");
    }
  };
  



  const updateProduct = async (product) => {
    setMessage(null);
    try {
      const storedToken = localStorage.getItem("token");
      const response = await axios.put(
        `/api/adminpanel/product/update/${product.id}/`,
        product,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
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

  const deleteProduct = async (id) => {
    setMessage(null);
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
      console.log("Error object:", error);
      if (error.response && error.response.status === 401) {
        setMessage("Authentication error: Please login again.");
        localStorage.removeItem("token");
      } else if (error.response && error.response.status === 500) {
        setMessage("Internal server error");
      } else if (error.response && error.response.status === 404) {
        setMessage("Product not found. Something went wrong");
      } else {
        setMessage("An unknown error occurred");
      }
      return { deleteStatus: false };
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
        deleteProduct,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};
