//308689586174-4khajs2tnup117oq5119fcq27n8m9hhq.apps.googleusercontent.com
//'/auth/google

const express = require('express')
const router = express.Router()
const MemberModel = require('../model/MemberModel');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const passport = require('passport');
const { secretOrKey } = require('../config/secret');



//-----------------------------
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
  });
/*app.get('/auth/google/callback', passport.authenticate( 'google', {
   successRedirect: '/dashboard',
   failureRedirect: '/login'
})); */












module.exports = router;

