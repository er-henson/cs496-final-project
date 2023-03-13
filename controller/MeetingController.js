let dao = require('../model/MeetingDAO');
/*
setting the DAO, for testing purposes
*/
exports.setDAO = function(otherDAO)
{
    dao = otherDAO;
}

/*
POST request
save a new meeting to the DAO
*/
exports.saveMeeting = async function(request, response)
{
    // assumes the request body gives all variable values individually
    let newMeeting = 
    {
        date: request.body.date,
        speaker: request.body.speaker,
        topic: request.body.topic,
        location: request.body.location,
        content: request.body.content
    };
    
    let savedMeeting = await dao.create(newMeeting);
    
    response.status(200);
    response.send(savedMeeting);
}

/*
GET request
read all meetings currently saved in the database
*/
exports.readAllMeetings = async function(request, response)
{
    let allMeetings = await dao.readAll();
    console.log(allMeetings);
    response.status(200);
    response.send(allMeetings);

}

/*
GET request
read all meetings that occured in the past
*/
exports.readPastMeetings = async function(request, response)
{
    let pastMeetings = await dao.getPastMeetings();
    response.status(200);
    response.send(pastMeetings);
}

/*
GET request
read all meetings that will occur in the future
*/
exports.readFutureMeetings = async function(request, response)
{
    let futureMeetings = await dao.getUpcomingMeetings();
    console.log(futureMeetings);
    response.status(200);
    response.send(futureMeetings);
}

/*
GET request
get a particular meeting by its ID
*/
exports.readMeetingByID = async function(request, response)
{
    let meeting = await dao.readByID(request.params.id);
    // if the DAO finds the meeting
    if(meeting !== null)
    {
        response.status(200);
        response.send(meeting);
    }
    else
    {
        response.status(404);
        response.send(null);
    }
}

/*
POST request
update the information for a meeting
*/
exports.updateMeeting = async function(request, response)
{
    let updatedMeeting = {
        _id: request.body._id,
        date: request.body.date,
        speaker: request.body.speaker,
        topic: request.body.topic,
        location: request.body.location,
        content: request.body.content
    };
    
}

/*
POST request
delete a meeting
*/
exports.deleteMeeting = async function(request, response)
{
    
}