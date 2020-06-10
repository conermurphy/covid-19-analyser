import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
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
  body {
    box-sizing: border-box;
    margin: 0;
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
