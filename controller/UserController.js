const dao = require('../model/MeetingDAO');

/*
initial test to see if the server works
*/
exports.saveUser = function(request, response)
{
    console.log(request.body);
    response.status(200);
    response.send( request.body.username );
}
exports.readAll = async function(req, res) {
    const meetings = await dao.readAll();
    res.status(200).json(meetings);
  }
exports.createOne = async function(req, res) {
    const meetings = await dao.create({speaker:'Thomas Edison',topic:'electricity'});
    res.status(200).json(meetings);
  }
exports.createUpcoming = async function(req, res)
  {
    const meetings= await dao.createUpcoming(req);
    res.status(200).json(meetings);
  }