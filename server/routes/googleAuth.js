//308689586174-4khajs2tnup117oq5119fcq27n8m9hhq.apps.googleusercontent.com
//'/auth/google

const express = require('express');
const router = express.Router();
const MemberModel = require('../model/MemberModel');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const passport = require('passport');

const googleconfig = require("./../config/config.json")
const GOOGLE_CLIENT_ID = googleconfig.postman.client_id
const GOOGLE_CLIENT_SECRET = googleconfig.postman.client_secret
//-----------------------------
//auth/google 
router.get('/',
  passport.authenticate('google', { scope: ['profile', 'email'] }));





router.get('/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
  function(req, res) {
    // Successful authentication, redirect home.,0
    res.redirect('http://localhost:3000/');
  });
/*app.get('/auth/google/callback', passport.authenticate( 'google', {
   successRedirect: '/dashboard',
   failureRedirect: '/login'
})); */












module.exports = router;

