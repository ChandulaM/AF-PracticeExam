import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/Nabar';
import AddCategory from './components/category/AddCategory';
import AddVehicle from './components/vehicle/AddVehicle';
import ViewCategories from './components/category/ViewCategory';
import ViewVehicle from './components/vehicle/VIewVehicles';
import CalculateTotal from './components/category/CalculateCharge';

function App() {

    return(
        <Router>
            <Navbar />
            <Route exact path="/create-category" component={AddCategory}></Route>
            <Route exact path="/create-vehicle" component={AddVehicle}></Route>
            <Route exact path="/view-categories" component={ViewCategories}></Route>
            <Route exact path="/view-vehicles" component={ViewVehicle}></Route>
            <Route exact path="/view-vehicles/calculate-charge/:id" component={CalculateTotal}></Route>
            <Route exact path="/"></Route>
        </Router>
    );

}

export default App;