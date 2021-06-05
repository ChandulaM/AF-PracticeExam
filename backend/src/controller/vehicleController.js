const Vehicle = require('../models/vehicleModel');

const addVehicle = async (req, res) => {
    if(req.body) {
        const newVehicle = new Vehicle(req.body);
        
        await newVehicle.save()
        .then(data => {
            res.status(200).send({ vehicle: data });
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
    }
}

const viewAllVehicles = async (req, res) => {
    await Vehicle.find().populate('categories', 'category')
    .then(data => {
        res.status(200).send({ vehicles: data });
    })
    .catch(err => {
        res.status(500).send({ error: err.message });
    });
}

const getVehicleById = async (req, res) => {
    if(req.params.id) {
        await Vehicle.findById(req.params.id)
        .then(data => {
            res.status(200).send({ vehicle: data });
        })
        .catch(err => res.status(500).send({ error: err.message }));
    }
}

module.exports = {
    addVehicle, 
    viewAllVehicles,
    getVehicleById
}