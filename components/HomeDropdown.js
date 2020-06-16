import React from 'react';
import styled from 'styled-components';

const HomeDropdown = ({ stateUpdater, arr }) => {
  if (typeof arr !== 'undefined') {
    console.log(arr);
    return (
      <select name="countryRegions" id="countryRegions">
        {arr.map(a => (
          <option value={a}>{a}</option>
        ))}
      </select>
    );
  }
  return null;
};

export default HomeDropdown;
