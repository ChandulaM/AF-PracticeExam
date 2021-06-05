const express = require('express');
const {
    addVehicle, viewAllVehicles, getVehicleById
} = require('../controller/vehicleController');

const router = express.Router();

router.post('/add', addVehicle);
router.get('/', viewAllVehicles);
router.get('/:id', getVehicleById);

module.exports = router;