import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './pages/home';
import About from './pages/about';
import ExchangeRates from './pages/exchange-rates';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/exchange-rates">
          <li>Exchange rates</li>
        </Link>
      </nav>
      <Route path="/" exact component={Home} />
      <Route path="/about" exact component={About} />
      <Route path="/exchange-rates" exact component={ExchangeRates} />
    </Router>
  );
}

export default App;
