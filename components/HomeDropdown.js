import React, { useState } from 'react';
import styled from 'styled-components';
import device from './device';

const StyledSelect = styled.select`
  max-width: 17.5%;
  width: 17.5%;
  height: 2.5rem;
  margin: 0 1.5rem;
  border: 2px solid ${props => props.theme.accent};
  border-radius: 0.5rem;
  background-color: ${props => props.theme.offWhite};
  opacity: ${props => (props.disabled ? '50%' : '100%')};
  box-shadow: ${props => props.theme.bs};
  padding: 0 0.5rem;

  @media ${device.tablet} {
    max-width: 75%;
    width: 75%;
    padding: 0.5rem 2rem;
  }
`;

const HomeDropdown = ({ stateUpdater, arr, type, disabled, defaultSelection, loadingData }) => {
  const [displayedCountry, setDisplayedCountry] = useState(defaultSelection);

  function handleChange(e) {
    const selectedVal = e.currentTarget.value;
    setDisplayedCountry(e.currentTarget.value);
    if (e.currentTarget.id === 'countryRegion') {
      stateUpdater('', 'provinceState');
      stateUpdater('', 'usStateArea');
    }
    stateUpdater(selectedVal, type);
  }

  if (!loadingData && typeof arr !== 'undefined') {
    let indArr;
    let formID;
    switch (type) {
      case 'countryRegion':
        formID = 'Country Region';
        indArr = arr.map(a => a.countryRegion);
        indArr = Array.from(new Set(indArr));
        break;
      case 'provinceState':
        formID = 'Province State';
        indArr = arr
          .map(a => a.provinceState)
          .filter(b => b !== '')
          .sort((a, b) => (a < b ? -1 : 1));
        indArr = Array.from(new Set(indArr));
        break;
      case 'usStateArea':
        formID = 'US State Area';
        indArr = arr
          .map(a => a.combinedKey.split('-')[0])
          .filter(b => b !== '')
          .sort((a, b) => (a < b ? -1 : 1));
        indArr = Array.from(new Set(indArr));
        break;
      default:
        break;
    }
    if (defaultSelection) {
      return (
        <StyledSelect name={type} id={type} onChange={handleChange} disabled={disabled} value={displayedCountry}>
          <option value="">{`Please select your ${formID}`}</option>
          {indArr.map(a => (
            <option value={a} key={a}>
              {a}
            </option>
          ))}
        </StyledSelect>
      );
    }
    return (
      <StyledSelect name={type} id={type} onChange={handleChange} disabled={disabled}>
        <option value="">{`Please select your ${formID}`}</option>
        {indArr.map(a => (
          <option value={a} key={a}>
            {a}
          </option>
        ))}
      </StyledSelect>
    );
  }
  return (
    <StyledSelect name="Placeholder" id="placeholder">
      <option value="Loading Data...">Loading Data...</option>
    </StyledSelect>
  );
};

export default HomeDropdown;
