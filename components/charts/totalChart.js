import React, { useState, useEffect, useRef } from 'react';
import { request } from 'graphql-request';
import Chart from 'chart.js';

const TotalChart = ({ API }) => {
  const totalChartRef = useRef(null);
  const [totalDead, setTotalDead] = useState();
  const [totalConfirmed, setTotalConfirmed] = useState();
  const [totalRecovered, setTotalRecovered] = useState();
  const [totalInfected, setTotalInfected] = useState();

  const totalDataQuery = `query {
    getTimeSeriesTotal {
      dead
      confirmed
      recovered
    }
  }`;

  // useEffect to getTotalData from API and set corresponding state on page load.

  useEffect(() => {
    const fetchTotalData = async () => {
      const rawData = await request(API, totalDataQuery);
      const { confirmed, dead, recovered } = rawData.getTimeSeriesTotal;
      const [confirmedVal, deadVal, recoveredVal] = [confirmed, dead, recovered].map(status => Object.values(status).slice(-1)).flat();
      setTotalConfirmed(confirmedVal);
      setTotalDead(deadVal);
      setTotalRecovered(recoveredVal);
      setTotalInfected(confirmedVal - recoveredVal - deadVal);
    };

    fetchTotalData();
  }, [API, totalDataQuery]);

  // useEffect to render chart.

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (typeof window.totalChart !== 'undefined') {
        window.totalChart.destroy();
      }
      const totalChartOptions = {
        title: {
          display: true,
          fontSize: 20,
          fontFamily: 'Montserrat',
          text: 'Total Infected, Dead & Recovered Cases',
        },
        legend: {
          display: false,
        },
      };

      const totalChartData = {
        datasets: [
          {
            label: 'Cases',
            data: [totalInfected, totalRecovered, totalDead],
            backgroundColor: ['#ABD1B5', '#CADAF7', '#F1887E'],
          },
        ],
        labels: ['Infected', 'Recovered', 'Dead'],
      };

      window.totalChart = new Chart(totalChartRef.current, {
        type: 'bar',
        data: totalChartData,
        options: totalChartOptions,
      });
      if (typeof window.totalChart !== 'undefined') {
        window.totalChart.update();
      }
    }
  });
  return <canvas ref={totalChartRef}></canvas>;
};

export default TotalChart;
