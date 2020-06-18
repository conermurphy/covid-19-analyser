import React from 'react';
import HomeDropdown from './baseComponents/HomeDropdown';

const ProvinceStateDropdown = ({ stateUpdater, arr }) => {
  console.log(arr);

  return <HomeDropdown stateUpdater={stateUpdater} arr={arr} type="provinceRegion" />;
};

export default ProvinceStateDropdown;
