import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';
import fetchPlanets from '../service/Api';

function NumericFilters() {
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [removeColumnFilter, setremoveColumnFilter] = useState(['population',
    'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  // const [filteredComparison] = useState(['maior que', 'menor que', 'igual a']);
  // const [select, setSelect] = useState([]);
  const { setPlanets, setFilterByNumericValue,
    planets, filterByNumericValue, filtered } = useContext(MyContext);

  const removeColumn = () => {
    const attColumn = removeColumnFilter.filter((column) => column !== columnFilter);
    // console.log(attColumn);
    setremoveColumnFilter(attColumn);
    setColumnFilter(attColumn[0]);
  };

  const removeAll = async () => {
    const response = await fetchPlanets();
    const data = response.results.map((result) => {
      delete result.residents;
      // console.log(result);
      return result;
    });
    // console.log(data);
    setPlanets(data);
    setFilterByNumericValue([]);
    setremoveColumnFilter(['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water']);
    setValueFilter(0);
  };

  const prevData = (array) => {
    let listaFiltrada = filtered;
    array.forEach((filter) => {
      console.log(filter.columnFilter);
      console.log(filter.comparisonFilter);
      if (filter.comparisonFilter === 'igual a') {
        listaFiltrada = listaFiltrada
          .filter((item) => Number(item[filter
            .columnFilter]) === Number(filter.valueFilter));
      }
      if (filter.comparisonFilter === 'maior que') {
        listaFiltrada = listaFiltrada
          .filter((item) => Number(item[filter
            .columnFilter]) > Number(filter.valueFilter));
      }

      if (filter.comparisonFilter === 'menor que') {
        listaFiltrada = listaFiltrada
          .filter((item) => Number(item[filter
            .columnFilter]) < Number(filter.valueFilter));
      }
    });
    setPlanets(listaFiltrada);
  };

  const deleteBtn = ({ target }) => {
    const newFilter = target.value;
    if (filterByNumericValue.length === 1) {
      removeAll();
    }
    // console.log(select);
    const ddd = filterByNumericValue.filter((filter) => filter
      .columnFilter !== newFilter);
    setFilterByNumericValue(ddd);
    prevData(ddd);
  };

  const handleClick = () => {
    // codigo baseado no do mauricio leal https://github.com/tryber/sd-021-a-project-starwars-planets-search/pull/125/commits/db22d4daadad58b8c4a0988c2ad1cbd703af31bf
    setFilterByNumericValue((oldState) => [...oldState,
      { columnFilter, comparisonFilter, valueFilter }]);
    const setFilter = planets.filter((planet) => {
      const column = Number(planet[columnFilter]);
      const number = Number(valueFilter);

      if (comparisonFilter === 'maior que') {
        return column > number;
      }
      if (comparisonFilter === 'menor que') {
        return column < number;
      }
      return column === number;
    });
    setPlanets(setFilter);
    removeColumn();
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
        {removeColumnFilter.map((newColumn, i) => (
          <option
            key={ i }
          >
            { newColumn }

          </option>))}
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
      <div>
        {filterByNumericValue.map((t, i) => (
          <div data-testid="filter" key={ i }>
            <span key={ i }>
              { t.columnFilter }
              { t.comparisonFilter }
              { t.valueFilter }
            </span>
            {' '}
            <button
              onClick={ deleteBtn }
              type="button"
              value={ t.columnFilter }
            >
              Delete
            </button>
          </div>
        ))}
        <button
          data-testid="button-remove-filters"
          onClick={ removeAll }
          type="button"
        >
          Delete All
        </button>
      </div>
    </div>
  );
}

export default NumericFilters;
