import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import App from '../App';
import mock from '../tests/mock'
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Testa a pagina do projeto', () => {
  beforeEach(async () => {
    global.fetch = jest.fn(() => Promise.resolve(({
      json: () => Promise.resolve(mock)
    })))
  })

  
  it('Testa a requisiçao da api', () => {
    render(<App />)
    expect(fetch).toHaveBeenCalled();
}); 
  it('Testa o input do header', async () => {
    render(<App />);
    await waitFor (async ()=> await screen.findAllByTestId("planet-name"));
    const inputHeader = screen.getByRole('textbox')
    expect(inputHeader).toBeInTheDocument();
    userEvent.type(inputHeader, 't');
    expect(screen.getAllByTestId("planet-name")[0]).toHaveTextContent(/coruscant/i);    
}); it('Testa o botao deleteAll', async () => {
  render(<App />);
  const filterBtn = screen.getByRole('button', {  name: /filtrar/i});
  const deleteBtn = screen.getByRole('button', {  name: /delete all/i});
  userEvent.click(filterBtn);
  const filteredDiv = screen.getByTestId('filter');
  userEvent.click(deleteBtn);
  await waitFor(async () => expect(filteredDiv).not.toBeInTheDocument() ,{timeout: 1000} );
  
});

it('Testa o botao filter maior', async () => {
  render(<App />)

  await waitFor (async ()=> await screen.findAllByTestId("planet-name"));
    const column = screen.getByTestId("column-filter");
    const value = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
    const comparison = screen.getByTestId('comparison-filter');
    

    userEvent.selectOptions(column, 'population' );
    userEvent.selectOptions(comparison, 'maior que');
    userEvent.type(value, '4500000000');
    userEvent.click(filterBtn);

    expect(screen.getAllByTestId("planet-name")[0]).toHaveTextContent(/coruscant/i);
});

 it('Testa botão filter igual', async () => {
    render(<App />)
    await waitFor (async ()=> await screen.findAllByTestId("planet-name"));
    const column = screen.getByTestId("column-filter");
    const value = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
    const comparison = screen.getByTestId('comparison-filter');
    

    userEvent.selectOptions(column, 'population' );
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.type(value, '1000');
    userEvent.click(filterBtn);

    expect(screen.getAllByTestId("planet-name")[0]).toHaveTextContent(/yavin iv/i);

    const btn = screen.getByRole('button', {  name: /x/i})
    userEvent.click(btn);
    expect(screen.getAllByTestId("planet-name")).toHaveLength(10);
    
  });

  it('Testa botão filter menor', async () => {
    render(<App />)
    await waitFor (async ()=> await screen.findAllByTestId("planet-name"));
    const column = screen.getByTestId("column-filter");
    const value = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
    const comparison = screen.getByTestId('comparison-filter');
    

    userEvent.selectOptions(column, 'population' );
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.type(value, '200000');
    userEvent.click(filterBtn);

    expect(screen.getAllByTestId("planet-name")[0]).toHaveTextContent(/yavin iv/i);
    
  });
  it('Testa botão de deletar filtro', async () => {
    await act(async () => {
      render(<App />);
    });
    await waitFor (async ()=> await screen.findAllByTestId("planet-name"));
    const column = screen.getByTestId("column-filter");
    const value = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
    const comparison = screen.getByTestId('comparison-filter');

    userEvent.selectOptions(column, 'population' );
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.type(value, '200000');
    userEvent.click(filterBtn);
    const filteredDiv = screen.getByTestId('filter');
    // const btn = await waitFor (async ()=> screen.findAllByRole('button', {  name: /x/i}), {timeout: 2000});
    const btn = screen.getByRole('button', {  name: /x/i})
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
    expect(filteredDiv).not.toBeInTheDocument();
    
    
  });

  it('Testa se ao deletar filtro tabela atualiza', async () => {
    await act(async () => {
      render(<App />);
    });
    await waitFor (async ()=> await screen.findAllByTestId("planet-name"));
    const column = screen.getByTestId("column-filter");
    const value = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
    const comparison = screen.getByTestId('comparison-filter');

    userEvent.selectOptions(column, 'diameter' );
    userEvent.selectOptions(comparison, 'maior que');
    userEvent.type(value, '8900');
    userEvent.click(filterBtn);

    userEvent.selectOptions(column, 'population' );
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.type(value, '1000000');
    userEvent.click(filterBtn);

    const filteredDiv = screen.getAllByTestId('filter');
    expect(filteredDiv).toHaveLength(2);

    const btn = screen.getAllByRole('button', {  name: /x/i})
    expect(btn).toHaveLength(2);
    userEvent.click(btn[1]);
    expect(screen.getAllByTestId("planet-name")).toHaveLength(7);
    
  });

  it('Testa se ao deletar filtro tabela atualiza', async () => {
    await act(async () => {
      render(<App />);
    });
    await waitFor (async ()=> await screen.findAllByTestId("planet-name"));
    const column = screen.getByTestId("column-filter");
    const value = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
    const comparison = screen.getByTestId('comparison-filter');
    
    userEvent.selectOptions(column, 'rotation_period' );
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.type(value, '24');
    userEvent.click(filterBtn);

    userEvent.selectOptions(column, 'diameter' );
    userEvent.selectOptions(comparison, 'maior que');
    userEvent.type(value, '10200');
    userEvent.click(filterBtn);


    const filteredDiv = screen.getAllByTestId('filter');
    expect(filteredDiv).toHaveLength(2);

    const btn = screen.getAllByRole('button', {  name: /x/i})
    expect(btn).toHaveLength(2);
    userEvent.click(btn[1]);
    expect(screen.getAllByTestId("planet-name")).toHaveLength(3);
    
  });


  it('Testa a ordem ASC', async () => {
    render(<App />);
    const SELECT_COLUMN = screen.getByTestId("column-sort");
    const INPUT_ASC = screen.getByTestId("column-sort-input-asc");

    userEvent.selectOptions(SELECT_COLUMN, 'rotation_period' );
    userEvent.selectOptions(SELECT_COLUMN, 'population' );
    userEvent.click(INPUT_ASC);

    const BTN_ORDER = screen.getByRole('button', {name: /ordenar/i});
    userEvent.click(BTN_ORDER);
  });
  it('Testa a ordem DESC', async () => {
    render(<App />);
    const SELECT_COLUMN = screen.getByTestId("column-sort");
    const INPUT_DESC = screen.getByTestId("column-sort-input-desc");

    userEvent.selectOptions(SELECT_COLUMN, 'rotation_period' );
    userEvent.selectOptions(SELECT_COLUMN, 'population' );
    userEvent.click(INPUT_DESC);

    const BTN_ORDER = screen.getByRole('button', {name: /ordenar/i});
    userEvent.click(BTN_ORDER);
  });

  it('Testa order filters',async()=>{
    render(<App/>);
    const COLUMN_SORT = 'column-sort';
    const ASC_ORDER = 'column-sort-input-asc';
    const DESC_ORDER = 'column-sort-input-desc';
    const BUTTON_SORT = 'column-sort-button';

    await waitFor (async ()=> await screen.findAllByTestId("planet-name"), { timeout:500});

    userEvent.selectOptions(screen.getByTestId(COLUMN_SORT), ['population']);
    userEvent.click(screen.getByTestId(ASC_ORDER));
    userEvent.click(screen.getByTestId(BUTTON_SORT));

    await waitFor (async ()=> await screen.findAllByTestId("planet-name"), { timeout:500});



    userEvent.selectOptions(screen.getByTestId(COLUMN_SORT), ['population']);
    userEvent.click(screen.getByTestId(DESC_ORDER));
    userEvent.click(screen.getByTestId(BUTTON_SORT));

    await waitFor (async ()=> await screen.findAllByTestId("planet-name"), { timeout:500});

    
  }); 
});
