import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import  './components/css/card.css'
import './components/css/buttons.css'
import './components/css/africa.css'
import './components/css/about.css'
import './components/css/countryPanel.css'
import './components/css/countryPage.css'
import './components/css/userPanel.css'
import './components/css/paralax.css'
import App from './App';
import { DAppProvider, Rinkeby } from '@usedapp/core';
import reportWebVitals from './reportWebVitals';

//pages
import About from'./pages/About'
import Map from './pages/Map'
import FaQ from './pages/Faq'
import Countries from'./pages/Countries'
import CountryPage from'./pages/CountryPage'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <DAppProvider config={{networks: [Rinkeby]}}>
  <Router>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/countries" element={<Countries />}/>
      <Route path="/map" element={<Map />}/>
      <Route path="/faq" element={<FaQ />}/>

      <Route path="/country" element={<CountryPage />}/>
    </Routes>
  </Router>
  </DAppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
