const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const categoryRoutes = require('./src/routes/categoryRoutes');
const vehicleRoutes = require('./src/routes/vehicleRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, err => {
    if(err){
        console.log("Database error: " + err);
    }
});

mongoose.connection.once('open', () => {
    console.log("Database connected");
})

app.use('/categories', categoryRoutes);
app.use('/vehicles', vehicleRoutes);

app.listen(5000, () => {
    console.log(`Listening on port 5000`);
});

