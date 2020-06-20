import React from 'react';
import HomeDropdown from './baseComponents/HomeDropdown';

const USStateAreaDropdown = ({ stateUpdater, arr, disabled }) => (
  <HomeDropdown stateUpdater={stateUpdater} arr={arr} disabled type="usStateArea" />
);

export default USStateAreaDropdown;
