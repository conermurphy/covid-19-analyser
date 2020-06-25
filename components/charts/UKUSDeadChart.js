import React, { useState, useEffect, useRef } from 'react';
import { request } from 'graphql-request';
import Chart from 'chart.js';
import device from '../device';
import LoadingSVG from '../loadingSVG';

const UKUSDeadChart = ({ API }) => {
  const UKUSDeadChartRef = useRef(null);
  const [UKDeadData, setUKDeadData] = useState();
  const [USDeadData, setUSDeadData] = useState();
  const [chartLabels, setChartLabels] = useState();
  const [isLoading, setIsLoading] = useState();

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
    setIsLoading(true);
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
    setIsLoading(false);

    fetchUKUSDeadData();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoading) {
      if (typeof window.UKUSDeadChart !== 'undefined') {
        window.UKUSDeadChart.destroy();
      }

      const mobile = window.matchMedia(`${device.tablet}`);
      const pointRadius = mobile.matches ? 1.25 : 2.5;
      const borderWidth = mobile.matches ? 2.5 : 5;
      const lineTension = 0;

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
  }, [UKDeadData, USDeadData, chartLabels, isLoading]);
  return isLoading ? <LoadingSVG /> : <canvas ref={UKUSDeadChartRef}></canvas>;
};

export default UKUSDeadChart;
