//Declare packages
require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');

var app = express();

// Support encoded bodies
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(logger('dev'));

// MongoDB Atlas
// Account created using temp email, no sensitive information
mongoose.connect('mongodb+srv://demo:test123@cluster0.mypw4.mongodb.net/test?retryWrites=true&w=majority',  { useNewUrlParser: true })

const quotationRoutes = require('./routes/quotation.route')

// Routing
app.use('/quotation', quotationRoutes)

const port = 4000
app.listen(port, function () {
    console.log("Server is running on Port: " + port);
});

module.exports = app

