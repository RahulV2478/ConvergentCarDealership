// src/App.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import CarSort from './pages/CarSort';
import CarDetail from './pages/CarDetail';
import AddCar from './pages/AddCar';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          {/* Landing on Auth Page by default */}
          <Route exact path="/" component={AuthPage} />
          {/* Redirect to CarSort after login */}
          <Route path="/home" component={CarSort} />
          <Route path="/car/:id" component={CarDetail} />
          <Route path="/add-car" component={AddCar} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
