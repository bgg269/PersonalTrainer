import React from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import Trainingslist from './components/Trainingslist';
import {BrowserRouter, Switch, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div>
      <Link to="/">Customerlist</Link >{' '}
      <Link to="/trainings">Trainingslist</Link >{' '}
      <Switch>
        <Route exact path="/" component={Customerlist} />
        <Route exact path="/trainings" component={Trainingslist} />
      </Switch>
      </div>
      </BrowserRouter>
      <Customerlist/>
    </div>
  );
}

export default App;
