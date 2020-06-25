import React, { useState, useEffect, useRef } from 'react';
import { request } from 'graphql-request';
import Chart from 'chart.js';
import LoadingSVG from '../loadingSVG';

const AustraliaProvinceRadarChart = ({ API }) => {
  const AustraliaProvinceRadarChartRef = useRef(null);
  const [australiaProvinceList, setAustraliaProvinceList] = useState();
  const [australiaProvinceConfirmedData, setAustraliaProvinceConfirmedData] = useState([]);
  const [australiaProvinceConfirmedLabels, setAustraliaProvinceConfirmedLabels] = useState();
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
    if (typeof australiaProvinceList !== 'undefined') {
      // Creates a string for every request.
      const requestData = australiaProvinceList
        .map(sl => {
          const id = sl.replace(/([-])/g, '');
          return `${id}: getTimeSeries(combinedKey:"${sl}"){
          confirmed
        }`;
        })
        .join('');
      // surrounds all the above requests into one request to send.
      const ausRequest = `query{
          ${requestData}
        }`;

      const fetchConfirmedData = async () => {
        const apiData = await request(API, ausRequest);
        const arrayApiData = Object.entries(apiData);
        const transformedData = arrayApiData.reduce((acc, cur) => {
          const [location, caseData] = cur;
          acc[location] = caseData[0].confirmed;
          return acc;
        }, []);

        const labels = Object.keys(transformedData)
          .map(d => d.replace(/([A-Z])/g, ' $1').trim())
          .map(d =>
            d
              .split(' ')
              .slice(1)
              .join(' ')
          );
        const data = Object.values(transformedData)
          .map(d => Object.values(d))
          .map(d => d.slice(d.length - 1))
          .flat();

        setAustraliaProvinceConfirmedLabels(labels);
        setAustraliaProvinceConfirmedData(data);
      };
      fetchConfirmedData();
    }

    setIsLoading(false);
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
      };

      const data = {
        labels: australiaProvinceConfirmedLabels,
        datasets: [
          {
            data: australiaProvinceConfirmedData,
            backgroundColor: ['#FAAA8D', '#0B3954', '#00A896', '#FAAA8D', '#0B3954', '#00A896', '#FAAA8D', '#0B3954'],
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
  }, [australiaProvinceConfirmedData, australiaProvinceConfirmedLabels, isLoading]);

  return isLoading ? <LoadingSVG /> : <canvas ref={AustraliaProvinceRadarChartRef}></canvas>;
};

export default AustraliaProvinceRadarChart;
