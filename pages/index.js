import styled, { keyframes } from 'styled-components';
import { request } from 'graphql-request';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import HomeDropdown from '../components/HomeDropdown';

const HomeChart = dynamic(() => import('../components/charts/home.js'), { srr: false });
const UKUSDeadChart = dynamic(() => import('../components/charts/UKUSDeadChart.js'), { srr: false });
const TotalChart = dynamic(() => import('../components/charts/totalChart.js'), { srr: false });
const USStateConfirmedChart = dynamic(() => import('../components/charts/USStateConfirmedChart.js'), { srr: false });
const AustraliaProvinceRadarChart = dynamic(() => import('../components/charts/AustraliaProvinceRadarChart.js'), { srr: false });

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentSection = styled.section`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  justify-content: space-between;
  width: 100%;
  background-color: ${props => (props.coloured ? props.theme.primary : props.theme.coloured)};
  background: ${props => (props.coloured ? 'linear-gradient(180deg, rgba(215,212,237,1) 75%, rgba(254,254,254,1) 95%)' : 'none')};
  padding: 5rem 0;
  position: relative;

  * {
    flex: 1 1 0;
  }

  ::before {
    content: url('./beforeEl.svg');
    display: ${props => (props.beforeEl ? 'block' : 'none')};
    width: 100%;
    top: -270px;
    position: absolute;
    z-index: -1;
  }

  :first-child {
    padding-top: 2.5rem;
  }

  :last-child {
    padding-top: 2.5rem;
  }
`;

const TextContent = styled.div`
  padding-left: ${props => (props.left ? '15rem' : 0)};
  padding-right: ${props => (props.right ? '15rem' : 0)};
  text-align: ${props => (props.right ? 'right' : 'left')};
  max-width: 40%;
`;

const HomeChartContainer = styled.div`
  position: relative;
  margin: auto;
  height: 75vh;
  min-height: 75vh;
  width: 75%;
  max-width: 75%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const awaitingRotate = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`;

const StatusSVG = styled.svg`
  animation: ${awaitingRotate} 3s infinite;
  margin-bottom: 12.5%;

  & > circle {
    fill: ${props => props.theme.accent};
    stroke: none;
    filter: drop-shadow(0px 0px 0px rgba(0, 0, 0, 9));
  }
`;

const CovidCanvasContainer = styled.div`
  position: relative;
  margin: auto;
  height: auto;
  max-width: 40%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100%;
  margin: 1rem;
`;

const StyledButton = styled.button`
  max-width: 10%;
  height: 2.5rem;
  margin: 0 1.5rem;
  border: 2px solid ${props => props.theme.offWhite};
  border-radius: 0.5rem;
  background-color: ${props => props.theme.accent};
  box-shadow: ${props => props.theme.bs};
  padding: 0 0.5rem;
`;

