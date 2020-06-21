import React, { useState, useEffect, useRef } from 'react';
import { request } from 'graphql-request';
import Chart from 'chart.js';

const UKUSConfirmedChart = ({ API }) => {
  const UKUSConfirmedChartRef = useRef(null);
  const [UKConfirmedData, setUKConfirmedData] = useState();
  const [USConfirmedData, setUSConfirmedData] = useState();
  const [chartLabels, setChartLabels] = useState();

  async function getConfirmedData(combinedKey) {
    const data = await request(
      API,
      `query {
      getTimeSeries(combinedKey:"${combinedKey}") {
        confirmed
      }
    }`
    );
    return data;
  }

  useEffect(() => {
    const fetchUKUSConfirmedData = async () =>
      Promise.all(
        ['United-Kingdom', 'US'].map(
          CR =>
            new Promise(async (res, rej) => {
              try {
                const rawData = await getConfirmedData(CR);
                const data = rawData.getTimeSeries[0].confirmed;
                setChartLabels(Object.keys(data));
                switch (CR) {
                  case 'United-Kingdom':
                    setUKConfirmedData(Object.values(data));
                    res();
                    break;
                  case 'US':
                    setUSConfirmedData(Object.values(data));
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

    fetchUKUSConfirmedData();
  }, []); // eslint-disable-line

  const pointRadius = 1;
  const borderWidth = 2;
  const lineTension = 0;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (typeof UKUSConfirmedChart !== 'undefined') {
        UKUSConfirmedChart.destroy();
      }

      const data = {
        labels: chartLabels,
        datasets: [
          {
            label: 'UK: Confirmed',
            backgroundColor: '#ABD1B5',
            borderColor: '#ABD1B5',
            borderWidth,
            pointRadius,
            fill: 'none',
            lineTension,
            data: UKConfirmedData,
          },
          {
            label: 'US: Confirmed',
            backgroundColor: '#F1887E',
            borderColor: '#F1887E',
            borderWidth,
            pointRadius,
            fill: 'none',
            lineTension,
            data: USConfirmedData,
          },
        ],
      };

      const UKUSConfirmedChart = new Chart(UKUSConfirmedChartRef.current, {
        type: 'line',
        data,
      });

      if (typeof UKUSConfirmedChart !== 'undefined') {
        UKUSConfirmedChart.update();
      }
    }
  }, [UKConfirmedData, USConfirmedData, chartLabels]);
  return <canvas ref={UKUSConfirmedChartRef}></canvas>;
};

export default UKUSConfirmedChart;
