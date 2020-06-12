import styled from 'styled-components';
import Chart from 'chart.js';
import { request } from 'graphql-request';
import React, { useState, useEffect } from 'react';

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

const Home = () => {
  const [homeChartAPIData, setHomeChartAPIData] = useState();
  const [homeChartAPILabels, setHomeChartAPILabels] = useState();

  const API = 'https://covid-19-graphql-api.herokuapp.com/';
  const query = `query {
    getTimeSeries(uniqueId:"Spain") {
      dead
      recovered
      confirmed
      }
    }
  `;

  useEffect(() => {
    const fetchHomeData = async () => {
      const data = await request(API, query);
      const usableData = data.getTimeSeries[0].confirmed;
      setHomeChartAPIData(Object.values(usableData));
      setHomeChartAPILabels(Object.keys(usableData));
    };
    fetchHomeData();
  }, [query]);

  function homeChartMaker() {
    const homeChartOptions = {
      legend: {
        display: false,
      },
    };

    const homeChartData = {
      labels: homeChartAPILabels,
      datasets: [
        {
          label: 'Covid-19 Cases / Status / Country',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: '#D7D4ED',
          pointBackgroundColor: '#D7D4ED',
          borderWidth: 5,
          fill: 'none',
          lineTension: 0,
          data: homeChartAPIData,
        },
      ],
    };

    const homeCtx = document.getElementById('homeChart').getContext('2d');

    const homeChart = new Chart(homeCtx, {
      type: 'line',
      data: homeChartData,
      options: homeChartOptions,
    });
  }

  return (
    <PageContainer>
      <ContentSection>
        <HomeChartContainer>
          <canvas id="homeChart"></canvas>
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
