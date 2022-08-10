import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function ColumnSort() {
  const { removeColumnFilter, ordem, setOrdem,
    filtered, setPlanets } = useContext(MyContext);

  const handleClick = ({ target: { name, value } }) => {
    setOrdem((prevState) => ({ ...prevState, [name]: value }));
  };

  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY
  const ascOrder = (a, b, col) => {
    if (a[col] === 'unknown') {
      return Number.POSITIVE_INFINITY;
    }
    return Number(a[col]) - Number(b[col]);
  };
  const descOrder = (a, b, col) => {
    if (b[col] === 'unknown') {
      return Number.NEGATIVE_INFINITY;
    }
    return Number(b[col]) - Number(a[col]);
  };

  const onClickBtn = () => {
    // console.log(ordem.sort);
    if (ordem.sort === 'ASC') {
      const aaa = filtered.sort((a, b) => ascOrder(a, b, ordem.column));
      setPlanets(aaa);
    }
    if (ordem.sort === 'DESC') {
      const ll = filtered.sort((a, b) => descOrder(a, b, ordem.column));
      setPlanets(ll);
    }
  };

  return (
    <div>
      <label htmlFor="column-sort">
        Ordenar por:
        <select
          name="column"
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
        type="button"
        data-testid="column-sort-button"
        onClick={ onClickBtn }
      >
        Ordenar
      </button>
    </div>
  );
}

export default ColumnSort;
