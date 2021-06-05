const express = require('express');
const {
    addCategory, viewCategories, viewVehiclesInCategory, updateCategory
} = require('../controller/categoryController');

const router = express.Router();

router.post('/add', addCategory);
router.get('/', viewCategories);
router.get('/:id', viewVehiclesInCategory);
router.patch('/:id', updateCategory);

module.exports = router;