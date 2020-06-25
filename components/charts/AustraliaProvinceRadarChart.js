import React, { useState, useEffect, useRef } from 'react';
import { request } from 'graphql-request';
import Chart from 'chart.js';
import LoadingSVG from '../loadingSVG';

const AustraliaProvinceRadarChart = ({ API }) => {
  const AustraliaProvinceRadarChartRef = useRef(null);
  const [australiaProvinceList, setAustraliaProvinceList] = useState();
  const [australiaProvinceConfirmedData, setAustraliaProvinceConfirmedData] = useState([]);
  const [isLoading, setIsLoading] = useState();

  // query to get province list from the API.

  const australiaProvinceListQuery = `query {
        getProvinceState(countryRegion:"Australia") {
            combinedKey
        }
    }`;

  // useEffect to retrieve list from API and set to state.

  useEffect(() => {
    setIsLoading(true);
    const fetchAustraliaProvinceList = async () => {
      const data = await request(API, australiaProvinceListQuery);
      const australiaProvinces = data.getProvinceState
        .map(cn => cn.combinedKey)
        .filter(pr => pr !== 'Australia')
        .sort((a, b) => (a < b ? -1 : 1));
      setAustraliaProvinceList(australiaProvinces);
    };
    fetchAustraliaProvinceList();
  }, [API, australiaProvinceListQuery]);

  // useEffect to fetch data for each province and set to state.

  useEffect(() => {
    async function getAustraliaProvinceData(PS) {
      const data = await request(
        API,
        `query {
            getTimeSeries(combinedKey:"${PS}"){
              confirmed
            }
          }`
      );
      return data.getTimeSeries[0];
    }

    const fetchConfirmedData = async () => {
      if (typeof australiaProvinceList !== 'undefined') {
        const apiData = await Promise.all(
          australiaProvinceList.map(
            pr =>
              new Promise(async (res, rej) => {
                try {
                  const data = await getAustraliaProvinceData(pr);
                  const confirmedData = Object.values(data.confirmed);
                  const confirmedLatest = confirmedData[confirmedData.length - 1];
                  const obj = { [pr]: {} };
                  obj[pr].confirmed = confirmedLatest;
                  res(obj);
                } catch (err) {
                  console.error(err);
                  rej(err);
                }
              })
          )
        );

        // reduce to separate confirmed data

        const confirmedDataArray = apiData.reduce((acc, cur) => {
          const data = Object.entries(cur);
          const [[location, caseData]] = data;
          acc[location] = caseData.confirmed;
          return acc;
        }, {});

        // Setting confirmed data

        setAustraliaProvinceConfirmedData(confirmedDataArray);
        setIsLoading(false);
      }
    };

    fetchConfirmedData();
  }, [API, australiaProvinceList]);

  // Drawing confirmed data chart

  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoading) {
      if (typeof window.AustraliaProvinceRadarChart !== 'undefined') {
        window.AustraliaProvinceRadarChart.destroy();
      }

      const options = {
        title: {
          display: true,
          fontSize: 20,
          fontFamily: 'Montserrat',
          text: 'Australia Provinces Confirmed Cases',
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                display: false, // this will remove only the label
              },
            },
          ],
        },
      };

      const data = {
        labels: Object.keys(australiaProvinceConfirmedData),
        datasets: [
          {
            data: Object.values(australiaProvinceConfirmedData),
            backgroundColor: ['#FAAA8D', '#0B3954', '#00A896', '#FAAA8D', '#0B3954', '#00A896', '#FAAA8D'],
          },
        ],
      };

      window.AustraliaProvinceRadarChart = new Chart(AustraliaProvinceRadarChartRef.current, {
        type: 'horizontalBar',
        data,
        options,
      });

      if (typeof window.AustraliaProvinceRadarChart !== 'undefined') {
        window.AustraliaProvinceRadarChart.update();
      }
    }
  }, [australiaProvinceConfirmedData, isLoading]);

  return isLoading ? <LoadingSVG /> : <canvas ref={AustraliaProvinceRadarChartRef}></canvas>;
};

export default AustraliaProvinceRadarChart;
