const meetingController = require('../controller/MeetingController');
const conIntercept = require('../util/ControllerInterceptor');
const mockDAO = require('../util/mocks/MockMeetingDAO');

const fs = require('fs');
const path = require('path');


let adminUser = {
    username: 'billy',
    email:'thekid@hotshot.net',
    password:'something',
    admin:1
};

let normalUser = {
    username: 'jakob',
    email:'dusker@hotspot.net',
    password:'something else',
    admin:0
};

beforeAll(function()
{
    meetingController.setDAO(mockDAO);
});

test('Creating a meeting post while signed in as admin (no images)', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = adminUser;
    
    let testMeeting = 
    {
        date: new Date("February 18, 2023 12:10:00"),
        speaker: "mr. monkey",
        topic: "why bananas are healthy for you",
        location: "the top of a tree in a jungle somewhere",
        content: "in this meeting, we discuss the health benefits of bananas, including their high potassium content."
    };
    
    req.body = testMeeting;
    req.file = null;
    
    await meetingController.saveMeeting(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
        _id: 0,
        date: new Date("February 18, 2023 12:10:00"),
        speaker: "mr. monkey",
        topic: "why bananas are healthy for you",
        location: "the top of a tree in a jungle somewhere",
        content: "in this meeting, we discuss the health benefits of bananas, including their high potassium content.",
        feedback: {
            avgRatings:0,
            numRatings:0,
            reviews:[]}
    });
    
});
test('Creating a meeting post while signed in as admin (images)', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = adminUser;
    
    const file = {
        buffer: Buffer.from('fakeimage', 'utf8'),
        originalname: 'fakeimage.jpg'
      };
    
    req.file = file;
    
    await meetingController.saveMeeting(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    
});




test('Creating a meeting post while signed in as a normal user (no images)', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = normalUser;
    
    let testMeeting = 
    {
        date: new Date("February 18, 2023 12:10:00"),
        speaker: "mr. monkey",
        topic: "why bananas are healthy for you",
        location: "the top of a tree in a jungle somewhere",
        content: "in this meeting, we discuss the health benefits of bananas, including their high potassium content."
    };
    
    req.body = testMeeting;
    req.file = null;
    
    await meetingController.saveMeeting(req, res);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith(null);
    
});

test('Creating a meeting post while not signed in', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    let testMeeting = 
    {
        date: new Date("February 18, 2023 12:10:00"),
        speaker: "mr. monkey",
        topic: "why bananas are healthy for you",
        location: "the top of a tree in a jungle somewhere",
        content: "in this meeting, we discuss the health benefits of bananas, including their high potassium content."
    };
    
    req.body = testMeeting;
    req.file = null;
    
    await meetingController.saveMeeting(req, res);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith(null);
    
});

test('Reading all meetings from the Database', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    
    await meetingController.readAllMeetings(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    
});

test('Reading past meetings from the Database', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    
    await meetingController.readPastMeetings(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    
});

test('Reading future meetings from the Database', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    
    await meetingController.readFutureMeetings(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    
});

test('Reading a valid meeting by its ID', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.params.id = 0;
    
    await meetingController.readMeetingByID(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    
});

test('Reading an invalid meeting by ID', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.params.id = 4;
    
    await meetingController.readMeetingByID(req, res);
    
    expect(res.status).toHaveBeenCalledWith(404);
});

test('Updating a meeting as an admin', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = adminUser;
    
    let testMeeting = 
    {
        _id: 0,
        date: new Date("February 18, 2023 12:10:00"),
        speaker: "mr. monkey",
        topic: "why bananas are healthy for you",
        location: "the top of a tree in a jungle somewhere",
        content: "in this meeting, we discuss the health benefits of bananas, including their high potassium content."
    };
    
    req.body = testMeeting;
    req.file = null;
    
    await meetingController.updateMeeting(req, res);
    
    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.send).toHaveBeenCalledWith({
        _id: 0,
        date: new Date("February 18, 2023 12:10:00"),
        speaker: "mr. monkey",
        topic: "why bananas are healthy for you",
        location: "the top of a tree in a jungle somewhere",
        content: "in this meeting, we discuss the health benefits of bananas, including their high potassium content."
    });
});
test('Updating a meeting as an admin,but throw error', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = adminUser;
    
    let testMeeting = 
    {
        _id: -1,
        date: new Date("February 18, 2023 12:10:00"),
        speaker: "mr. monkey",
        topic: "why bananas are healthy for you",
        location: "the top of a tree in a jungle somewhere",
        content: "in this meeting, we discuss the health benefits of bananas, including their high potassium content."
    };
    
    req.body = testMeeting;
    req.file = null;
    
    await meetingController.updateMeeting(req, res);
    
    expect(res.status).toHaveBeenCalledWith(404);
});



test('Updating a meeting as a non-admin', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = normalUser;
    
    let testMeeting = 
    {
        _id: 0,
        date: new Date("February 18, 2023 12:10:00"),
        speaker: "mr. monkey",
        topic: "why bananas are healthy for you",
        location: "the top of a tree in a jungle somewhere",
        content: "in this meeting, we discuss the health benefits of bananas, including their high potassium content."
    };
    
    req.body = testMeeting;
    req.file = null;
    
    await meetingController.updateMeeting(req, res);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith(null);
});

test('Updating a meeting while not signed in', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    let testMeeting = 
    {
        _id: 0,
        date: new Date("February 18, 2023 12:10:00"),
        speaker: "mr. monkey",
        topic: "why bananas are healthy for you",
        location: "the top of a tree in a jungle somewhere",
        content: "in this meeting, we discuss the health benefits of bananas, including their high potassium content."
    };
    
    req.body = testMeeting;
    req.file = null;
    
    await meetingController.updateMeeting(req, res);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith(null);
});

test('Deleting a valid meeting as an admin', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = adminUser;
    
    req.params.id = 0;
    
    await meetingController.deleteMeeting(req, res);
    
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalledWith(`Meeting with id 0 has been deleted.`);
});

test('Deleting an invalid meeting as an admin', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = adminUser;
    
    req.params.id = 20;
    
    await meetingController.deleteMeeting(req, res);
    
    expect(res.status).toHaveBeenCalledWith(500);
});

test('Deleting meeting as a non-admin', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = normalUser;
    
    req.params.id = 0;
    
    await meetingController.deleteMeeting(req, res);
    
    expect(res.status).toHaveBeenCalledWith(401);
});

test('Deleting meeting while not signed in', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.session.user = null;
    
    req.params.id = 0;
    
    await meetingController.deleteMeeting(req, res);
    
    expect(res.status).toHaveBeenCalledWith(401);
});

test('Searching for meetings with a good query', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.body.search = 'monkey';
    
    await meetingController.searchForMeetings(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
});

test('Searching for meetings with a bad query', async function(){
    let req = conIntercept.mockRequest();
    let res = conIntercept.mockResponse();
    
    req.body.search = 'not monkey';
    
    await meetingController.searchForMeetings(req, res);
    
    expect(res.status).toHaveBeenCalledWith(404);
});