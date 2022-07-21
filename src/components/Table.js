import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { state } = useContext(MyContext);
  console.log(state);

  return (
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
        {state.map((s) => (
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
  );
}

export default Table;
