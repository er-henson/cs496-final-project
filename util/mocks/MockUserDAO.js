const passUtil = require('../PasswordUtil');
exports.create = async function(user) {
    let existingUser = {
        _id: 'abc',
        username: 'phil',
        email: 'phil@somewhere',
        password: 'phils pw',
        admin: 0
    };
    // if an existing user has the same email, return null
    if (user.email === existingUser.email) {
        return null;
    } else { // return the user with their new ID
        user._id = "def";
        return user;
    }
};

exports.login = async function(email, pw) {    
    let existingUser = {
        _id: 'abc',
        username: 'phil',
        email: 'phil@somewhere',
        password: passUtil.hashPassword('phils pw'),
        admin: 0
    };
    
    if(email === existingUser.email && pw === existingUser.password) {
        //return existingUser;
    } else {
        return null;
    }
};
exports.update = async function(id,updatedUser) {


    let existingUser = {
        _id: 'abc',
        username: 'phil',
        email: 'phil@somewhere',
        password: passUtil.hashPassword('phils pw'),
        admin: 0
    };
    if (id === existingUser._id) {
        return updatedUser;
    } else {
        return null;
    }
};
exports.readById = async function(id) {
    let existingUser = {
        _id: ObjectId.createFromHexString('5c4e7f1d148f900b0d416aea'),
        username: 'phil',
        email: 'phil@somewhere',
        password: passUtil.hashPassword('phils pw'),
        admin: 0
    };
    if (id.equals(existingUser._id)){
    return existingUser;
    }
    else{
        return null;
    }

};



exports.delete = async function(id) {


    let existingUser = {
        _id: ObjectId.createFromHexString('5c4e7f1d148f900b0d416aea'),
        username: 'phil',
        email: 'phil@somewhere',
        password: passUtil.hashPassword('phils pw'),
        admin: 0
    };
    if (id.equals(existingUser._id) || admin === 1) {
        return 'deleted';
    } else if(admin === 0 && id !== existingUser._id){
        return 'unauthorized, not deleted';

    }
};
