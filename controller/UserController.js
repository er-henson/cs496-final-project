//const dao = require('../Model/UserDAO');

/*
initial test to see if the server works
*/
exports.saveUser = function(request, response)
{
    console.log(request.body);
    response.status(200);
    response.send( request.body.username );
}