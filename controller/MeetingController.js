/*
The schema for storing data related to meetings, both past and upcoming
*/
const f = function getCurrentDate(){

    let newDate = new Date()
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hours = newDate.getHours()
    let minutes = newDate.getMinutes()
    return `${month<10?`0${month}`:`${month}`}${'/'}${day}${'/'}${year}${" "}${hours}${":"}${minutes}`
  }

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
exports.getUpcomingMeetings = async function(getUpcomingMeetings){
    
}
exports.getMeetingLogs = async function(getMeetingLogs){
    
}
