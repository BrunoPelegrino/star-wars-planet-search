import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import MyContext from '../context/MyContext';

function Header() {
  const { filterByName, setFilterByname, setPlanets, planets } = useContext(MyContext);

  const handleChange = ({ target }) => {
    // (loweCase) https://stackoverflow.com/questions/44469548/es6-filter-data-with-case-insensitive-term
    const { value } = target;
    setFilterByname({ name: value });
    // setPlanets(teste);
    // console.log(planets);
    // console.log(teste);
  };
  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        name="filteryNameB"
        value={ filterByName.name }
        onChange={ handleChange }
      />
    </div>
  );
}

export default Header;

Header.propTypes = {
  filterByName: PropTypes.string,
}.isRequired;
