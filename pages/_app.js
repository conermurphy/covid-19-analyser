import App from 'next/app';
import { ThemeProvider } from 'styled-components';
import Page from '../components/Page';

const theme = {
  primary: '#5A47AE',
  secondary: '#BEB7E1',
  black: '#393939',
  offWhite: '#EDEDED',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ThemeProvider>
    );
  }
}
