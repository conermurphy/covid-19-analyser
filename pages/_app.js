import App from 'next/app';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Page from '../components/Page';

const theme = {
  primary: '#F2F1F9',
  accent: '#B1A9DB',
  black: '#393939',
  offWhite: '#FEFEFE  ',
  bs: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
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
    scroll-padding-top: 7.5rem;
    box-sizing: border-box;
    margin: 5rem auto;
    font-family: 'Montserrat';
    font-weight: 400;
    font-size: 10px;
    background-color: ${props => props.theme.offWhite};
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.black};
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