const Home = () => {
  const API = 'https://covid-19-graphql-api.herokuapp.com/';
  const defaultSelection = 'Denmark';

  // State for home chart
  const [homeChartAPIData, setHomeChartAPIData] = useState();
  const [homeChartAPILabels, setHomeChartAPILabels] = useState();
  // State for getting complete list of data points
  const [combinedKey, setCombinedKey] = useState(defaultSelection); // Value used to query API for data
  const [combinedKeyList, setCombinedKeyList] = useState(); // Complete list of data for users to select from
  // State related to home chart dropdowns
  const [countryRegion, setCountryRegion] = useState(defaultSelection); // Country Region selected by the user.
  const [provinceState, setProvinceState] = useState(''); // Province Region set by the user.
  const [provinceStateList, setProvinceStateList] = useState();
  const [usStateArea, setUsStateArea] = useState('');
  const [usStateAreaList, setUsStateAreaList] = useState();
  // Loading Related State
  const [isLoading, setIsLoading] = useState(false);
  const [fetchData, setFetchData] = useState(false);

  // Queries for fetching data

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

  // This function fetches the full combined list from the API and sets the state.

  useEffect(() => {
    const fetchCountryData = async () => {
      const combinedKeyListData = await request(API, combinedKeyListQuery);
      setCombinedKeyList(combinedKeyListData.getTimeSeriesAll);
    };
    fetchCountryData();
  }, []); // eslint-disable-line

  // This calls the query to get the selected combinedKeys data from the API.

  useEffect(() => {
    const fetchHomeData = async () => {
      setIsLoading(true);

      const homeGraphData = await request(API, homeGraphDataQuery);
      const usableData = homeGraphData.getTimeSeries[0];

      setHomeChartAPIData(usableData);
      setHomeChartAPILabels(Object.keys(usableData.confirmed));

      setIsLoading(false);
    };

    fetchHomeData();
  }, [homeGraphDataQuery]);

  // query to retrieve province state list for the selected country region.

  useEffect(() => {
    const fetchProvinceState = async () => {
      const provinceStateData = await request(API, homeProvinceStateQuery);
      setProvinceStateList(provinceStateData.getProvinceState);
    };
    fetchProvinceState();
  }, [homeProvinceStateQuery]);

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
  }, [provinceState, usSubStateAreaQuery]);

  // function to set combined ke

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

  // function passed to child home drop down menus to update state

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

  // handle click for submit of data load request

  function handleClick(e) {
    e.preventDefault();
    setFetchData(true);
  }

  return (
    <PageContainer>
      <ContentSection column>
        <StyledForm>
          <HomeDropdown
            stateUpdater={updateState}
            arr={combinedKeyList}
            type="countryRegion"
            disabled={false}
            defaultSelection={defaultSelection}
          />
          {typeof provinceStateList !== 'undefined' && provinceStateList.length > 1 ? (
            <HomeDropdown stateUpdater={updateState} arr={provinceStateList} type="provinceState" disabled={false} />
          ) : (
            <HomeDropdown stateUpdater={updateState} arr={provinceStateList} type="provinceState" disabled />
          )}
          {countryRegion !== 'US' ? (
            <HomeDropdown stateUpdater={updateState} arr={usStateAreaList} type="usStateArea" disabled />
          ) : (
            <HomeDropdown stateUpdater={updateState} arr={usStateAreaList} type="usStateArea" disabled={false} />
          )}
          <StyledButton type="button" onClick={handleClick}>
            Fetch Data
          </StyledButton>
        </StyledForm>
        <HomeChartContainer>
          {isLoading ? (
            <StatusSVG width="250" height="250" viewBox="0 0 100 100">
              <circle cx="50" cy="25" r="5" />
              <circle cx="67.5" cy="32.5" r="5" />
              <circle cx="75" cy="50" r="5" />
              <circle cx="67.5" cy="67.5" r="5" />
              <circle cx="50" cy="75" r="5" />
              <circle cx="32.5" cy="67.5" r="5" />
              <circle cx="25" cy="50" r="5" />
              <circle cx="32.5" cy="32.5" r="5" />
            </StatusSVG>
          ) : (
            <HomeChart data={homeChartAPIData} labels={homeChartAPILabels} combinedKey={combinedKey} />
          )}
        </HomeChartContainer>
      </ContentSection>
      <ContentSection id="covid" coloured beforeEl>
        <TextContent left>
          <h2>COVID-19</h2>
          <p>Coronavirus disease (COVID-19) is an infectious disease caused by a newly discovered coronavirus.</p>
          <p>
            The best way to prevent and slow down transmission is be well informed about the COVID-19 virus, the disease it causes and how
            it spreads. Protect yourself and others from infection by washing your hands or using an alcohol based rub frequently and not
            touching your face.
          </p>
          <p>
            The COVID-19 virus spreads primarily through droplets of saliva or discharge from the nose when an infected person coughs or
            sneezes, so it’s important that you also practice respiratory etiquette (for example, by coughing into a flexed elbow).
          </p>
          <p>
            <i>
              Information above provided by{' '}
              <b>
                <a href="https://www.who.int/health-topics/coronavirus#tab=tab_1">World Health Organization. Read more.</a>
              </b>
            </i>
          </p>
        </TextContent>
        <CovidCanvasContainer>
          <TotalChart API={API} />
        </CovidCanvasContainer>
      </ContentSection>
      <ContentSection id="about">
        <CovidCanvasContainer>
          <canvas id="covidChart"></canvas>
        </CovidCanvasContainer>
        <TextContent right>
          <h2>About This Site</h2>
          <p>
            I put this site together as a landing page for the API I made to provide information on the COVID-19 pandemic gripping the world
            in 2020. The API was a great learning project and is completely free to use in your own projects, if you're interested in giving
            it a shot, you can find it <a href="covid-19-graphql-api.herokuapp.com/">here.</a>
          </p>
          <p>
            If you're interested in contributing to the project or just want to give the code a read over, you can find links to both this
            landing page and the API on my{' '}
            <a href="https://github.com/conermurphy">
              <b>Github.</b>
            </a>
          </p>
          <ul>
            <li>
              <a href="https://github.com/conermurphy/covid-19-analyser">
                <b>Front-End</b>
              </a>
            </li>
            <li>
              <a href="https://github.com/conermurphy/covid-19-graphql-api">
                <b>API</b>
              </a>
            </li>
          </ul>
        </TextContent>
      </ContentSection>
      <ContentSection id="examples" coloured column beforeEl>
        <TextContent style={{ textAlign: 'center', width: '50%', margin: 'auto', paddingBottom: '2rem' }}>
          <h2>More Examples</h2>
          <p>Here's some more examples of charts made using the data provided by the API.</p>
        </TextContent>
        <div style={{ display: 'flex', flexDirection: 'row', width: '75%', margin: 'auto' }}>
          <CovidCanvasContainer>
            <UKUSDeadChart API={API} />
          </CovidCanvasContainer>
          <CovidCanvasContainer>
            <USStateConfirmedChart API={API} />
          </CovidCanvasContainer>
          <CovidCanvasContainer>
            <AustraliaProvinceRadarChart API={API} />
          </CovidCanvasContainer>
        </div>
      </ContentSection>
    </PageContainer>
  );
};

export default Home;
