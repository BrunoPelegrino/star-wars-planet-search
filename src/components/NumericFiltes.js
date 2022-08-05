import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

function NumericFilters() {
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const [removeColumnFilter, setremoveColumnFilter] = useState(['population',
    'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [filteredComparison, setFilteredComparison] = useState(['maior que', 'menor que', 'igual a']);
  const [teste, setTeste] = useState([]);
  const { setPlanets, setFilterByNumericValue, planets } = useContext(MyContext);

  const removeColumn = () => {
    const attColumn = removeColumnFilter.filter((column) => column !== columnFilter);
    console.log(attColumn);
    setremoveColumnFilter(attColumn);
    setColumnFilter(attColumn[0]);
  };

  const removeColumn2 = () => {
    const attColumn = removeColumnFilter.filter((column) => column === columnFilter);
    const attColumn3 = filteredComparison.filter((column) => column === comparisonFilter);
    const attColumn2 = valueFilter;
    console.log(attColumn);
    console.log(attColumn2);
    console.log(attColumn3);
    setTeste((prev) => [...prev, [attColumn, attColumn3, attColumn2]]);

    // setremoveColumnFilter(attColumn);
    // setColumnFilter(attColumn[0]);
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
    removeColumn2();
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
        {teste.map((t, i) => (<div key={ i }><p key={ i }>{ t }</p> <button>Delete</button></div>))}
      </div>
    </div>
  );
}

export default NumericFilters;
