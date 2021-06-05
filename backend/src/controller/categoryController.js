const { findById } = require('../models/categoryModel');
const Category = require('../models/categoryModel');

const addCategory = async (req, res) => {
    if(req.body){
        const newCategory = new Category(req.body);
        await newCategory.save()
        .then(data => {
            res.status(200).send({ category: data });
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
    }
}

const viewCategories = async (req, res) => {
    await Category.find().populate('vehicleRef', 'code model name')
    .then(data => {
        res.status(200).send({ categories: data });
    })
    .catch(err => {
        res.status(500).send({ error: err.message });
    });
}

const updateCategory = async (req, res) => {
    if(req.body.vehicleRef && req.params.id) {
        
        Category.findByIdAndUpdate(req.params.id,
        { $addToSet: { vehicleRef: { $each: [ req.body.vehicleRef ] } } }
        ).then(data => {
            console.log(data);
            res.status(200).send(data);
        }).catch(err => {
            console.log(err);
        })

    }

}

const viewVehiclesInCategory = async (req, res) => {
    if(req.params.id) {
        const categoryId = req.params.id;

        await Category.findById(categoryId).populate('vehicleRef', 'code model name')
        .then(data => {
            res.status(200).send({ vehicles: data.vehicleRef });
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
    }
}

module.exports = {
    addCategory,
    viewCategories,
    viewVehiclesInCategory,
    updateCategory
}