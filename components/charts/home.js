import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import device from '../device';

const HomeChart = ({ data, labels, combinedKey }) => {
  const homeChartRef = useRef(null);
  useEffect(() => {
    if (typeof window !== 'undefined' && data) {
      if (typeof window.homeChart !== 'undefined') {
        window.homeChart.destroy();
      }
      let confirmedData = [];
      let deadData = [];
      let recoveredData = [];

      Object.entries(data).forEach(i => {
        switch (i[0]) {
          case 'confirmed': 
            i[1].forEach((value) => confirmedData.push(value));
          break;
          case 'recovered': 
            i[1].forEach((value) => recoveredData.push(value));
          break;
          case 'dead': 
            i[1].forEach((value) => deadData.push(value));
          break;
        }
      })

      const homeChartOptions = {
        legend: {
          display: true,
          labels: {},
        },
      };

      const mobile = window.matchMedia(`${device.tablet}`);
      const pointRadius = mobile.matches ? 1.25 : 2.5;
      const borderWidth = mobile.matches ? 2.5 : 5;
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

      window.homeChart = new Chart(homeChartRef.current, {
        type: 'line',
        data: homeChartData,
        options: homeChartOptions,
      });

      if (typeof window.homeChart !== 'undefined') {
        window.homeChart.data = homeChartData;
        window.homeChart.update();
      }
    }
  }, [data, labels, combinedKey]);
  return <canvas ref={homeChartRef}></canvas>;
};

export default HomeChart;
