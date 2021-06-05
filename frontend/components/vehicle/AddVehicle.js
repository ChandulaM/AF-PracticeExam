import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';

export default class AddVehicle extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCategorySelection = this.onCategorySelection.bind(this);
        this.state = {
            code: "",
            model: "",
            type: "",
            name: "",
            costPerDay: 0,
            categories: [],
            options: [],
            selectedCategories: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/categories/')
        .then(res => {
            this.setState({ categories: res.data.categories }, () => {
                let data = [];
                this.state.categories.map((item, index) => {
                    let category = {
                        value: item._id,
                        label: item.category
                    }
                    data.push(category);
                });
                this.setState({ options: data });
            });
        });
        
    }

    onChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        
        let newVehicle = {
            code: this.state.code,
            model: this.state.model,
            type: this.state.type,
            name: this.state.name,
            costPerDay: this.state.costPerDay,
            categories: this.state.selectedCategories
        }

        axios.post('http://localhost:5000/vehicles/add', newVehicle)
        .then(res => {
            alert('Vehicle added');
            console.log(res.data);
            console.log(newVehicle.categories);
            newVehicle.categories.forEach(category => {
                axios.patch(`http://localhost:5000/categories/${category}`, {
                    vehicleRef: res.data.vehicle._id
                });
            });
            
        })
        .catch(error => {
            alert('Error!');
            console.log(error.message);
        });        
    }

    onCategorySelection(e) {
        this.setState({ selectedCategories: e ? e.map(item => item.value) : [] })
    }

    render() {
        return (
            <div className="container">
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="code">Vehicle Code</label>
                    <input type="text" className="form-control" id="code" name="code" 
                    value={this.state.code} 
                    onChange={this.onChange} />                    
                </div>
                <div className="form-group">
                    <label htmlFor="model">Vehicle Model</label>
                    <input type="text" className="form-control" id="model" name="model" 
                    value={this.state.model} 
                    onChange={this.onChange} />                    
                </div>
                <div className="form-group">
                    <label htmlFor="type">Vehicle Type</label>
                    <input type="text" className="form-control" id="type" name="type" 
                    value={this.state.type} 
                    onChange={this.onChange} />                    
                </div>
                <div className="form-group">
                    <label htmlFor="name">Vehicle Name</label>
                    <input type="text" className="form-control" id="name" name="name" 
                    value={this.state.name} 
                    onChange={this.onChange} />                    
                </div>
                <div className="form-group">
                    <label htmlFor="costPerDay">Cost Per Day</label>
                    <input type="text" className="form-control" id="costPerDay" name="costPerDay" 
                    value={this.state.costPerDay} 
                    onChange={this.onChange} />                    
                </div>
                <div className="form-group">
                    <label htmlFor="options">Vehicle Category</label>
                    <Select 
                        options={this.state.options}
                        onChange={this.onCategorySelection}
                        className="basic-multi-select"
                        isMulti
                    />              
                </div>
      
                <button type="submit" className="btn btn-primary">Add Vehicle</button>
            </form>
        </div>

        );
    }
}
