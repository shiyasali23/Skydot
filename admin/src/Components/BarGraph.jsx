import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarGraph = ({ data,heading,canvasID,backgroundColor,borderColor, indexAxis}) => {
  const chartRef = useRef(null);

  useEffect(() => {

    let newChart = null;

    if (data) {
      if (chartRef.current !== null) {
        chartRef.current.destroy(); 
      }

      const ctx = document.getElementById(`barGraph${canvasID}`);
      const maxValue = Math.max(...data.values);
      const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [{
            label: `${heading}`,
            data: data.values,
            backgroundColor: `${backgroundColor}`,
            borderColor: `${borderColor}`,
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: `${indexAxis}`, 
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: Math.ceil(maxValue * 1.1)
            }
          }
        }
      })

      chartRef.current = newChart; 
    }

    return () => {
      if (newChart !== null) {
        newChart.destroy();
      }
    };
  }, [data,heading,canvasID]);

  return <canvas  id={`barGraph${canvasID}`} />;
};

export default BarGraph;


