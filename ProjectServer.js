// connecting to database
require('dotenv').config();
const dbcon = require('./model/DBConnection');
dbcon.connect('test'); // add 'test' in parenthises to connect to the test DB. remove otherwise

// necessary imports
const express = require('express'); //import express
const morgan = require('morgan'); //import morgan for logging
const session = require('express-session');
const cors = require('cors');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();
const COOKIE_AGE = 1000 * 60 * 60 * 24; // 24 hours

// for storing sessions in mongoDB
const mongoDBstore = new MongoDBStore({
    uri: process.env.TESTDB_URI,
    collection: 'sessions'
});

const userController = require('./controller/UserController'); // controller for user information
const meetingController = require('./controller/MeetingController'); // controller for meeting/event information
const speakerController = require('./controller/SpeakerController'); // controller for speaker information

app.use( morgan('dev') );
app.use( express.urlencoded({extended:true}) );
app.use( express.json() );

// cors options
app.use( cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST',
    credentials: true
}));

// session settings
app.use(session({
    secret: 'some morally upsetting hypocrisy of uncountably infinite suffering',
    name: 'session-id', // name of the cookie, how it will be read from the client
    cookie: {maxAge: COOKIE_AGE,
        secure:false,
        sameSite: false},
    store: mongoDBstore,
    resave: true,
    saveUninitialized: false
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
app.get('/pastmeetings',meetingController.readPastMeetings)

// SpeakingController operations
app.post('/savespeaker', speakerController.saveSpeaker);
app.get('/allspeakers', speakerController.readAllSpeakers);
app.post('/EditSpeaker', speakerController.updateSpeaker);
app.get('/speaker/:id', speakerController.readSpeakerByID);


const server = app.listen(port, hostname, 
    function()
    {
        console.log(`Server running in ${hostname}:${port}`);
    }
);