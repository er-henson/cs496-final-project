const dao = require('../model/UserDAO');

/*
setting the DAO, for testing purposes
*/
exports.setDAO = function(otherDAO)
{
    dao = otherDAO;
}


/*
save a user in the database
*/
exports.saveUser = function(request, response)
{
    console.log(request.body);
    
    let newUser = 
    {
        username: request.body.username,
        password: request.body.password,
        email: request.body.email,
        admin:0
    };
    
    // save the user in the DAO
    let savedUser = await dao.create(newUser);
    
    if(returnedUser !== null)
    {
        returnedUser.password = null;
        
        response.status(200);
        response.send( returnedUser );
    }
    else
    {
        response.status(401);
        response.send(null);
    }
}

/*
login as a user
*/