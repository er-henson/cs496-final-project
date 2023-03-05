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
    
    let savedMeeting = dao.create(newMeeting);
    
    response.status(200);
    response.send(savedMeeting);
}

/*
GET request
read all meetings currently saved in the database
*/
exports.readAllMeetings = async function(request, response)
{
    let allMeetings = dao.readAll();
    console.log(allMeetings);
    response.status(200);
    response.send(allMeetings);

}

/*
GET request
read all meetings that occured in the past
*/
exports.readPastMeeting = async function(request, response)
{
    let pastMeetings = dao.getPastMeetings();
    response.status(200);
    response.send(pastMeetings);
}

/*
GET request
read all meetings that will occur in the future
*/
exports.readPastMeeting = async function(request, response)
{
    let futureMeetings = dao.getUpcomingMeetings();
    response.status(200);
    response.send(futureMeetings);
}