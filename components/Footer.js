import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: ${props => props.theme.offWhite};
  border-top: 2.5px solid ${props => props.theme.accent};
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: auto;

  p {
    font-size: 1rem;
  }
`;

const Footer = () => (
  <StyledFooter>
    <p>
      Developed with 💛 by <a href="https://conermurphy.com">Coner Murphy</a>
    </p>
  </StyledFooter>
);

export default Footer;
