import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { StateProvider } from "./context/StateProvider";
import reducer, { initialState } from './context/reducer'

ReactDOM.render(
  <StateProvider reducer={reducer} initialState={initialState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StateProvider>,
  document.getElementById('root')
);
