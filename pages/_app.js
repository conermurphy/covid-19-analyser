import App from 'next/app';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Page from '../components/Page';

const theme = {
  primary: '#D7D4ED',
  accent: '#B1A9DB',
  black: '#393939',
  offWhite: '#FEFEFE  ',
  bs: '0 8px 16px 0 rgba(12, 12, 12, 0.07)',
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Montserrat';
    src: url('./Montserrat-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: fallback;
  }
  @font-face {
    font-family: 'Montserrat';
    src: url('./Montserrat-SemiBold.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: fallback;
  }
  body {
    box-sizing: border-box;
    margin: auto;
    margin-top: 5rem;
    font-family: 'Montserrat';
    font-weight: 400;
    font-size: 10px;
    background-color: ${props => props.theme.offWhite};
    overflow-x: hidden;
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.black};
  }
  h1 {
    font-size: 1.75rem;
    font-weight: 600;
  }
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }
  h3 {
    font-size: 1.5rem;
    font-weight: 400;
  }
  p, select, button, li {
    font-size: 1rem;
    line-height: 1.4;
    font-weight: 400;
    list-style: none;
  }
`;

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Page>
          <Component {...pageProps} />
        </Page>
        <GlobalStyle />
      </ThemeProvider>
    );
  }
}
