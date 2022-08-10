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

});
