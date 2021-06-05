const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    code: {required: true, type: String},
    model: {required: true, type: String},
    type: {required: true, type: String},
    name: {required: true, type: String},
    costPerDay: {required: true, type: Number},
    categories: [{ required: false, type: mongoose.Types.ObjectId, ref: 'categories'}]
});

const Vehicle = mongoose.model('vehicles', vehicleSchema);
module.exports = Vehicle; 