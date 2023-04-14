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
    /*
        here is how the controller handles the image file. note that the
        request now has a new attribute, 'request.file.' you can `console.log`
        the `request.file` to see all of the fields. the important one is
        `request.file.buffer,` which contains the actual data for the image.
        
        note that trying to console log `request.file.buffer` will print out
        a Looooooooong string of Hex digits.
        
        check the MeetingDAO.js to see how mongoose works with this to store it
        on the database
    */
    
    let newMeeting = 
    {
        date: request.body.date,
        speaker: request.body.speaker,
        topic: request.body.topic,
        location: request.body.location,
        content: request.body.content,
        // setting up empty fields for feedback
        feedback: {
            avgRatings:0,
            numRatings:0,
            reviews:[]}
    };
    
    if(request.file)
    {
        let fileImage = {
            data: request.file.buffer,
            title:request.file.originalname,
            contentType:'image/jpeg'
        }
        newMeeting.img = fileImage;
    }
    
    let savedMeeting = await dao.create(newMeeting);
    
    response.status(200);
    response.send(savedMeeting);
}

/*
GET request
read all meetings currently saved in the database

get requests do not change with images, thankfully.
*/
exports.readAllMeetings = async function(request, response)
{
    let allMeetings = await dao.readAll();
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
    
    let returnedMeeting = await dao.updateMeeting(updatedMeeting);
    
    if(returnedMeeting !== null)
    {
        response.status(202);
        response.send(returnedMeeting);
    }
    else
    {
        response.status(404);
        response.send(null);
    }
}

/*
POST request
delete a meeting by its ID
*/

exports.deleteMeeting = async function(request, response) {
    const meetingID = request.params.id;

    try {
        // Find the meeting by its ID and delete it
        await dao.deleteMeeting(meetingID);
        
        response.status(204);
        response.send(`Meeting with id ${meetingID} has been deleted.`);
    } catch (error) {
        response.status(500);
        response.send({ error: error.message });
    }
}

/*
POST request
add a rating to a meeting
assumes the rating is on a 1-5 scale and checks if there is a review as well
*/

/*
GET request
performs a search query on data through text search of the indexed fields
*/
exports.searchForMeetings = async function(request, response){
    let meetingSearch = request.body.search;
    
    let returnedMeetings = await dao.searchMeetings(meetingSearch);
    
    if(returnedMeetings && returnedMeetings.length > 0)
    {
        response.status(200);
        response.send(returnedMeetings);
    }
    else{
        reseponse.status(404);
        response.send(null);
    }
}