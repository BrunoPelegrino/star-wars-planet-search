import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function ColumnSort() {
  const { removeColumnFilter, ordem, setOrdem, saveOrdem, setSaveOrdem } = useContext(MyContext);

  const handleClick = ({ target: { name, value } }) => {
    setOrdem((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <label htmlFor="orderBy">
        Oedenar por:
        <select
          data-testid="column-sort"
          onClick={ handleClick }
        >

          {removeColumnFilter.map((newColumn, i) => (
            <option
              key={ i }
            >
              { newColumn }

            </option>))}
        </select>
      </label>
      <label
        htmlFor="column-sort-input-asc"
      >
        Ascendente
        <input
          type="radio"
          name="sort"
          data-testid="column-sort-input-asc"
          value="ASC"
          onClick={ handleClick }
        />
      </label>
      <label
        htmlFor="column-sort-input-desc"
      >
        Descendente
        <input
          type="radio"
          name="sort"
          data-testid="column-sort-input-desc"
          value="DESC"
          onClick={ handleClick }
        />
      </label>
      <button
        type="submit"
        data-testid="column-sort-button"
        // onClick={ onClickBtn }
      >
        Ordenar
      </button>
    </div>
  );
}

export default ColumnSort;
