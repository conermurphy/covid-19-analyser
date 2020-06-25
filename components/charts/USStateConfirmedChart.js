import React, { useState, useEffect, useRef } from 'react';
import { request } from 'graphql-request';
import Chart from 'chart.js';
import LoadingSVG from '../loadingSVG';

const USStateConfirmedChart = ({ API }) => {
  const USStateConfirmedChartRef = useRef(null);
  const [usStateList, setUsStateList] = useState();
  const [usStateConfirmedData, setUsStateConfirmedData] = useState();
  const [usStateConfirmedLabels, setUsStateConfirmedLabels] = useState();
  const [isLoading, setIsLoading] = useState();

  // query to request the data for the province state from the API.

  const getUSStates = `query {
    getProvinceState(countryRegion:"US") {
      provinceState
    }
  }`;

  // useEffect to set stateList from confirmedKey list

  useEffect(() => {
    setIsLoading(true);
    const createStateList = async () => {
      const usData = await request(API, getUSStates);
      const usProvinceStates = usData.getProvinceState.map(ps => ps.provinceState);
      const uniqueUsData = Array.from(new Set(usProvinceStates))
        .filter(ps => ps !== '')
        .map(ps => ps.replace(/([ ])/g, '-'))
        .sort((a, b) => (a < b ? -1 : 1));
      setUsStateList(uniqueUsData);
    };
    createStateList();
  }, [API, getUSStates]);

  // Fetch confirmed data and set to state

  useEffect(() => {
    async function getConfirmedData(PS) {
      const data = await request(
        // Can this be made to be one request for all states rather than 50 small requests???
        API,
        `query { 
            getTimeSeries(combinedKey:"${PS}-US"){
              confirmed
            }
          }`
      );
      return data.getTimeSeries[0].confirmed;
    }

    const fetchStateConfirmedData = async () => {
      if (typeof usStateList !== 'undefined') {
        const parsedData = await Promise.all(
          usStateList.map(
            sl =>
              new Promise(async (res, rej) => {
                try {
                  const d = await getConfirmedData(sl);
                  const dataValues = Object.values(d);
                  const latestConfirmed = dataValues[dataValues.length - 1];
                  const psData = {};
                  psData[sl] = latestConfirmed;
                  res(psData);
                } catch (err) {
                  console.error(err);
                  rej(err);
                }
              })
          )
        );

        const labels = parsedData.map(a => Object.keys(a)).flat();
        const data = parsedData.map(a => Object.values(a)).flat();

        setUsStateConfirmedLabels(labels);
        setUsStateConfirmedData(data);
        setIsLoading(false);
      }
    };
    fetchStateConfirmedData();
  }, [API, usStateList]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoading) {
      if (typeof window.USStateConfirmedChart !== 'undefined') {
        window.USStateConfirmedChart.destroy();
      }

      const options = {
        title: {
          display: true,
          fontSize: 20,
          fontFamily: 'Montserrat',
          text: 'US State Confirmed Cases / State',
        },
        legend: {
          display: false,
        },
      };

      const data = {
        datasets: [{ data: usStateConfirmedData }],
        labels: usStateConfirmedLabels,
      };

      window.USStateConfirmedChart = new Chart(USStateConfirmedChartRef.current, {
        type: 'pie',
        data,
        options,
      });

      if (typeof window.USStateConfirmedChart !== 'undefined') {
        window.USStateConfirmedChart.update();
      }
    }
  }, [isLoading, usStateConfirmedData, usStateConfirmedLabels]);

  return isLoading ? <LoadingSVG /> : <canvas ref={USStateConfirmedChartRef}></canvas>;
};

export default USStateConfirmedChart;
