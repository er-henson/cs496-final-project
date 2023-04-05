let dao = require('../model/SpeakerDAO');
/*
setting the DAO, for testing purposes
*/
exports.setDAO = function(otherDAO)
{
    dao = otherDAO;
}


exports.readAllSpeakers = async function(request, response)
{
    let allSpeakers = await dao.readAll();
    console.log(allSpeakers);
    response.status(200);
    response.send(allSpeakers);

}
exports.saveSpeaker = async function(request, response)
{
    // assumes the request body gives all variable values individually
    let newSpeaker = 
    {
        name: request.body.name,
        phone: request.body.phone,
        email: request.body.email,
        mailing_address: request.body.mailing_address,
        specialty: request.body.specialty
    };
    
    let savedSpeaker = await dao.create(newSpeaker);
    
    response.status(200);
    response.send(savedSpeaker);
}
exports.updateSpeaker = async function(request, response)
{
    let updatedSpeaker = 
    {
        name: request.body.name,
        phone: request.body.phone,
        email: request.body.email,
        mailing_address: request.body.mailing_address,
        specialty: request.body.specialty
    };
    let returnedSpeaker = await dao.updateSpeaker(updatedSpeaker);
    
    if(returnedSpeaker !== null)
    {
        response.status(202);
        response.send(returnedSpeaker);
    }
    else
    {
        response.status(404);
        response.send(null);
    }
}
exports.readSpeakerByID = async function(request, response)
{
    let speaker = await dao.readByID(request.params.id);
    // if the DAO finds the meeting
    if(speaker !== null)
    {
        response.status(200);
        response.send(speaker);
    }
    else
    {
        response.status(404);
        response.send(null);
    }
}

exports.deleteSpeaker = async function(request, response)
{
    let deletedSpeaker = await dao.deleteSpeakerByID(request.params.id);
    if(deletedSpeaker !== null)
    {
        response.status(202);
        response.send(deletedSpeaker);
    }
    else
    {
        response.status(404);
        response.send(null);
    }
}