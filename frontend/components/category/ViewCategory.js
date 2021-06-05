import React, { Component } from 'react';
import axios from 'axios';
import VehicleInCategory from '../vehicle/VehicleInCategory';

export default class ViewCategories extends Component {
    constructor(props) {
        super(props);  
        this.state = {
            categories: []
        }
    }

    componentDidMount() {        
        axios.get('http://localhost:5000/categories/')
        .then(res => {
            this.setState({ categories: res.data.categories });
        })
        .catch(err => console.log(err));       
    }

    render() {
        return(
            <div className="container">
                <h1>Categories</h1>
                {this.state.categories.length > 0 ? this.state.categories.map((item, index) => (
                    <div key={index} className="card mb-3">
                        <h4>{item.category}</h4>
                        <VehicleInCategory categoryId={item._id} />
                    </div>
                )) : ""}
            </div>
        );
    }
}
