import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

function NumericFilters() {
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const { setPlanets, setFilterByNumericValue, planets } = useContext(MyContext);

  const handleClick = () => {
    // codigo baseado no do mauricio leal https://github.com/tryber/sd-021-a-project-starwars-planets-search/pull/125/commits/db22d4daadad58b8c4a0988c2ad1cbd703af31bf
    setFilterByNumericValue(() => [{ columnFilter, comparisonFilter, valueFilter }]);
    const setFilter = planets.filter((planet) => {
      const column = planet[columnFilter];
      const value = valueFilter;

      if (comparisonFilter === 'maior que') {
        return column > value;
      }
      if (comparisonFilter === 'menor que') {
        return column < value;
      }
      return column === value;
    });
    setPlanets(setFilter);
  };

  /* const handleChange = ({ target }) => {
    const { value } = target;
    setValueFilter(value);
    setColumnFilter(value);
    setComparisonFilter(value);
  }; */

  return (
    <div>
      <select
        data-testid="column-filter"
        name="columnFilter"
        value={ columnFilter }
        onChange={ (e) => setColumnFilter(e.target.value) }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      { ' ' }
      <select
        data-testid="comparison-filter"
        name="comparisonFilter"
        value={ comparisonFilter }
        onChange={ (e) => setComparisonFilter(e.target.value) }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      { ' ' }
      <input
        onChange={ (e) => setValueFilter(e.target.value) }
        type="number"
        name="valueFilter"
        data-testid="value-filter"
        value={ valueFilter }
      />
      { ' ' }
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleClick() }
      >
        Filtrar
      </button>
    </div>
  );
}

export default NumericFilters;
