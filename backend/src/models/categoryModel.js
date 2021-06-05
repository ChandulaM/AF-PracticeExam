const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category: { type: String, required: true },
    vehicleRef: [{
        type: mongoose.Types.ObjectId,
        required: false,
        ref: 'vehicles'
    }]
});

const Category = mongoose.model('categories', categorySchema);
module.exports = Category;