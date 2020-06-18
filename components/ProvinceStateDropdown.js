import React from 'react';
import HomeDropdown from './baseComponents/HomeDropdown';

const ProvinceStateDropdown = ({ stateUpdater, arr }) => <HomeDropdown stateUpdater={stateUpdater} arr={arr} type="provinceRegion" />;

export default ProvinceStateDropdown;
