import React, { Component } from 'react';
import axios from 'axios';

export default class ViewVehicle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicles: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/vehicles/')
        .then(res => {
            this.setState({ vehicles: res.data.vehicles });
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Vehicles</h1>
                {this.state.vehicles.map((item) => (
                    <div key={item._id} className="card mb-3">
                        <div className="card-body">
                        <h4>Vehicle Code: {item.code}</h4>
                        <h4>Vehicle Model: {item.model}</h4>
                        <h4>Vehicle Type: {item.type}</h4>
                        <h4>Vehicle Name: {item.name}</h4>
                        <h4>Cost Per Day: Rs.{item.costPerDay}</h4>
                        <h4>Categories : 
                        {item.categories.map((item) => (
                            <div className="p-3" key={item._id}>
                                {item.category}
                            </div>
                        ))}
                        </h4>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}