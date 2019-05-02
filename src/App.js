import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './pages/home';
import About from './pages/about';
import ExchangeRates from './pages/exchange-rates';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <main className={styles.content}>
          <h1>Exchange Rates</h1>
          <nav className={styles.nav}>
            <ul>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/about">
                <li>About</li>
              </Link>
              <Link to="/exchange-rates">
                <li>Exchange rates</li>
              </Link>
            </ul>
          </nav>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/exchange-rates" exact component={ExchangeRates} />
        </main>
      </div>
    </Router>
  );
}

export default App;
