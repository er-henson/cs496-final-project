/*
Schema for storing all user accounts
*/

const mongoose = require('mongoose');

/*
Important data fields are:
    Username
    Email
    Password
    Admin
*/
const userSchema = new mongoose.Schema(
{
    username: String,
    email: String,
    password: String,
    admin: Number
});
const userModel = mongoose.model('User',userSchema);

/*
function to add a user to the database
will check for an existing user with the same username and email and,
if they exist, will return null. else will return the user saved
in the database
    assumes the 'newUser' JSON object has:
    username
    email
    password
    admin (set in the controller)
*/
exports.create = async function(newUser)
{
    // search for potential duplicates first
    let dupeEmail = await userModel.find( {email: newUser.email} ).lean();
    // if we find a user who already has the same email, return null
    if(dupeEmail.length > 0)
    {
        return null;
    }
    else // if there are no duplicates, create the user in the DB
    {
        const mongoUser = new userModel(newUser);
        await mongoUser.save();
        let dbUser = await userModel.findById( mongoUser._id ).lean();
        //console.log(dbUser);
        return dbUser;
    }
}

/*
read a user by their email
*/
exports.readByEmail = async function(userEmail)
{
    let user = await userModel.find( {email: userEmail}, {password:false} ).lean();
    return user[0];
}

/*
read users by their names
*/
exports.readByName = async function(userName)
{
    let users = await userModel.find({username: userName}, {password:false}).lean();
    return users;
}

exports.login = async function(userEmail, userPassword)
{
    let user = await userModel.find( {email:userEmail, password:userPassword}, {password:false} ).lean();
    // both credentials match
    if (user.length > 0)
    {
        return user[0];
    }
    else
    {
        return null;
    }
}

/*
SUPER DANGEROUS FUNCTION
ONLY FOR TESTING
*/
exports.deleteAll = async function()
{
    await userModel.deleteMany();
}