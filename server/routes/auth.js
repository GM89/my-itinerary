const express = require('express')
const router = express.Router()

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const passport = require('passport');
const { secretOrKey } = require('../config/secret');
const logOut = require('express-passport-logout');
//protected


/*we find a {Member} based on the email writen on the form (req.body.email), and when found we'll name it loggedMember
Then, we compare the password wrote by the user (re.body.passowrd) with that from our database (loggedMember.password)
We save the result in "comparison".*/

  //Note, that we pass {session: false} in passport options, so that it wont save the user in the session. 
router.post("/login", (req,res, next) => {
  
  passport.authenticate("local",{session: false}, function(err, user, info){
    if (err){
      console.log(err, "There's an error in authenticate process")

      return res.status(400).json({errors:err});
    }
    if(!user){
      console.log("Error in authenticate process: user not found")
      return res.status(400).json({errors: "no users found"});
    }
    req.logIn(user, {session: false}, function(err){
        if(err){
          return res.status(400).json({errors:err})
        }//if loggin success
        console.log(user)
        const payload = {
          userName: user.userName,
          email: user.email
        }
      
        const options = {
          subject:`${user._id}`,
          expiresIn:60000
        }
        const token = jwt.sign(payload, secretOrKey, options);
        // return res.status(200).json({success: `logged in ${user.id}`.user, token});
        return res.json({user, token})
        })
    }) (req,res,next);
  })

/* Req.logOut clears both "req.session.passport"  and "req.user"
"req.session.passport"  -------> {}
"req.user" ------->  undefined 
  router.get("/logout", (req,res) => {
    req.logOut()
    console.log(`-------> User Logged out`)
    res.send('you have logged out')
   // return {message: "you have logged out"}
 })*/



 
// LOG OUT ------------------------------

 //Middlware
/*middleware que no funciona
const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) { 
       return res.redirect("/dashboard")
   }
  next()
}*/




// logout
 
 router.get('/logout', function (req, res) {
  logOut();
  console.log('logged out');
  res.send('you have logged out')

})


module.exports = router;

