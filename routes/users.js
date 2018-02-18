const express = require('express');
const router = express.Router();
//const userClass = require('../models/User');
const User=require('../models/user');
var  jwt = require('jsonwebtoken');
const config = require('../config/database');
var secret=new Buffer(config.secret);

const passport = require('passport');

router.post('/register', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, (err, callback) => {
        if (err) {
            res.json({ success: false, msg: err });
        } else {
            res.json({ success: true, msg: 'User Registered' });
        }
    });
    //    res.send('Register');
});


router.post('/authenticate', (req, res) => {
const username =req.body.username;
const password=req.body.password;

User.getUserByUsername(username,(err,user)=>{
    if(err) throw err;
    if(!user){
        return res.json({success:false,msg:'User not found'});
    }
    User.comparePassword(password,user.password,(err,isMatch)=>{
        if(err) throw err;

        if(isMatch){
            const token =jwt.sign({user},config.secret,{
                expiresIn:3600
            });

            res.json({
                success:true,
                token: `Bearer ${token}`,
                user:{
                    id:user._id,
                    name:user.name,
                    username:user.username,
                    email:user.email
                }
            })
        }else{
            return res.json({success:false,msg:'Wrong Password'});            
        }
    })
})
});


// router.get('/profile',passport.authenticate('jwt',{session:false}),  (req,res,next) => {
//     console.log("/profile hitted ");    
//     console.log(req.user);
//     res.json(req.user);    
// });
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
  });

router.post('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
  });

router.get('/test', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/users/' + user.username);
      });
    })(req, res, next);
  });
module.exports = router;
