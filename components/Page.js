import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Meta from './Meta';

const StyledPage = styled.div`
  color: ${props => props.theme.black};
  text-decoration: none;
`;

const Inner = styled.div`
  margin: 0 auto;
  padding: 2rem;
`;

/* eslint-disable */


/* eslint-enable */

class Page extends Component {
  render() {
    const { children } = this.props;
    return (
      <StyledPage>
        <Meta />
        <Header />
        <Inner>{children}</Inner>
      </StyledPage>
    );
  }
}

export default Page;
