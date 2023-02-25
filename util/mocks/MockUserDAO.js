const passUtil = require('../PasswordUtil');
exports.create = async function(user)
{
    let existingUser = 
    {
        _id:'abc',
        username: 'phil',
        email: 'phil@somewhere',
        password: 'phils pw',
        admin: 0
    };
    // if an existing user has the same email, return null
    if (user.email === existingUser.email)
    {
        return null;
    }
    else // return the user with their new ID
    {
        user._id = "def";
        return user;
    }
}

exports.login = async function(email, pw)
{    
    let existingUser = 
    {
        _id:'abc',
        username: 'phil',
        email: 'phil@somewhere',
        password: passUtil.hashPassword('phils pw'),
        admin: 0
    };
    
    if(email === existingUser.email && pw === existingUser.password)
    {
        return existingUser;
    }
    else
    {
        return null;
    }
}