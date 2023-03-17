let dao = require('../model/SpeakerDAO');

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