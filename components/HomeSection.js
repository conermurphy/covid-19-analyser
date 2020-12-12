import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { request } from 'graphql-request';
import dynamic from 'next/dynamic';
import device from './device';
import HomeDropdown from './HomeDropdown';
import LoadingSVG from './loadingSVG';

const HomeChart = dynamic(() => import('../components/charts/home.js'), { srr: false });

const HomeChartContainer = styled.div`
  position: relative;
  margin: auto;
  width: 75%;
  max-width: 75%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${device.tablet} {
    width: 95%;
    max-width: 95%;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: auto;
  width: calc(100% - 1rem);
  margin: 1rem;

  position: ${(props) => (props.loadingData ? 'absolute' : 'none')};
  top: ${(props) => (props.loadingData ? '2.5rem' : '0px')};

  @media ${device.tablet} {
    flex-direction: column;
  }
`;

const StyledButton = styled.button`
  max-width: 10%;
  height: 2.5rem;
  margin: 0 1.5rem;
  border: 2px solid ${(props) => props.theme.offWhite};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.accent};
  box-shadow: ${(props) => props.theme.bs};
  padding: 0 0.5rem;

  @media ${device.tablet} {
    max-width: 75%;
    padding: 0.5rem 2rem;
    margin-top: 0.5rem;
  }
`;

