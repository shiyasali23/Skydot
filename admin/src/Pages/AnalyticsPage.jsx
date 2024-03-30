import React, { useContext, useEffect, useState } from "react";
import ReactGA from "react-ga";

import NavBar from "../Components/NavBar";
import BarGraph from "../Components/BarGraph";
import LineGraph from "../Components/LineGraph";
import { analyticsContext } from "../Contexts/AnalyticsContext";

const AnalyticsPage = () => {
  const { getProductsSalesCount,getMonthlyData } = useContext(analyticsContext);
  const [productsSalesCount, setProductsSalesCount] = useState(null);
  const [monthlySales, setMonthlySales] = useState(null);
  const [monthlybilling, setMonthlyBilling] = useState(null);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);

    const { labels: productLabels, values: productValues } =
      getProductsSalesCount();
    if (productLabels && productValues) {
      setProductsSalesCount({ labels: productLabels, values: productValues });
    }

    const {monthlyData} = getMonthlyData()
    if (monthlyData) {
      const labels = monthlyData.map((data)=> data.month)
      const total_sales = monthlyData.map((data)=>data.sales_count)
      const total_billing = monthlyData.map((data)=>data.total_billing)
      setMonthlySales({labels, values:total_sales})
      setMonthlyBilling({labels,values:total_billing})
    }
  }, []);

  return (
    <div className="analytics-page">
      <NavBar />
      <div className="analytics-wrapper">
        <div className="analytics-wrapper-section">
          <div className="analytics-container">
            {productsSalesCount && (
              <BarGraph data={productsSalesCount} heading={"Total sold"} />
            )}
          </div>
          <div className="analytics-container">
            {monthlySales && <LineGraph data={monthlySales} heading={"Monthly Sales"} canvasId={2}/>}
          </div>
        </div>
        <div className="analytics-wrapper-section">
          <div className="analytics-container">
          {monthlybilling && <LineGraph data={monthlybilling} heading={"Monthly Billing"} canvasId={1}/>}
          </div>
          <div className="analytics-container"></div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
