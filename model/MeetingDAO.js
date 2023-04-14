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
/*
    the schema's been changed to accept an image buffer.
    the 'data' field is the most important, as that is the part
    that actually has the information for the image. its type
    is a `Buffer,` which is a really long string of Hex digits
    representing a file. this is really the only change in the 
    DAO.
*/

/*
    indexing certain text fields to implement searching
*/
const meetingSchema = new mongoose.Schema(
    {
        date:{ type:Date, default:Date.now },
        speaker: String,
        topic: {
            type:String,
            required:true
        },
        location: String,
        content: {
            type:String,
            required:true
        },
        img: {
            data: Buffer,
            title: String,
            contentType: String
        },
        feedback: {
            avgRating: Number,
            numRatings: Number,
            reviews: [String],
            votes: [{
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                value: {
                    type: Number,
                    enum: [0, 1] // -1 for downvote, 0 for no vote, 1 for upvote
                }
            }]
        }
    });
// creates the index for the text fields
// required to implement searching
meetingSchema.index({
    speaker: "text",
    topic: "text",
    location: "text",
    content: "text"
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
    image - Buffer

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

/*
function to query all meetings that are set to occur after the current date
*/
exports.getUpcomingMeetings = async function()
{
    // get the current time
    let currentDate = new Date();
    // query for dates greater than the current one
    let futureMeetings = await meetingModel.find({date: {$gt: currentDate}}).lean();
    return futureMeetings;
}

exports.deleteMeeting = async function(meetingID)
{
    // delete the meeting by its ID
    await meetingModel.deleteOne({ _id: meetingID }).lean();
}



/*
function to query all meetings created before the current date
*/
exports.getPastMeetings = async function()
{
    // get the current time
    let currentDate = new Date();
    // query for dates less than the current one
    let pastMeetings = await meetingModel.find({date: {$lt: currentDate}}).lean();
    return pastMeetings;
}

/*
function to update a meeting based on its ID
*/
exports.updateMeeting = async function(meetingData)
{
    // find the meeting by its ID
    let editedMeeting = await meetingModel.findOneAndUpdate( {_id: meetingData._id}, meetingData, {returnOriginal: false}).lean();
    return editedMeeting;
}

/*
function to search for a meeting based on the contents of the description and title
*/
exports.searchMeetings = async function(searchQuery)
{
    let searchedMeetings = await meetingModel.find(
        {$text: {
            $search: searchQuery,
            $caseSensitive: false,
            $diacriticSensitive: false
            }
        }
    );
    return searchedMeetings;
}

/*
function to search for a meeting based on date
*/
/*
function to search for a meeting based on the speaker
*/

exports.voteOnMeeting = async function(meetingID, rating, review)
{
    let meeting = await meetingModel.findById(meetingID);
    if (!meeting) {
        throw new Error("Meeting not found");
    }
    if (meeting.feedback) {
        // if the meeting already has feedback, update the average rating and number of ratings
        let numRatings = meeting.feedback.numRatings + 1;
        let avgRating = ((meeting.feedback.avgRating * meeting.feedback.numRatings) + rating) / numRatings;
        let reviews = [...meeting.feedback.reviews, review];
        // update the feedback object in the meeting model
        meeting.feedback = {
            avgRating,
            numRatings,
            reviews
        }
    } else {
        // if the meeting doesn't have feedback yet, create a new feedback object
        meeting.feedback = {
            avgRating: rating,
            numRatings: 1,
            reviews: [review]
        }
    }
    // save the updated meeting to the database
    await meeting.save();
    // return the updated meeting object
    return meeting.toObject();
}
