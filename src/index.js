import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/css/index.css'
import App from '../src/App'
import { BrowserRouter } from 'react-router-dom';
import Provider from './components/Provider';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <Provider >
      <App />
    </Provider>
  </BrowserRouter>

);


