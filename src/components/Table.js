import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import MyContext from '../context/MyContext';

function Table({ filterByName }) {
  const { planets, setPlanets, planetName, setPlanetName } = useContext(MyContext);

  const handleChange = ({ target }) => {
    // (loweCase) https://stackoverflow.com/questions/44469548/es6-filter-data-with-case-insensitive-term
    const { name, value } = target;
    setPlanetName({ [name]: { name: value } });
    const teste = planets.filter((letter) => letter.name.toLowerCase()
      .includes(value.toLowerCase()));
      console.log(planets);
    setPlanets(teste);
  };

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        name="filterByName"
        value={ filterByName }
        onChange={ handleChange }
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surfae Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((s) => (
            <tr key={ s.name }>
              <td>{s.name}</td>
              <td>{s.rotation_period}</td>
              <td>{s.orbital_period}</td>
              <td>{s.diameter}</td>
              <td>{s.climate}</td>
              <td>{s.gravity}</td>
              <td>{s.terrain}</td>
              <td>{s.surface_water}</td>
              <td>{s.population}</td>
              <td>{s.films}</td>
              <td>{s.created}</td>
              <td>{s.edited}</td>
              <td>{s.url}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  filterByName: PropTypes.string,
}.isRequired;

export default Table;
