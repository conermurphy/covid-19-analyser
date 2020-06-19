import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';

const HomeChart = ({ data, labels, combinedKey }) => {
  const homeChartRef = useRef(null);
  const [homeChart, setHomeChart] = useState();
  useEffect(() => {
    if (typeof window !== 'undefined' && data) {
      let confirmedData;
      let deadData;
      let recoveredData;

      console.log(data);

      for (const el in data) {
        confirmedData = data.confirmed ? Object.values(data.confirmed) : 'null';
        deadData = data.dead ? Object.values(data.dead) : 'null';
        recoveredData = data.recovered ? Object.values(data.recovered) : 'null';
      }

      const homeChartOptions = {
        legend: {
          display: true,
          labels: {},
        },
      };

      const pointRadius = 2;
      const borderWidth = 5;
      const lineTension = 0;

      const homeChartData = {
        labels,
        datasets: [
          {
            label: `${combinedKey} : Confirmed`,
            backgroundColor: '#ABD1B5',
            borderColor: '#ABD1B5',
            borderWidth,
            pointRadius,
            fill: 'none',
            lineTension,
            data: confirmedData,
          },
          {
            label: `${combinedKey} : Dead`,
            backgroundColor: '#F1887E',
            borderColor: '#F1887E',
            borderWidth,
            pointRadius,
            fill: 'none',
            lineTension,
            data: deadData,
          },
          {
            label: `${combinedKey} : Recovered`,
            backgroundColor: '#CADAF7',
            borderColor: '#CADAF7',
            borderWidth,
            pointRadius,
            fill: 'none',
            lineTension,
            data: recoveredData,
          },
        ],
      };

      setHomeChart(
        new Chart(homeChartRef.current, {
          type: 'line',
          data: homeChartData,
          options: homeChartOptions,
        })
      );
      if (typeof homeChart !== 'undefined') {
        homeChart.update();
      }
    }
  }, [data, labels, combinedKey]); // eslint-disable-line
  return <canvas ref={homeChartRef}></canvas>;
};

export default HomeChart;
