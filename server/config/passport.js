const Member = require('../model/MemberModel.js')

//Import the main Passport and Express-Session library
const passport = require('passport')
//Import the secondary "Strategy" library
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');


var opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';


/* How does this work?  
Express.session is a middleware written in server.js. It collects the signed up user.
Passport library collects the user when it is serialize  and deserialize it. Then  it applies the local strategy.  */
//we store the id in the "session"
passport.serializeUser( (user, done) => {
  done(null, user._id)
})
//with the ID, we find the whole user from the database

passport.deserializeUser(function(_id, done) {
    Member.findById(_id, function(err, user) {
        done(err, user);
    });
}
);

/*userNameField is the default name that here  we change0 to 'email'.
 So we would identify members by email
 The second argument is the function that will be called to authenticate 
 the user (fucntion authenticateUser)*/
 passport.use(new LocalStrategy(
   {    usernameField: 'email', }, 
   async  (
      email, 
      password, 
      done
      ) =>{
     await Member.findOne({email: email})
        .then(user=>{
              bcrypt.compare(password, user.password, (err, isMatch)=> {
                if(err) {
                  console.log("passport.use error")
                  throw err;
                }
                if(isMatch){
                  console.log("user found & passport matched")
                  return done (null, user);
                } else{
                  console.log("wrong password!")
                  return done(null, false, {message: "wrong password"})
                }
            }) 
        }).catch(err =>{
          return done(null, false, {message: 'ciao'})
        })
          

      }
      ))



module.exports = passport;



  
    
    
    
    
