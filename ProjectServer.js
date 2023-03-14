// connecting to database
require('dotenv').config();
const dbcon = require('./model/DBConnection');
dbcon.connect('test'); // add 'test' in parenthises to connect to the test DB. remove otherwise

// necessary imports
const express = require('express'); //import express
const morgan = require('morgan'); //import morgan for logging
const session = require('express-session');
const cors = require('cors');
const memorystore = require('memorystore')(session);

const app = express();


const userController = require('./controller/UserController'); // controller for user information
const meetingController = require('./controller/MeetingController'); // controller for meeting/event information

app.use( morgan('dev') );
app.use( express.urlencoded({extended:true}) );
app.use( express.json() );
app.use( cors());

// session settings
app.use(session({
    secret: 'some morally upsetting hypocrisy of uncountably infinite suffering',
    cookie: {maxAge: 86400000, secure:false }, // = 1000*60*60*24 = 24Hours
    store: new memorystore({ checkPeriod:86400000 }),
    resave: true,
    saveUninitialized: true
}));


// setting up localhost
let hostname = "localhost";
let port = 4000;


//operations to interact with the database. functions defined in the controller
// UserController operations
app.post('/saveuser', userController.saveUser);
app.post('/dologin', userController.login);
app.get('/getlogged', userController.getLoggedUser);
app.get('/logout', userController.logout);


// MeetingController operations
app.post('/savemeeting', meetingController.saveMeeting);
app.post('/updatemeeting', meetingController.updateMeeting);
app.get('/allmeetings', meetingController.readAllMeetings);
app.get('/upcomingmeetings', meetingController.readFutureMeetings);
app.get('/meeting/:id', meetingController.readMeetingByID);

const server = app.listen(port, hostname, 
    function()
    {
        console.log(`Server running in ${hostname}:${port}`);
    }
);