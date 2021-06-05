import React, { Component } from 'react';
import axios from 'axios';

export default class CalculateTotal extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            duration: 0,
            total: 0,
            vehicle: {}
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        axios.get(`http://localhost:5000/vehicles/${this.props.match.params.id}`)
        .then(res => {
            this.setState({ vehicle: res.data.vehicle });
            console.log(this.state.vehicle);
        }).catch(err => {
            console.log(err);
        });
    }

    onChange(e) {
        this.setState({ duration: e.target.value }, () => {
            const tripCharge = this.state.vehicle.costPerDay * this.state.duration;
            this.setState({ total: tripCharge });
        });        
    }

    com

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5>Vehicle Code: {this.state.vehicle.code}</h5>
                    <h5>Vehicle: {this.state.vehicle.model} {this.state.vehicle.name}</h5>
                    <h5>Reantal per Day: Rs.{this.state.vehicle.costPerDay}</h5>
                    <div className="form-group">
                        <label htmlFor="duration">Enter rental duration</label>
                        <input type="number" className="form-control" id="duration" name="duration" 
                        value={this.state.duration} 
                        onChange={this.onChange} />                    
                    </div>
                    <div className="form-group">
                        <label htmlFor="total">Total</label>
                        <input type="number" className="form-control" id="total" name="total"
                        readOnly 
                        value={this.state.total} />                    
                    </div>
                </div>
            </div>
        );
    }
}