import React, { useState, createContext, useEffect, useContext } from "react";
import { productsContext } from "./ProductsContext";
import { ordersContext } from "./OrdersContext";

export const analyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  const { productsArray, serverSatus } = useContext(productsContext);
  const { ordersArray } = useContext(ordersContext);

  const getProductsData = () => {
    let productsSalesData = null;
    let productsRatingData = null;
  
    if (productsArray) {
      productsArray.sort((a, b) => b.total_sold - a.total_sold);
      const top10Sales = productsArray.slice(0, 10); 
      const salesLabels = top10Sales.map((product) => product.name);
      const total_sold = top10Sales.map((product) => product.total_sold);
      productsSalesData = { labels: salesLabels, values: total_sold };
  
      productsArray.sort((a, b) => b.vote - a.vote);
      const top10Rating = productsArray.slice(0, 10); 
      const ratingLabels = top10Rating.map((product) => product.name);
      const total_rating = top10Rating.map((product) => product.vote);
      productsRatingData = { labels: ratingLabels, values: total_rating };
    }
  
    return { productsSalesData, productsRatingData };
  };
  
  
  
  const getMonthlyData = () => {
    const currentYear = new Date().getFullYear();
    let monthlyData = [
      {
        month: "April",
        date: "04",
        sales_count: 0,
        total_billing: 0,
      },
      {
        month: "May",
        date: "05",
        sales_count: 0,
        total_billing: 0,
      },
      {
        month: "June",
        date: "06",
        sales_count: 0,
        total_billing: 0,
      },
      {
        month: "July",
        date: "07",
        sales_count: 0,
        total_billing: 0,
      },
      {
        month: "August",
        date: "08",
        sales_count: 0,
        total_billing: 0,
      },
      {
        month: "September",
        date: "09",
        sales_count: 0,
        total_billing: 0,
      },
      {
        month: "October",
        date: "10",
        sales_count: 0,
        total_billing: 0,
      },
      {
        month: "November",
        date: "11",
        sales_count: 0,
        total_billing: 0,
      },
      {
        month: "December",
        date: "12",
        sales_count: 0,
        total_billing: 0,
      },
      {
        month: "January",
        date: "01",
        sales_count: 0,
        total_billing: 0,
      },
      {
        month: "February",
        date: "02",
        sales_count: 0,
        total_billing: 0,
      },
      {
        month: "March",
        date: "03",
        sales_count: 0,
        total_billing: 0,
      },
    ];
    if (ordersArray) {
      ordersArray.forEach((order) => {
        const orderYear = new Date(order.created).getFullYear();
        const orderMonth = String(
          new Date(order.created).getMonth() + 1
        ).padStart(2, "0");

        if (orderYear === currentYear) {
          const index = monthlyData.findIndex(
            (monthData) => monthData.date === orderMonth
          );
          if (index !== -1) {
            monthlyData[index].sales_count += 1;
            monthlyData[index].total_billing += parseFloat(order.total_price); // Convert to float if necessary
          }
        }
      });

      return { monthlyData };
    } else {
      return null;
    }
  };

  return (
    <analyticsContext.Provider
      value={{serverSatus, getMonthlyData, getProductsData }}
    >
      {children}
    </analyticsContext.Provider>
  );
};
