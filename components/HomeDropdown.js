import React from 'react';
import styled from 'styled-components';

const HomeDropdown = ({ stateUpdater, arr, type, countryRegion }) => {
  function handleChange(e) {
    const selectedVal = e.currentTarget.value;
    stateUpdater(selectedVal, type);
  }

  if (typeof arr !== 'undefined') {
    let indArr;
    let formID;
    switch (type) {
      case 'countryRegion':
        formID = 'Country Region';
        indArr = arr.map(a => a.countryRegion);
        indArr = Array.from(new Set(indArr));
        break;
      case 'provinceRegion':
        formID = 'Province Region';
        // indArr = arr.filter(a => a.countryRegion === countryRegion);
        indArr = Array.from(new Set(indArr));
        break;
      case 'usStateArea':
        formID = 'US State Area';
        indArr = arr.map(a => a.usStateArea);
        indArr = Array.from(new Set(indArr));
        break;
      default:
        break;
    }

    return (
      <select name={type} id={type} onChange={handleChange}>
        <option value={`Please select your ${formID}`} selected="selected">{`Please select your ${formID}`}</option>
        {indArr.map(a => (
          <option value={a} key={a}>
            {a}
          </option>
        ))}
      </select>
    );
  }
  return null;
};

export default HomeDropdown;
