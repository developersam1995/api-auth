const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/APIAuthentication');

const app = express();


//Middlewear
app.use(morgan('dev'));
app.use(bodyParser.json());


//routes
app.use('/users',require('./routes/users'));

//start server

const port = 3000;
app.listen(port,()=>{
  console.log(`server listening at ${port}`);
});
