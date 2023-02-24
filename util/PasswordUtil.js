require('dotenv').config(); //use env constants
const bcrypt = require('bcrypt');

exports.hashPassword = function(pass){
    let hashedpass = bcrypt.hashSync(pass, process.env.SALT); 
    return hashedpass;
}

exports.createSalt = function(){
    return bcrypt.genSaltSync(3);
}