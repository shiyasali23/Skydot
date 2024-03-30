import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarGraph = ({ data,heading }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data) {
      if (chartRef.current !== null) {
        chartRef.current.destroy(); 
      }

      const ctx = document.getElementById('barGraph');
      const maxValue = Math.max(...data.values);
      const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [{
            label: `${heading}`,
            data: data.values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: Math.ceil(maxValue * 1.1)
            }
          }
        }
      });

      chartRef.current = newChart; 
    }
  }, [data,heading]);

  return <canvas  id="barGraph" />;
};

export default BarGraph;
