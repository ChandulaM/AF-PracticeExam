import React, { Component } from 'react';
import axios from 'axios';

export default class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            category: ""
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        let newCategory =  { 
            category: this.state.category
        }
        console.log(newCategory);
        axios.post('http://localhost:5000/categories/add', newCategory)
        .then(response => { 
            console.log(response);
            alert('Category added!');
        })
        .catch(error => {
            alert('Error');
            console.log(error.message);
    });
    }

    render(){
        return (
            <div className="container">
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="category">Category Name</label>
                    <input type="text" className="form-control" id="category" name="category" value={this.state.category} onChange={this.onChange} />                    
                </div>
      
                <button type="submit" className="btn btn-primary">Add Category</button>
            </form>
        </div>

        );
    }
}