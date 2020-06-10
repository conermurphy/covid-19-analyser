import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';
import Meta from './Meta';

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  margin: 0 auto;
  padding: 2rem;
`;

/* eslint-disable */

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Montserrat';
    src: url('./static/Montserrat-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Montserrat';
    src: url('./static/Montserrat-SemiBold.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  body {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Montserrat';
    font-weight: 400;
  }
`;
/* eslint-enable */

class Page extends Component {
  render() {
    const { children } = this.props;
    return (
      <StyledPage>
        <Meta />
        <Header />
        <Inner>{children}</Inner>
        <GlobalStyle />
      </StyledPage>
    );
  }
}

export default Page;
