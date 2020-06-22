import React, { useState, useEffect, useRef } from 'react';
import { request } from 'graphql-request';
import Chart from 'chart.js';

const USStateConfirmedChart = ({ API, combinedKeyList }) => {
  const USStateConfirmedChartRef = useRef(null);
  const [usStateList, setUsStateList] = useState();
  const [usStateConfirmedData, setUsStateConfirmedData] = useState();

  const getConfirmedData = '';

  // useEffect to set stateList from confirmedKey list

  useEffect(() => {
    const createStateList = async () => {};
    createStateList();
  }, []);

  // Fetch confirmed data and set to state

  useEffect(() => {
    const fetchStateConfirmedData = async () => {};
    fetchStateConfirmedData();
  }, []);

  return <canvas ref={USStateConfirmedChartRef}></canvas>;
};

export default USStateConfirmedChart;
