import React, { useState, useEffect, useRef } from 'react';
import { request } from 'graphql-request';
import Chart from 'chart.js';

const USStateConfirmedChart = ({ API }) => {
  const USStateConfirmedChartRef = useRef(null);
  const [usStateList, setUsStateList] = useState();
  const [usStateConfirmedData, setUsStateConfirmedData] = useState();

  // Function to request the data for the province state from the API.

  async function getConfirmedData(PS) {
    const data = await request(
      API,
      `query {
        getTimeSeries(combinedKey:"${PS}"){
          combinedKey
        }
      }`
    );
    return data;
  }

  const getUSStates = `query {
    getProvinceState(countryRegion:"US") {
      provinceState
    }
  }`;

  // useEffect to set stateList from confirmedKey list

  useEffect(() => {
    const createStateList = async () => {
      const usData = await request(API, getUSStates);
      const usProvinceStates = usData.getProvinceState.map(ps => ps.provinceState);
      const uniqueUsData = Array.from(new Set(usProvinceStates))
        .filter(ps => ps !== '')
        .sort((a, b) => (a < b ? -1 : 1));
      setUsStateList(uniqueUsData);
    };
    createStateList();
  }, [API, getUSStates]);

  // Fetch confirmed data and set to state

  useEffect(() => {
    const fetchStateConfirmedData = async () => {
      console.log(usStateList);
    };
    fetchStateConfirmedData();
  }, [usStateList]);

  return <canvas ref={USStateConfirmedChartRef}></canvas>;
};

export default USStateConfirmedChart;
