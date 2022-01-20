const express = require('express')
const router = express.Router()
const Member = require('../model/MemberModel')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const passport = require('passport');

/*we find a {Member} based on the email writen on the form (req.body.email), and when found we'll name it loggedMember
Then, we compare the password wrote by the user (re.body.passowrd) with that from our database (loggedMember.password)
We save the result in "comparison".*/

/* app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });*/

router.post("/login", (req,res, next) => {
  
  passport.authenticate("local", function(err, user, info){
    if (err){
      console.log("There's an error in authenticate process")
      return res.status(400).json({errors:err});
    }
    if(!user){
      console.log("Error in authenticate process: user not found")
      return res.status(400).json({errors: "no users found"});
    }
    req.logIn(user, function(err){
        if(err){
          return res.status(400).json({errors:err})
        }//if loggin success
         return res.status(200).json({success: `logged in ${user.id}`});
        })
    }) (req,res,next);
  })



/* 
router.post("/login", async (req, res) => {
  try {
    const loggedMember = await Member.findOne({ email: req.body.email, userName: req.body.userName });
    console.log(loggedMember);
    if (loggedMember) {
      const comparison = await bcrypt.compare(req.body.password, loggedMember.password);
      if (comparison) {
        //   ..... further code to maintain authentication like jwt or sessions
        res.send("Auth Successful");
      } else {
        res.send("Wrong password.");
      }
    } else {
      res.send("Wrong email or user name");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
}); */

module.exports = router;

