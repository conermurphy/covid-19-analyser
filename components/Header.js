import styled from 'styled-components';
import Link from 'next/link';
import Nav from './Nav';

const StyledHeader = styled.header``;

const Logo = styled.h1``;

const Header = () => (
  <StyledHeader>
    <Logo>
      <Link href="/">
        <a>COVID-19 Analyser</a>
      </Link>
    </Logo>
    <Nav />
  </StyledHeader>
);

export default Header;
