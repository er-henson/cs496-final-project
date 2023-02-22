// connecting to database
//require('dotenv').config();
//const dbcon = require('./model/DBConnection');
//dbcon.connect('test'); // add 'test' in parenthises to connect to the test DB. remove otherwise

// necessary imports
const express = require('express'); //import express
const morgan = require('morgan'); //import morgan for logging
const session = require('express-session');
const cors = require('cors');

app = express();


const userController = require('./controller/UserController'); // creating the controller

app.use( morgan('dev') );
app.use( express.urlencoded({extended:true}) );
app.use( express.json() );
app.use( cors() );

// setting up localhost
let hostname = "localhost";
let port = 4000;


//operations to interact with the database. functions defined in the controller
app.post('/newuser', userController.saveUser);


const server = app.listen(port, hostname, 
    function()
    {
        console.log(`Server running in ${hostname}:${port}`);
    }
);