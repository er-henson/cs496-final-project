// connecting to database
require('dotenv').config(); // for the values from the .env file
const dbcon = require('./model/DBConnection'); // for connecting to the database
dbcon.connect('test'); // add 'test' in parenthises to connect to the test DB. remove otherwise

// necessary imports
const express = require('express'); // main server application
const morgan = require('morgan'); //import morgan for logging
const session = require('express-session'); // for session management
const cors = require('cors'); // for validation (i think?). prevents errors/blocks between the server and frontend.
const MongoDBStore = require('connect-mongodb-session')(session); // for session storage
const multer = require('multer'); // for image/file uploads

const app = express();

// cors options
app.use( cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,DELETE',
    credentials: true
}));

// for storing sessions in mongoDB
const mongoDBstore = new MongoDBStore({
    uri: process.env.TESTDB_URI,
    collection: 'sessions'
});




let maxFileSize = 8 * 1024 * 1024; // max file size in bytes. should be 8MB
// stores files from multer in a nearby directory. commented out, as it is not necessary.
/*
const storage = multer.diskStorage({
    destination: './image_uploads',
    filename: function(req, file, cb){
        console.log(file);
        cb(null, `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`);
    }
});
*/

// Store file data in memory directly. dangerous with very large files.
const storage = multer.memoryStorage();

/*
    creating the actual instance of multer that the server will use,
    which i have called 'upload.'
    
    it is REALLY IMPORTANT that we do NOT use 'app.use(upload)' or 'app.use(multer),'
    as that will attach multer to every request which is really dangerous since it allows
    malicious users to send files through routes the server does not anticipate which
    is bad for a lot of reasons.
    
    the only necessary piece (i think) is the storage element. i placed the file size
    limit because i didn't know how MongoDB would handle huge files (i think the limit
    is about 16mb without GridFS).
*/
const upload = multer({
    storage: storage,
    limits: {fileSize: maxFileSize}
});



// importing controllers
const userController = require('./controller/UserController'); // controller for user information
const meetingController = require('./controller/MeetingController'); // controller for meeting/event information
const speakerController = require('./controller/SpeakerController'); // controller for speaker information
const newsController = require('./controller/NewsController'); // controller for news updates and information


// setting up the server with important modules
app.use( morgan('dev') );
app.use( express.urlencoded({extended:true}) );
app.use( express.json() );


// session settings
const COOKIE_AGE = 1000 * 60 * 60 * 24; // 24 hours
app.use(session({
    secret: 'some morally upsetting hypocrisy of uncountably infinite suffering',
    name: 'session-id', // name of the cookie, how it will be read from the client
    cookie: {
        maxAge: COOKIE_AGE,
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
app.post('/updateuser', userController.saveUser);
app.post('/dologin', userController.login);
app.get('/getlogged', userController.getLoggedUser);
app.get('/logout', userController.logout);


// MeetingController operations
/*
    this function is modified to upload an image to the DAO via the controller
    note the second parameter is the `upload.single`, which is telling the server
    to attach the instance of Multer created earlier to this route. 
    
    also note `meetingImage` is the exact same as the fieldname from the frontend. check
    `CreateMeeting.js,` specifically the line that says `newMeeting.append('meetingImage', image);`
    it is VERY important that these are both the same or else multer will throw a vague error
    and it will be very hard to debug.
*/
app.post('/savemeeting', upload.single('meetingImage'), meetingController.saveMeeting);
app.post('/updatemeeting', upload.single('meetingImage'), meetingController.updateMeeting);
app.delete('/meeting/:id', meetingController.deleteMeeting);
app.get('/allmeetings', meetingController.readAllMeetings);
app.get('/upcomingmeetings', meetingController.readFutureMeetings);
app.get('/meeting/:id', meetingController.readMeetingByID);
app.get('/pastmeetings',meetingController.readPastMeetings)


// SpeakingController operations
app.post('/savespeaker', speakerController.saveSpeaker);
app.get('/allspeakers', speakerController.readAllSpeakers);
app.post('/editspeaker', speakerController.updateSpeaker);
app.get('/speaker/:id', speakerController.readSpeakerByID);
app.delete('/speaker/:id', speakerController.deleteSpeaker);

// NewsController operations
app.post('/savenewspost', upload.array('newsImages', 10), newsController.saveNewsPost);
app.get('/getnews', newsController.readAllNews);
app.post('/updatenewspost', upload.array('newsImages', 10), newsController.updateNewsPost);
app.post('/deletemeeting/:id', newsController.deleteNewsPost);
//app.get('/news/:id', newsController.findPostByID)


const server = app.listen(port, hostname, 
    function()
    {
        console.log(`Server running in ${hostname}:${port}`);
    }
);