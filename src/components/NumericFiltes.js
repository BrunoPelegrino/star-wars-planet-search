import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

function NumericFilters() {
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFtiler, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const { filterByNumbericValue, setFilterByNumbericValue } = useContext(MyContext);

  const handleClick = (numericFilter) => {
    setFilterByNumbericValue([...filterByNumbericValue, numericFilter]);
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
        value={ comparisonFtiler }
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
        name="value"
        data-testid="value-filter"
        value={ valueFilter }
      />
      { ' ' }
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleClick({ columnFilter, comparisonFtiler, valueFilter }) }
      >
        Filtrar
      </button>
    </div>
  );
}

export default NumericFilters;
