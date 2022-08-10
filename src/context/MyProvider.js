import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import MyContext from './MyContext';
import fetchPlanets from '../service/Api';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValue,
    setFilterByNumericValue] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [ordem, setOrdem] = useState({ column: 'population',
    sort: 'ASC' });
  const [removeColumnFilter, setremoveColumnFilter] = useState(['population',
    'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  // const [saveOrdem, setSaveOrdem] = useState([]);
  const NEGATIVE = -1;

  const getPlanets = async () => {
    const response = await fetchPlanets();
    const data = response.results.map((result) => {
      delete result.residents;
      // console.log(result);
      return result;
    });
    // https://pt.stackoverflow.com/questions/46600/como-ordenar-uma-array-de-objetos-com-array-sort
    const dataArray = data.map((newDataArray) => newDataArray);
    const sortData = dataArray.sort((a, b) => (a.name < b.name ? NEGATIVE : 1));
    setPlanets(sortData);
    setFiltered(data);
    // setFilterByname(data);
    // console.log(data[0].name);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const contextValue = {
    planets,
    setPlanets,
    filterByName,
    setFilterByName,
    filterByNumericValue,
    setFilterByNumericValue,
    filtered,
    setFiltered,
    ordem,
    setOrdem,
    removeColumnFilter,
    setremoveColumnFilter,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.string,
}.isRequired;

export default Provider;
