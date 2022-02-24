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
      console.log("error in passport.authenticate")
      return next(err); // will generate a 500 error


      //return res.status(400).json({errors:err});
     // throw new Error("Error general en la autentificación local");
    }
    if(!user){
      console.log("Error in authenticate process: user not found")
    
      //return res.status(400).json({errors: "no users found"});
      
      return res.send({ success : false, message : 'authentication failed' })
    }
    req.logIn(user, {session: false}, function(err){
        if(err){
          //return res.status(400).json({errors:err})
         return next (err);
        }
        
        //if loggin success
        console.log("login success! local", user)

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
               
        console.log("look at this token", token)
  
        return res.json({ success : true, message : 'authentication succeeded', userData: user, tokenData:token});
        
        })
    }) (req,res,next);
  })

/* Req.logOut clears both "req.session.passport"  and "req.userfind
"req.session.passport"  -------> {}
"req.user" ------->  undefined 
  router.get("/logout", (req,res) => {
    req.logOut()
    console.log(`-------> User Logged out`)
    res.send('you have logged out')
   // return {message: "you have logged out"}
 })*/



 

  ///---------------------------LOG OUT

 //Middlware
/*middleware que no funciona
const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) { 
    res.send({message:"you're already logged in"})
   }
  next()
}*/




// logout
 
 router.get('/logout', function (req, res) {
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

