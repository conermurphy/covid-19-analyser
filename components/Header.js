import styled from 'styled-components';
import Link from 'next/link';
import Nav from './Nav';
import device from './device';

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  border-bottom: 2.5px solid ${props => props.theme.accent};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: auto;
  z-index: 999;

  * {
    padding: 0.5rem 4rem;
  }

  @media ${device.tablet} {
    flex-direction: column;
    justify-content: center;
    text-align: center;

    * {
      padding: 0.5rem;
    }
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
`;

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
