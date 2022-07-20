import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import MyContext from './MyContext';
import fetchPlanets from '../service/Api';

const Provider = ({ children }) => {
  const [state, setState] = useState([]);

  const planets = async () => {
    const response = await fetchPlanets();
    const data = response.results.map((result) => {
      delete result.residents;
      // console.log(result);
      return result;
    }); setState(data);
    // console.log(data[0].name);
  };

  useEffect(() => {
    planets();
  }, []);

  return (
    <MyContext.Provider value={ state }>
      {children}
    </MyContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.string,
}.isRequired;

export default Provider;
