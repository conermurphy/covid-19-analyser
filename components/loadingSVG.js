import styled, { keyframes } from 'styled-components';

const awaitingRotate = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`;

const StatusSVG = styled.svg`
  animation: ${awaitingRotate} 3s infinite;
  align-self: center;

  & > circle {
    fill: ${props => props.theme.accent};
    stroke: none;
    filter: drop-shadow(0px 0px 0px rgba(0, 0, 0, 9));
  }
`;

const LoadingSVG = ({ width = 250, height = 250 }) => (
  <StatusSVG width={width} height={height} viewBox="0 0 100 100">
    <circle cx="50" cy="25" r="5" />
    <circle cx="67.5" cy="32.5" r="5" />
    <circle cx="75" cy="50" r="5" />
    <circle cx="67.5" cy="67.5" r="5" />
    <circle cx="50" cy="75" r="5" />
    <circle cx="32.5" cy="67.5" r="5" />
    <circle cx="25" cy="50" r="5" />
    <circle cx="32.5" cy="32.5" r="5" />
  </StatusSVG>
);

export default LoadingSVG;
