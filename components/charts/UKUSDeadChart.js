import React, { useState, useEffect, useRef } from 'react';
import { request } from 'graphql-request';
import Chart from 'chart.js';

const UKUSDeadChart = ({ API }) => {
  const UKUSDeadChartRef = useRef(null);
  const [UKDeadData, setUKDeadData] = useState();
  const [USDeadData, setUSDeadData] = useState();
  const [chartLabels, setChartLabels] = useState();

  async function getDeadData(combinedKey) {
    const data = await request(
      API,
      `query {
      getTimeSeries(combinedKey:"${combinedKey}") {
        dead
      }
    }`
    );
    return data;
  }

  useEffect(() => {
    const fetchUKUSDeadData = async () =>
      Promise.all(
        ['United-Kingdom', 'US'].map(
          CR =>
            new Promise(async (res, rej) => {
              try {
                const rawData = await getDeadData(CR);
                const data = rawData.getTimeSeries[0].dead;
                setChartLabels(Object.keys(data));
                switch (CR) {
                  case 'United-Kingdom':
                    setUKDeadData(Object.values(data));
                    res();
                    break;
                  case 'US':
                    setUSDeadData(Object.values(data));
                    res();
                    break;
                  default:
                    break;
                }
              } catch (err) {
                console.error(err);
                rej(err);
              }
            })
        )
      );

    fetchUKUSDeadData();
  }, []); // eslint-disable-line

  const pointRadius = 1;
  const borderWidth = 2;
  const lineTension = 0;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (typeof window.UKUSDeadChart !== 'undefined') {
        window.UKUSDeadChart.destroy();
      }

      const options = {
        title: {
          display: true,
          fontSize: 20,
          fontFamily: 'Montserrat',
          text: 'UK vs US Dead Cases Timeseries',
        },
      };

      const data = {
        labels: chartLabels,
        datasets: [
          {
            label: 'UK: Dead',
            backgroundColor: '#ABD1B5',
            borderColor: '#ABD1B5',
            borderWidth,
            pointRadius,
            fill: 'none',
            lineTension,
            data: UKDeadData,
          },
          {
            label: 'US: Dead',
            backgroundColor: '#F1887E',
            borderColor: '#F1887E',
            borderWidth,
            pointRadius,
            fill: 'none',
            lineTension,
            data: USDeadData,
          },
        ],
      };

      window.UKUSDeadChart = new Chart(UKUSDeadChartRef.current, {
        type: 'line',
        data,
        options,
      });

      if (typeof window.UKUSDeadChart !== 'undefined') {
        window.UKUSDeadChart.update();
      }
    }
  }, [UKDeadData, USDeadData, chartLabels]);
  return <canvas ref={UKUSDeadChartRef}></canvas>;
};

export default UKUSDeadChart;
