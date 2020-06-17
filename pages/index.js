import styled from 'styled-components';
import { request } from 'graphql-request';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import HomeDropdown from '../components/HomeDropdown';

const HomeChart = dynamic(() => import('../components/charts/home.js'), { srr: false });

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
  padding: 2.5rem 0;
  position: relative;

  * {
    flex: 1 1 0;
  }

  ::before {
    content: url('./beforeEl.svg');
    display: ${props => (props.beforeEl ? 'conents' : 'none')};
    width: 100%;
    top: -270px;
    position: absolute;
    z-index: -1;
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
  height: 70vh;
  width: 50%;
  max-width: 75%;
  z-index: 2;
`;

const CovidCanvasContainer = styled.div`
  position: relative;
  margin: auto;
  height: 20vw;
  width: 10%;
  max-width: 400px;
  background-color: blue;
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

  & > select {
    max-width: 15rem;
    height: 2.5rem;
    border: 2px solid ${props => props.theme.accent};
    border-radius: 0.5rem;
    background-color: ${props => props.theme.offWhite};
    box-shadow: ${props => props.theme.bs};
    padding: 0 0.5rem;
  }
`;

const Home = () => {
  const [homeChartAPIData, setHomeChartAPIData] = useState();
  const [homeChartAPILabels, setHomeChartAPILabels] = useState();
  const [combinedKey, setCombinedKey] = useState('Denmark'); // Value used to query API for data
  const [combinedKeyList, setCombinedKeyList] = useState(); // Complete list of data for users to select from
  const [countryRegion, setCountryRegion] = useState('Denmark'); // Country Region selected by the user.
  const [provinceRegion, setProvinceRegion] = useState(); // Province Region set by the user.
  const [usStateArea, setUsStateArea] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const API = 'https://covid-19-graphql-api.herokuapp.com/';
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

  useEffect(() => {
    const fetchCountryData = async () => {
      setIsLoading(true);

      const combinedKeyListData = await request(API, combinedKeyListQuery);
      setCombinedKeyList(combinedKeyListData.getTimeSeriesAll);

      setIsLoading(false);
    };
    fetchCountryData();
  }, []); // eslint-disable-line

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

  function updateState(val, type) {
    switch (type) {
      case 'countryRegion':
        setCountryRegion(val);
        break;
      case 'provinceRegion':
        setProvinceRegion(val);
        break;
      case 'usStateArea':
        setUsStateArea(val);
        break;
      default:
        break;
    }
  }

  return (
    <PageContainer>
      <ContentSection column>
        <StyledForm>
          <HomeDropdown stateUpdater={updateState} arr={combinedKeyList} type="countryRegion" />
          {/* <HomeDropdown stateUpdater={updateState} arr={combinedKeyList} type="countryRegion" />
        <HomeDropdown stateUpdater={updateState} arr={combinedKeyList} type="countryRegion" /> */}
        </StyledForm>
        <HomeChartContainer>
          {isLoading ? (
            <p>Loading Data...</p>
          ) : (
            <HomeChart data={homeChartAPIData} labels={homeChartAPILabels} isLoading={isLoading} combinedKey={combinedKey} />
          )}
          <canvas id="homeChart"></canvas>;
        </HomeChartContainer>
      </ContentSection>
      <ContentSection id="covid" coloured beforeEl>
        <TextContent left>
          <h2>COVID-19</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tortor orci, porta a mollis in, vestibulum at sapien. Maecenas
            ut laoreet eros, id pharetra libero. Aenean ex justo, laoreet id fermentum vel, rhoncus placerat metus. Morbi sed blandit ipsum.
            Sed sit amet magna nec metus feugiat molestie quis sed lectus. Nam vitae diam nisi. Sed tincidunt consequat felis, nec tristique
            nisl malesuada tincidunt. Morbi pretium turpis et dolor venenatis fermentum. In hac habitasse platea dictumst. Vestibulum
            posuere enim elit, id consectetur sem varius eget. In nunc nibh, vehicula ut purus eu, laoreet maximus dolor. Fusce suscipit
            elementum eros. In consequat vitae risus laoreet rhoncus. Donec placerat, nisl ut ornare vulputate, mauris felis congue turpis,
            in commodo metus mauris ut ligula. Suspendisse vitae tortor lacus. Suspendisse at sem ac arcu tristique scelerisque id vitae
            lorem.{' '}
          </p>
        </TextContent>
        <CovidCanvasContainer>
          <canvas id="covidChart"></canvas>
        </CovidCanvasContainer>
      </ContentSection>
      <ContentSection id="about">
        <CovidCanvasContainer>
          <canvas id="covidChart"></canvas>
        </CovidCanvasContainer>
        <TextContent right>
          <h2>About</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tortor orci, porta a mollis in, vestibulum at sapien. Maecenas
            ut laoreet eros, id pharetra libero. Aenean ex justo, laoreet id fermentum vel, rhoncus placerat metus. Morbi sed blandit ipsum.
            Sed sit amet magna nec metus feugiat molestie quis sed lectus. Nam vitae diam nisi. Sed tincidunt consequat felis, nec tristique
            nisl malesuada tincidunt. Morbi pretium turpis et dolor venenatis fermentum. In hac habitasse platea dictumst. Vestibulum
            posuere enim elit, id consectetur sem varius eget. In nunc nibh, vehicula ut purus eu, laoreet maximus dolor. Fusce suscipit
            elementum eros. In consequat vitae risus laoreet rhoncus. Donec placerat, nisl ut ornare vulputate, mauris felis congue turpis,
            in commodo metus mauris ut ligula. Suspendisse vitae tortor lacus. Suspendisse at sem ac arcu tristique scelerisque id vitae
            lorem.{' '}
          </p>
        </TextContent>
      </ContentSection>
      <ContentSection id="examples" coloured column beforeEl>
        <TextContent style={{ textAlign: 'center', width: '50%', margin: 'auto', paddingBottom: '2rem' }}>
          <h2>Examples</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tortor orci, porta a mollis in, vestibulum at sapien. Maecenas
            ut laoreet eros, id pharetra libero. Aenean ex justo, laoreet id fermentum vel, rhoncus placerat metus. Morbi sed blandit ipsum.
            Sed sit amet magna nec metus feugiat molestie quis sed lectus. Nam vitae diam nisi.
          </p>
        </TextContent>
        <div style={{ display: 'flex', flexDirection: 'row', width: '75%', margin: 'auto' }}>
          <CovidCanvasContainer>
            <canvas id="covidChart"></canvas>
          </CovidCanvasContainer>
          <CovidCanvasContainer>
            <canvas id="covidChart"></canvas>
          </CovidCanvasContainer>
          <CovidCanvasContainer>
            <canvas id="covidChart"></canvas>
          </CovidCanvasContainer>
        </div>
      </ContentSection>
    </PageContainer>
  );
};

export default Home;
