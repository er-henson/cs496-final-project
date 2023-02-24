const dao = require('../model/UserDAO');
const passUtil = require('../util/PasswordUtil');
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
        password: passUtil.hashPassword(request.body.password),
        email: request.body.email,
        admin:0
    };
    
    // save the user in the DAO
    let savedUser = await dao.create(newUser);
    // if the return is not null, the user is created
    if(returnedUser !== null)
    {        
        response.status(200);
    }
    else // if the return is null, there is a user with the existing email
    {
        response.status(401);
    }
    // TODO - page redirects in react
    response.end();
}

/*
login as a user
*/
exports.login = function(request, response)
{
    let email = request.body.email;
    let pw = passUtil.hashPassword(request.body.password);
    
    let user = await dao.login(email, pw);
    
    if(user !== null) // successful login
    {
        user.password = null; // set password to null for security
        request.session.user = user;
        response.status(200);
    }
    else // incorrect login
    {
        response.status(404);
    }
    // TODO - page redirects in react
    response.end();
}