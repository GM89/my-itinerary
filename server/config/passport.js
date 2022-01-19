
//Import the main Passport and Express-Session library
const passport = require('passport')
const session = require('express-session')
//Import the secondary "Strategy" library
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const Member = require('../model/MemberModel.js')



/*userNameField is the default name that here  we change0 to 'email'.
 So we would identify members by email
 The second argument is the function that will be called to authenticate the user (fucntion authenticateUser)*/
 passport.use(new LocalStrategy({
    usernameField: 'email' }, 
    (userName, email, password, done) =>{
      User.findOne({email: email})
        .then(
            bcrypt.compare(password, user.password, (err, isMatch)=> {
              if(err) throw err;
              if(!isMatch){
                return done (null, user);
              } else{
                return done(null, false,  {message: "wrong password"})
              }
          }) 
        ).catch(err =>{
          return done(null, false, {message: err})
        })


        }))


//we store the id in the "session"
passport.serializeUser( (user, done) => {
  done(null, user._id)
})
//with the ID, we find the whole user from the database

passport.deserializeUser(function(_id, done) {
    Member.findById(_id, function(err, user) {
        done(err, user);
    });
});
module.exports = passport;



  
    
    
    
    
