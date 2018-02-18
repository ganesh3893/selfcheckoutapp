function User () {
    if (User.instance === null) {
        User.instance = this;
        this.mongoose = require('mongoose');
        this.bcrypt = require('bcryptjs');
        this.config = require('../config/database');
        this.UserScehma = this.mongoose.Schema({
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
        console.log("User Got Initialized");
        this.User=this.mongoose.model('User', this.UserScehma)            
        return this;
    } else {
        console.log("Same user Object returned");        
        return User.instance;
    }
}

User.instance=null;

User.prototype.getUserById = function (id, callback) {
    const query = { id: id }
    this.User.findOne(query, callback);
}


User.prototype.getUserByUsername = function (username, callback) {
    const query = { username: username }
    this.User.findOne(query, callback);
}

User.prototype.addUser = function (newUser, callback) {
    this.bcrypt.genSalt(10, (err, salt) => {
        this.bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}
User.prototype.comparePassword=function(inputPassword,hash,callback){
    this.bcrypt.compare(inputPassword,hash,(err,isMatch)=>{
        if(err){
            throw err;
        }
        callback(null,isMatch);
    })
}
//const User =module.exports= mongoose.model('User', UserScehma);
//const User =module.exports= ;
    
module.exports=User;

