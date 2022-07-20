import React from 'react';
import './App.css';
import Provider from './context/MyProvider';

function App() {
  return (
    <Provider>
      <span>star wars</span>
    </Provider>
  );
}

export default App;
