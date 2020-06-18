import React from 'react';
import HomeDropdown from './baseComponents/HomeDropdown';

const CountryRegionDropdown = ({ stateUpdater, arr }) => {
  console.log(arr);

  return <HomeDropdown stateUpdater={stateUpdater} arr={arr} type="countryRegion" />;
};

export default CountryRegionDropdown;
