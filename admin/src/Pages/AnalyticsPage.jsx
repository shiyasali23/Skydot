import React, { useContext, useEffect, useState } from "react";
import ReactGA from "react-ga";

import NavBar from "../Components/NavBar";
import BarGraph from "../Components/BarGraph";
import LineGraph from "../Components/LineGraph";
import { analyticsContext } from "../Contexts/AnalyticsContext";
import { useNavigate } from "react-router-dom";

const AnalyticsPage = () => {
  const { getProductsData, getMonthlyData } = useContext(analyticsContext);
  const [productsSales, setProductsSales] = useState(null);
  const [productsRatings, setProductsRatings] = useState(null);
  const [monthlySales, setMonthlySales] = useState(null);
  const [monthlybilling, setMonthlyBilling] = useState(null);
  const navigate = useNavigate()
  

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/");
    }
    ReactGA.pageview(window.location.pathname + window.location.search);

    const { productsSalesData, productsRatingData } = getProductsData();
    setProductsSales(productsSalesData ? productsSalesData : null);
    setProductsRatings(productsRatingData ? productsRatingData : null);

    const { monthlyData } = getMonthlyData();
    if (monthlyData) {
      const labels = monthlyData.map((data) => data.month);
      const total_sales = monthlyData.map((data) => data.sales_count);
      const total_billing = monthlyData.map((data) => data.total_billing);
      setMonthlySales({ labels, values: total_sales });
      setMonthlyBilling({ labels, values: total_billing });
    }
  }, [getProductsData, getMonthlyData]);
  console.log(productsRatings, productsSales);
  return (
    <div className="analytics-page">
      <NavBar />
      <div className="analytics-wrapper">
        <div className="analytics-wrapper-section">
          <div className="analytics-container">
            {productsSales && (
              <BarGraph
                data={productsSales}
                heading={"Total sold"}
                canvasID={1}
                backgroundColor={'rgba(75, 192, 192, 0.2)'}
                borderColor = {'rgba(75, 192, 192, 1)'}
                indexAxis={'x'}
                
              />
            )}
          </div>
          <div className="analytics-container">
            {productsRatings && (
              <BarGraph
                data={productsRatings}
                heading={"Products Rating"}
                canvasID={2}
                backgroundColor={'rgba(0, 128, 0, 0.2)'}
                borderColor = {'rgba(0, 128, 0, 1)'}
                indexAxis={'y'}
              />
            )}
          </div>
        </div>
        <div className="analytics-wrapper-section">
          <div className="analytics-container">
            {monthlybilling && (
              <LineGraph
                data={monthlybilling}
                heading={"Monthly Billing"}
                canvasId={1}
                borderColor={'rgba(255, 220, 0, 1)'}
              />
            )}
          </div>
          <div className="analytics-container">
            {monthlySales && (
              <LineGraph
                data={monthlySales}
                heading={"Monthly Sales"}
                canvasId={2}
                borderColor={'rgba(192, 75, 192, 1)'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
