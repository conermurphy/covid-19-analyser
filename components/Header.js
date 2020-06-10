import styled from 'styled-components';
import Link from 'next/link';
import Nav from './Nav';

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10vw;
`;

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
