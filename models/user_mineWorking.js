var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('../config/database');

var User= module.exports= {
        UserScehma : mongoose.Schema({
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
        }),
        setModel:function(){
            console.log("User Got Initialized");            
            User=mongoose.model('User', this.UserScehma);           
        },
        getUserById :function (id, callback) {
            const query = { id: id }
            User.findOne(query, callback);
        },
        getUserByUsername : function (username, callback) {
            const query = { username: username }
            User.findOne(query, callback);
        },
        addUser : function (newUser, callback) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save(callback);
                })
            })
        },
        comparePassword:function(inputPassword,hash,callback){
            bcrypt.compare(inputPassword,hash,(err,isMatch)=>{
                if(err){
                    throw err;
                }
                callback(null,isMatch);
            })
        }
};
