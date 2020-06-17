import React from 'react';
import styled from 'styled-components';

const HomeDropdown = ({ stateUpdater, arr, type }) => {
  if (typeof arr !== 'undefined') {
    let indArr;
    switch (type) {
      case 'countryRegion':
        indArr = arr.map(a => a.countryRegion);
        indArr = Array.from(new Set(indArr));
        break;
      case 'provinceRegion':
        indArr = arr.map(a => a.provinceRegion);
        indArr = Array.from(new Set(indArr));
        break;
      case 'usStateArea':
        indArr = arr.map(a => a.usStateArea);
        indArr = Array.from(new Set(indArr));
        break;
      default:
        break;
    }

    return (
      <select name={type} id={type}>
        {indArr.map(a => (
          <option value={a}>{a}</option>
        ))}
      </select>
    );
  }
  return null;
};

export default HomeDropdown;
