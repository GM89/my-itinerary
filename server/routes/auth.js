const express = require('express')
const router = express.Router()
//const  checkLoggedIn = require ('./middlewares/checkLoggedIn')
const jwt = require("jsonwebtoken");

const passport = require('passport');
const { secretOrKey } = require('../config/secret');
const logOut = require('express-passport-logout');




/*we find a {Member} based on the email writen on the form (req.body.email), and when found we'll name it loggedMember
Then, we compare the password wrote by the user (re.body.passowrd) with that from our database (loggedMember.password)
We save the result in "comparison".*/

  //Note, that we pass {session: false} in passport options, so that it wont save the user in the session. 

  ///--------------------------------LOGIN 
  
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
        console.log("login success. local", user)

        //--Token--------
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
        
        console.log("look at this token", token)
        return res.json({user, token});
        })
    }) (req,res,next);
  })



// logout
 
 router.get('/logout', function (req, res) {
   //req.logout()
  logOut();
  console.log('logged out');
  if(req.user){
  res.send("We did NOT logged out. You're still logged")
  }else{
  res.send('you have logged out')}
})


/* router.post('/logout2', function(req, res){

    res.clearCookie('Session_name');
      res.send('you have logged out')
  
});
 */

module.exports = router;

