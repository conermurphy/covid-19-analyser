import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import HomeSection from '../components/HomeSection';
import device from '../components/device';
import LoadingSVG from '../components/loadingSVG';

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
  justify-content: center;
  width: 100%;
  background-color: ${props => (props.coloured ? props.theme.primary : props.theme.coloured)};
  background: ${props => (props.coloured ? 'linear-gradient(180deg, rgba(215,212,237,1) 75%, rgba(254,254,254,1) 95%)' : 'none')};
  position: relative;
  padding: 2.5rem 0;

  ::before {
    content: url('./beforeEl.svg');
    display: ${props => (props.beforeEl ? 'block' : 'none')};
    width: 100%;
    top: -15vw; /* possibly look at using calc for this! */
    position: absolute;
    z-index: -1;
  }

  :first-child {
    padding-top: 2.5rem;
  }

  :last-child {
    padding-top: 2.5rem;
  }

  @media ${device.desktop} {
    flex-direction: column;
  }
`;

const TextContent = styled.div`
  text-align: ${props => (props.right ? 'right' : 'left')};
  max-width: 50%;
  padding: 0 2.5rem;

  @media ${device.desktop} {
    padding: 1rem;
    margin: 1rem;
    max-width: 100%;
    text-align: center;
  }
`;

const CovidCanvasContainer = styled.div`
  position: relative;
  margin: auto;
  height: auto;
  width: 40%;
  margin-bottom: 5rem;

  @media ${device.tablet} {
    margin-bottom: 2.5rem;
    width: 90%;
  }
`;

const ExampleChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;

  div {
    width: 80%;
  }
`;

const Home = () => {
  const API = 'https://covid-19-graphql-api.herokuapp.com/';

  return (
    <PageContainer>
      <ContentSection column style={{ height: '80vh' }}>
        <HomeSection API={API} />
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
        <img src="./workingAPI.gif" alt="Video of the API" style={{ width: '70%', margin: 'auto', maxWidth: '800px' }} />
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
        <TextContent style={{ textAlign: 'center', width: '50%', margin: 'auto', padding: '0', paddingBottom: '2rem' }}>
          <h2>More Examples</h2>
          <p>Here's some more examples of charts made using the data provided by the API.</p>
        </TextContent>
        <ExampleChartContainer>
          <CovidCanvasContainer>
            <UKUSDeadChart API={API} />
          </CovidCanvasContainer>
          <CovidCanvasContainer>
            <USStateConfirmedChart API={API} />
          </CovidCanvasContainer>
          <CovidCanvasContainer>
            <AustraliaProvinceRadarChart API={API} />
          </CovidCanvasContainer>
        </ExampleChartContainer>
      </ContentSection>
    </PageContainer>
  );
};

export default Home;
