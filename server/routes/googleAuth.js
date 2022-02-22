//308689586174-4khajs2tnup117oq5119fcq27n8m9hhq.apps.googleusercontent.com
//'/auth/google

const express = require('express');
const router = express.Router();
const passport = require('passport');
const logOut = require('express-passport-logout');

//-----------------------------
//auth/google 
router.get('/login',
  passport.authenticate('google', { scope: ['profile','email'] }));



router.get('/callback', 
  passport.authenticate('google', { failureRedirect: '/', session:false }),
  function(req, res) {
    //var token = req.user.token;
    res.redirect("http://localhost:3000/");
}
);

  const authenticated = (req, res, next) => { 
    const customError = new Error('you are not logged in'); 
    customError.statusCode = 401; (!req.user) ? next(customError) : next(); 
  }


  
router.get('/getUser', authenticated,(req,res)=>res.send(req.user))


router.get('/logout', function (req, res) {
  logOut();
    //req.logout();
    //res.redirect('/');
  console.log('logged out');
  if(req.user){
  res.send("We did NOT logged out. You're still logged")
  }else{
  res.send('you have logged out')}
})










module.exports = router;