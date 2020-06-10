import App from 'next/app';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Page from '../components/Page';

const theme = {
  primary: '#D8D4ED',
  accent: '#B1A9DB',
  black: '#393939',
  offWhite: '#EDEDED',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Montserrat';
    src: url('./Montserrat-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Montserrat';
    src: url('./Montserrat-SemiBold.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  body {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Montserrat';
    font-weight: 400;
    background-color: ${props => props.theme.offWhite}
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
