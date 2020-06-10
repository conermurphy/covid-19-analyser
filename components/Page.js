import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Meta from './Meta';

const StyledPage = styled.div`
  color: ${props => props.theme.black};
  text-decoration: none;
`;

const Inner = styled.div`
  margin: 0 auto;
`;

class Page extends Component {
  render() {
    const { children } = this.props;
    return (
      <StyledPage>
        <Meta />
        <Header />
        <Inner>{children}</Inner>
        <Footer />
      </StyledPage>
    );
  }
}

export default Page;
