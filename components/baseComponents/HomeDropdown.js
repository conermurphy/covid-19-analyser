import React from 'react';

const HomeDropdown = ({ stateUpdater, arr, type }) => {
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
  return (
    <select name="Placeholder" id="placeholder">
      <option value="Loading Data..."></option>
    </select>
  );
};

export default HomeDropdown;
