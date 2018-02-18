const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;

//const  userClass=require('../models/user');
const User=require('../models/user');

const config=require('../config/database');


module.exports  =function(passport){
    var opts={};
    opts.jwtFromRequest= ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    
    console.log("opts:: "+ JSON.stringify(opts));

    passport.use(new JwtStrategy(opts,function(jwt_payload,done){
        console.log("1::  "+ JSON.stringify(jwt_payload));
        User.getUserById(jwt_payload.user._id,(err,user)=>{
            if(err){
                console.log('1: getUserbyId');
                console.log(err);                
                return done(err,false);
            }
            if(user){
                console.log('2: getUserbyId');                
                return done(null,user);
            }else{
                console.log('3: getUserbyId');                
                return done(null,false);
            }
        })
    }))
};
