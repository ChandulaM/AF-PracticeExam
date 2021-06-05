import React, { Component } from 'react';
import axios from 'axios';

export default class VehicleInCategory extends Component {
    constructor(props) {
        super(props);
        this.calculatTripCharge = this.calculatTripCharge.bind(this);
        this.state = {
            vehicles: [],
        }
    }

    componentDidMount() {
    axios.get(`http://localhost:5000/categories/${this.props.categoryId}`)
        .then(res => {
            this.setState({ vehicles: res.data.vehicles });
        });
    }

    calculatTripCharge(e, vehicleId) {
        window.location = `/view-vehicles/calculate-charge/${vehicleId}`;
    }

    render() {        

        return (
            <div className="card">
                {this.state.vehicles.map( (item) => (
                <div className="card" key={item._id}>
                    <div className="card-body"> 
                        <h5>Code: {item.code}</h5>
                        <h5>Vehicle Model: {item.model}</h5>
                        <h5>Vehicle Name: {item.name}</h5>
                        <button className="btn btn-primary" onClick={(e)=> {
                            this.calculatTripCharge(e, item._id);
                        }}>Select</button>
                    </div>
                </div>
                ))}            
 
        </div>
        );
    }
}