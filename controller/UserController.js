let dao = require('../model/UserDAO');
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
exports.saveUser = async function(request, response)
{
    
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
    if(savedUser !== null)
    {        
        response.status(200);
        response.end();
    }
    else // if the return is null, there is a user with the existing email
    {
        response.status(401);
        response.send( {msg: 'User with that email already exists'} );
        response.end();
    }
}

/*
login as a user
*/
exports.login = async function(request, response)
{
    /*
    console.log('in the login function - request:');
    console.log('SessionID:\n---\n');
    console.log(request.sessionID);
    console.log('Session:\n---\n');
    console.log(request.session);
    */
    
    let email = request.body.email;
    let pw = passUtil.hashPassword(request.body.password);
    
    let user = await dao.login(email, pw);
    
    if(user !== null) // successful login
    {
        user.password = null;
        response.status(200);
        request.session.user = user;
        response.send(request.session.user);
    }
    else // incorrect login
    {
        response.status(401);
        response.send( {msg: 'Invalid credentials'} );
        response.end();
    }
}

/*
get the logged-in user
*/
exports.getLoggedUser = async function(request, response)
{
    /*
    console.log('in the getLoggedUser function - request:');
    console.log('SessionID:\n---\n');
    console.log(request.sessionID);
    console.log('Session:\n---\n');
    console.log(request.session);
    */
    
    if(request.session.user)
    {
        response.status(200);
        response.send(request.session.user);
    }
    else
    {
        response.status(401);
        response.send( {msg:'Unauthorized'});
    }
    /*
    console.log("current session status: ");
    console.log(request.session);
    
    response.status(200);
    response.send(request.session.user);
    response.end();
    */
}

/*
log the user out of the session
*/
exports.logout = async function(request, response)
{
    if(request.session.user)
    {
        request.session.user = null;
        response.status(200);
    }
    else
    {
        response.status(409);
    }
    
    response.send(null);
}