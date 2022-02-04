//308689586174-4khajs2tnup117oq5119fcq27n8m9hhq.apps.googleusercontent.com
//'/auth/google

const express = require('express');
const router = express.Router();
const MemberModel = require('../model/MemberModel');
const jwt = require("jsonwebtoken");

const passport = require('passport');

//-----------------------------
//auth/google 
router.get('/',
  passport.authenticate('google', { scope: ['profile','email'] }));



router.get('/callback', 
  passport.authenticate('google', { failureRedirect: '/', session:false }),
  function(req, res) {
    //var token = req.user.token;
    res.redirect("http://localhost:3000")
}
);
 

  const authenticated = (req, res, next) => { 
    const customError = new Error('you are not logged in'); 
    customError.statusCode = 401; (!req.user) ? next(customError) : next() 
  }
  
router.get('/getUser', authenticated,(req,res)=>res.send(req.user))



/*app.get('/auth/google/callback', passport.authenticate( 'google', {
   successRedirect: '/dashboard',
   failureRedirect: '/login'
})); */












module.exports = router;

