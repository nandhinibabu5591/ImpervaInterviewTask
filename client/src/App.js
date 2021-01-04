import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';
import Routes from './lib/routes';

class App extends Component {

  render() {
    return (
      <Router>
        <Suspense fallback={<div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React - Imperva interview task </h1>
          </header>
        </div>}>
          <Switch>
            <Routes />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App;