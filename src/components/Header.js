import React, { useContext, useState } from 'react';
import { PropTypes } from 'prop-types';
import MyContext from '../context/MyContext';
import NumericFilters from './NumericFiltes';

// (loweCase) https://stackoverflow.com/questions/44469548/es6-filter-data-with-case-insensitive-term

function Header() {
  const { filterByName, setFilterByName } = useContext(MyContext);

  const handleChange = ({ target }) => {
    const { value } = target;
    setFilterByName({ name: value });
  };
  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        name="filterByName"
        value={ filterByName.name }
        onChange={ handleChange }
      />
      <NumericFilters />
    </div>
  );
}

export default Header;

Header.propTypes = {
  filterByName: PropTypes.string,
}.isRequired;
