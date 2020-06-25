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
    if (typeof usStateList !== 'undefined') {
      // Creates one string with every request in.
      const requestData = usStateList
        .map(sl => {
          const id = sl.replace(/([-])/g, '');
          return `${id}: getTimeSeries(combinedKey:"${sl}-US"){
            confirmed
          }`;
        })
        .join('');

      // Surrounds the above request into a query ready to send.
      const usRequest = `query {
        ${requestData}
      }`;

      const fetchStateConfirmedData = async () => {
        const apiData = await request(API, usRequest);
        const arrayApiData = Object.entries(apiData);
        const transformedData = arrayApiData.reduce((acc, cur) => {
          const [location, caseData] = cur;
          acc[location] = caseData[0].confirmed;
          return acc;
        }, []);

        const labels = Object.keys(transformedData);
        const data = Object.values(transformedData)
          .map(d => Object.values(d))
          .map(d => d.slice(d.length - 1))
          .flat();

        setUsStateConfirmedLabels(labels);
        setUsStateConfirmedData(data);
      };
      fetchStateConfirmedData();
    }

    setIsLoading(false);
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
