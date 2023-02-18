require('dotenv').config(); // get the env variables
const mongoose = require('mongoose');

exports.connect = function(dbwhere){
    let uri = process.env.DB_URI;
    if(dbwhere === 'test')
    {
        uri = process.env.TESTDB_URI;
    }
    mongoose.connect(uri, function(err){
        if(err) console.log(err); // Error callback
    });
}
exports.disconnect = async function(){
    await mongoose.connection.close();
}
