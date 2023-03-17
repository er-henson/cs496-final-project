
const mongoose = require('mongoose');


const speakerSchema = new mongoose.Schema(
    {
        name: String,
        phone: String,
        email: String,
        mailing_address: String,
        specialty: String
    });

const speakerModel = mongoose.model('Speaker',speakerSchema);


exports.create = async function(newSpeaker)
{
    // search for potential duplicates first
    let dupeEmail = await speakerModel.find( {name: newSpeaker.name} ).lean();
    // if we find a user who already has the same email, return null
    if(dupeEmail.length > 0)
    {
        return null;
    }
    else // if there are no duplicates, create the user in the DB
    {
        const mongoUser = new speakerModel(newSpeaker);
        await mongoUser.save();
        let dbUser = await speakerModel.findById( mongoUser._id ).lean();
        //console.log(dbUser);
        return dbUser;
    }
}
exports.readAll = async function()
{
    let meetings = await speakerModel.find({}).lean();
    return meetings;
}