const HomeSection = ({ API }) => {
  const defaultSelection = 'Germany'; // default selection used for dropdown on homepage

  // === VARIOUS DEFINITIONS OF STATE ===

  // State for getting complete list of data points
  const [combinedKey, setCombinedKey] = useState(defaultSelection); // Value used to query API for data
  const [combinedKeyList, setCombinedKeyList] = useState(); // Complete list of data for users to select from

  // State for home chart
  const [homeChartAPIData, setHomeChartAPIData] = useState();
  const [homeChartAPILabels, setHomeChartAPILabels] = useState();

  // State related to home chart dropdowns
  const [countryRegion, setCountryRegion] = useState(defaultSelection); // Country Region selected by the user.
  const [provinceState, setProvinceState] = useState(''); // Province Region set by the user.
  const [provinceStateList, setProvinceStateList] = useState();
  const [usStateArea, setUsStateArea] = useState('');
  const [usStateAreaList, setUsStateAreaList] = useState();

  // State for fetching data
  const [fetchData, setFetchData] = useState(false);
  const [isHomeLoading, setIsHomeLoading] = useState(false);

  // === QUERY DEFINITIONS ===

  const combinedKeyListQuery = `
    query {
      getTimeSeriesAll {
        countryRegion
        provinceState
        combinedKey
      }
    }
  `;
  const homeGraphDataQuery = `query {
    getTimeSeries(combinedKey:"${combinedKey}") {
      dead
      recovered
      confirmed
      }
    }
  `;
  const homeProvinceStateQuery = `query {
    getProvinceState(countryRegion:"${countryRegion}") {
      provinceState
    }
  }`;

  const usSubStateAreaQuery = `query {
    getUSSubStateLocations(provinceState:"${provinceState}") {
      combinedKey
    }
  }`;

  // === USE-EFFECTS FOR SETTING STATE ===

  // fetching complete combined list of locations

  useEffect(() => {
    const fetchCountryData = async () => {
      const combinedKeyListData = await request(API, combinedKeyListQuery);
      setCombinedKeyList(combinedKeyListData.getTimeSeriesAll);
    };
    fetchCountryData();
  }, []); // eslint-disable-line

  // function to transform dates
  const dateTransformer = (date) => new Date(`20${date.slice(4)}-${date.slice(0, 2)}-${date.slice(2, 4)}`);

  const dataTransformer = (data) =>
    data
      .map((d) => [dateTransformer(d[0]), d[1]])
      .sort((a, b) => a[0] - b[0])
      .reduce((acc, cur) => {
        const [date, info] = cur;
        acc.set(date, info);
        return acc;
      }, new Map());

  // This calls the query to get the selected combinedKey data from the API.

  useEffect(() => {
    const fetchHomeData = async () => {
      setIsHomeLoading(true);

      const homeGraphData = await request(API, homeGraphDataQuery);
      const usableData = homeGraphData.getTimeSeries[0];

      const data = Object.values(usableData);
      const [dead, recovered, confirmed] = data.map((d) => Object.entries(d));
      const newData = [dead, recovered, confirmed].map((d) => dataTransformer(d));
      const finalObj = {
        dead: newData[0],
        recovered: newData[1],
        confirmed: newData[2],
      };

      const dates = [];
      finalObj.confirmed.forEach((value, key) => dates.push(key.toLocaleDateString()));

      setHomeChartAPIData(finalObj);
      setHomeChartAPILabels(dates);

      setIsHomeLoading(false);
    };

    fetchHomeData();
  }, [API, homeGraphDataQuery]);

  // fetching province state list for the selected country region.

  useEffect(() => {
    const fetchProvinceState = async () => {
      const provinceStateData = await request(API, homeProvinceStateQuery);
      setProvinceStateList(provinceStateData.getProvinceState);
    };
    fetchProvinceState();
  }, [API, homeProvinceStateQuery]);

  // query to get subState locations in US

  useEffect(() => {
    const fetchSubUSStateArea = async () => {
      const subStateAreas = await request(API, usSubStateAreaQuery);
      if (provinceState !== '') {
        setUsStateAreaList(subStateAreas.getUSSubStateLocations);
      } else {
        setUsStateAreaList([]);
      }
    };
    fetchSubUSStateArea();
  }, [API, provinceState, usSubStateAreaQuery]);

  // function to set combined key

  useEffect(() => {
    const handleDataChange = () => {
      const combinedCR = countryRegion.replace(/([ ])/g, '-');
      const combinedPS = provinceState.replace(/([ ])/g, '-');
      const combinedUSA = usStateArea.replace(/([ ])/g, '-');

      if (combinedCR === 'US') {
        if (combinedPS === '' && combinedUSA === '') {
          setCombinedKey(`${combinedCR}`);
        } else if ((combinedPS !== '' && combinedUSA === '') || combinedPS === combinedUSA) {
          setCombinedKey(`${combinedPS}-${combinedCR}`);
        } else if (combinedPS !== '' && combinedUSA !== '') {
          setCombinedKey(`${combinedUSA}-${combinedPS}-${combinedCR}`);
        }
      } else if (combinedPS !== '' && combinedCR !== 'US') {
        setCombinedKey(`${combinedCR}-${combinedPS}`);
      } else {
        setCombinedKey(`${combinedCR}`);
      }

      setFetchData(false);
    };
    handleDataChange();
  }, [fetchData]); // eslint-disable-line

  // === FUNCTIONS FOR HANDLING STATE CHANGES ===

  // handle click for submit of data load request

  function handleClick(e) {
    e.preventDefault();
    setFetchData(true);
  }

  // function used to updateState from dropdown selections

  function updateState(val, type) {
    switch (type) {
      case 'countryRegion':
        setCountryRegion(val);
        break;
      case 'provinceState':
        setProvinceState(val);
        break;
      case 'usStateArea':
        setUsStateArea(val);
        break;
      default:
        break;
    }
  }

  // === RETURNING THE DROPDOWNS AND HOME CHART ===

  return (
    <>
      <StyledForm loadingData={isHomeLoading}>
        <HomeDropdown
          stateUpdater={updateState}
          arr={combinedKeyList}
          type="countryRegion"
          disabled={false}
          defaultSelection={defaultSelection}
          loadingData={isHomeLoading}
        />
        {typeof provinceStateList !== 'undefined' && provinceStateList.length > 1 ? (
          <HomeDropdown
            stateUpdater={updateState}
            arr={provinceStateList}
            type="provinceState"
            disabled={false}
            loadingData={isHomeLoading}
          />
        ) : (
          <HomeDropdown stateUpdater={updateState} arr={provinceStateList} type="provinceState" disabled loadingData={isHomeLoading} />
        )}
        {countryRegion !== 'US' ? (
          <HomeDropdown stateUpdater={updateState} arr={usStateAreaList} type="usStateArea" disabled loadingData={isHomeLoading} />
        ) : (
          <HomeDropdown stateUpdater={updateState} arr={usStateAreaList} type="usStateArea" disabled={false} loadingData={isHomeLoading} />
        )}
        <StyledButton type="button" onClick={handleClick}>
          Fetch Data
        </StyledButton>
      </StyledForm>
      {isHomeLoading ? (
        <LoadingSVG />
      ) : (
        <>
          <HomeChartContainer>
            <HomeChart data={homeChartAPIData} labels={homeChartAPILabels} combinedKey={combinedKey} />
          </HomeChartContainer>
        </>
      )}
    </>
  );
};

export default HomeSection;
