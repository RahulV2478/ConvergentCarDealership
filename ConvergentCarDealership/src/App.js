// src/App.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CarList from './pages/CarList';
import CarSort from './pages/CarSort';
import CarDetail from './pages/CarDetail';
import AddCar from './pages/AddCar'; // Optional: If you have an AddCar page
import Navbar from './components/Navbar'; // Optional: If you have a Navbar

function App() {
  return (
    <Router>
      <div>
        {/* Reintroduce Navbar */}
        <Navbar />

        {/* Define Routes */}
        <Switch>
          <Route exact path="/" component={CarList} />
          <Route path="/cars/sort" component={CarSort} />
          <Route path="/car/:id" component={CarDetail} />
          <Route path="/add-car" component={AddCar} /> {/* Optional Route */}
          {/* Add more routes as needed */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
