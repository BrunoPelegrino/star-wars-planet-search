import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import MyContext from './MyContext';
import fetchPlanets from '../service/Api';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [planetName, setPlanetName] = useState({ filterByName: { name } });

  const getPlanets = async () => {
    const response = await fetchPlanets();
    const data = response.results.map((result) => {
      delete result.residents;
      // console.log(result);
      return result;
    }); setPlanets(data);
    // console.log(data[0].name);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const contextValue = {
    planets,
    setPlanets,
    planetName,
    setPlanetName,
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
