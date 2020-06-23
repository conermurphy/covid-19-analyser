import React, { useState, useEffect, useRef } from 'react';
import { request } from 'graphql-request';
import Chart from 'chart.js';

const CanadaProvinceRadarChart = ({ API }) => {
  const CanadaProvinceRadarChartRef = useRef(null);
  const [canadaProvinceList, setCanadaProvinceList] = useState();
  const [canadaProvinceConfirmedData, setCanadaProvinceConfirmedData] = useState();
  const [canadaProvinceDeadData, setCanadaProvinceDeadData] = useState();

  // query to get province list from the API.

  const canadaProvinceListQuery = `query {
        getProvinceState(countryRegion:"Canada") {
            combinedKey
        }
    }`;

  // useEffect to retrieve list from API and set to state.

  useEffect(() => {
    const fetchCanadaProvinceList = async () => {
      const data = await request(API, canadaProvinceListQuery);
      const canadaProvinces = data.getProvinceState.map(cn => cn.combinedKey).filter(pr => pr !== 'Canada');
      setCanadaProvinceList(canadaProvinces);
    };
    fetchCanadaProvinceList();
  }, [API, canadaProvinceListQuery]);

  // useEffect to fetch data for each province and set to state.

  useEffect(() => {
    async function getCanadaProvinceData(PS) {
      const data = await request(
        API,
        `query {
            getTimeSeries(combinedKey:"${PS}"){
              confirmed
              dead
            }
          }`
      );
      return data.getTimeSeries[0];
    }

    const fetchConfirmedDeadData = async () => {
      if (typeof canadaProvinceList !== 'undefined') {
        const apiData = await Promise.all(
          canadaProvinceList.map(
            pr =>
              new Promise(async (res, rej) => {
                try {
                  const data = await getCanadaProvinceData(pr);
                  const confirmedData = Object.values(data.confirmed);
                  const deadData = Object.values(data.dead);
                  const confirmedLatest = confirmedData[confirmedData.length - 1];
                  const deadLatest = deadData[deadData.length - 1];
                  const obj = {};
                  obj[pr].confirmed = confirmedLatest;
                  obj[pr].dead = deadLatest;
                  res(obj);
                } catch (err) {
                  console.error(err);
                  rej(err);
                }
              })
          )
        );
        console.log(apiData);
      }
    };
    fetchConfirmedDeadData();
  }, [API, canadaProvinceList]);

  return <canvas ref={CanadaProvinceRadarChartRef}></canvas>;
};

export default CanadaProvinceRadarChart;
