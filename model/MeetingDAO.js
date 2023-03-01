/*
The schema for storing data related to meetings, both past and upcoming
*/

const mongoose = require('mongoose');

/*
important data fields are:
    Date
    Speaker
    Topic
    Location
    Text Content
    Image Content
    Rating
*/
const meetingSchema = new mongoose.Schema(
{
    date:{ type:Date, default:Date.now },
    speaker: String,
    topic: String,
    location: String,
    content: String
});
const meetingModel = mongoose.model('Meeting',meetingSchema);
/*
 function to save a meeting to the database using a JSON object
 assumes the 'meeting' JSON object has:
    date - Date
    speaker - String
    topic - String
    location - String
    content - String

*/

exports.create = async function(meeting)
{
    const mongoMeeting = new meetingModel(meeting);
    await mongoMeeting.save();
    return await exports.readByID(mongoMeeting._id);
}
/*
 function to read all saved meetings from the database
*/
exports.readAll = async function()
{
    let meetings = await meetingModel.find({}).lean();
    return meetings;
}

/*
 function to read a specific meeting by id
*/
exports.readByID = async function(id)
{
    let meeting = await meetingModel.findById(id).lean();
    return meeting;
}

/*
 function to delete all data
 SUPER, SUPER DANGEROUS! Only for testing purposes!
*/
exports.deleteAll = async function()
{
    await meetingModel.deleteMany();
}


exports.getUpcomingMeetings = async function(getUpcomingMeetings)
{
    
}
exports.getMeetingLogs = async function(getMeetingLogs)
{
    
}
