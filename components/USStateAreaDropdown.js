import React from 'react';
import HomeDropdown from './baseComponents/HomeDropdown';

const USStateAreaDropdown = ({ stateUpdater, arr }) => {
  console.log(arr);

  return <HomeDropdown stateUpdater={stateUpdater} arr={arr} type="usStateArea" />;
};

export default USStateAreaDropdown;
