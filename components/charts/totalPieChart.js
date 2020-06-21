import React, { useState, useEffect, useRef } from 'react';
import { request } from 'graphql-request';
import Chart from 'chart.js';

const TotalPieChart = ({ API }) => {
  const totalPieChartRef = useRef(null);
  const [totalDead, setTotalDead] = useState();
  const [totalConfirmed, setTotalConfirmed] = useState();
  const [totalRecovered, setTotalRecovered] = useState();

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
    };

    fetchTotalData();
  });

  // useEffect to render chart.

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pieChartOptions = {
        title: {
          display: true,
          fontSize: 20,
          fontFamily: 'Montserrat',
          text: 'Total Proportion of Confirmed, Dead & Recovered Cases',
        },
      };

      const pieChartData = {
        datasets: [
          {
            label: 'Colors',
            data: [totalConfirmed, totalRecovered, totalDead],
            backgroundColor: ['#ABD1B5', '#CADAF7', '#F1887E'],
          },
        ],
        labels: ['Confirmed', 'Recovered', 'Dead'],
      };

      const totalPieChart = new Chart(totalPieChartRef.current, {
        type: 'doughnut',
        data: pieChartData,
        options: pieChartOptions,
      });
    }
  }, [totalConfirmed, totalDead, totalRecovered]);
  return <canvas ref={totalPieChartRef}></canvas>;
};

export default TotalPieChart;
