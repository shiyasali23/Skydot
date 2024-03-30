import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineGraph = ({ data, heading, canvasId }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let newChart = null;

    if (data) {
      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById(`lineGraph${canvasId}`);
      newChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [{
            label: `${heading}`,
            data: data.values,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1,
            yAxisID: 'y-axis-1',
          }]
        },
        options: {
          scales: {
            yAxes: [{
              type: 'linear',
              display: true,
              position: 'left',
              id: 'y-axis-1',
            }]
          }
        }
      });

      chartRef.current = newChart;
    }

    return () => {
      if (newChart !== null) {
        newChart.destroy();
      }
    };
  }, [data, heading, canvasId]);

  return <canvas id={`lineGraph${canvasId}`} />;
};

export default LineGraph;
