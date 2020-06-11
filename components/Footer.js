import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: ${props => props.theme.offWhite};
  text-align: center;
  height: auto;

  p {
    font-size: 1rem;
    margin: 0;
    padding: 1rem;
  }
`;

const Footer = () => (
  <StyledFooter>
    <p>
      Developed with 💛 by{' '}
      <b>
        <a href="https://conermurphy.com">Coner Murphy</a>
      </b>
    </p>
  </StyledFooter>
);

export default Footer;
