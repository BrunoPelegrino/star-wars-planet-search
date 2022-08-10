import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mock from '../tests/mock'
import userEvent from '@testing-library/user-event';

describe('Testa a pagina do projeto', () => {
  beforeEach(async () => {
    global.fetch = jest.fn(() => Promise.resolve(({
      json: () => Promise.resolve(mock)
    })))
  })

  
  it('Testa a requisiçao da api', () => {
    render(<App />)
    expect(fetch).toHaveBeenCalled();
}, 
  it('Testa o input do header', async () => {
    render(<App />)
    await waitFor (async ()=> await screen.findAllByTestId("planet-name"));
    const inputHeader = screen.getByRole('textbox')
    expect(inputHeader).toBeInTheDocument();
    userEvent.type(inputHeader, 't');
    expect(screen.getAllByTestId("planet-name")[0]).toHaveTextContent(/coruscant/i);    
}, it('Testa o botao filtrar de numeric filter', () => {
    render(<App />)
    const filterBtn = screen.getByRole('button', {  name: /filtrar/i});
    expect(filterBtn).toBeInTheDocument();
    userEvent.click(filterBtn);
    expect(screen.getByText(/populationmaior que0/i)).toBeInTheDocument();
})
)

)});
