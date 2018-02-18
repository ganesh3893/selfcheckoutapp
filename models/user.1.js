    const mongoose = require('mongoose');
    const bcrypt = require('bcryptjs');
    const config = require('../config/database');
    
    
    const UserScehma = mongoose.Schema({
        name: {
            type: String
        },
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    });

var User =module.exports= {};    
module.exports.createModel= function(){
    User=mongoose.model('User', UserScehma)    
}



module.exports.getUserById = function (id, callback) {
    const query = { id: id }
    User.findOne(query, callback);
}


module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username }
    User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}
module.exports.comparePassword=function(inputPassword,hash,callback){
    bcrypt.compare(inputPassword,hash,(err,isMatch)=>{
        if(err){
            throw err;
        }
        callback(null,isMatch);
    })
}
//const User =module.exports= mongoose.model('User', UserScehma);
//const User =module.exports= ;
    
