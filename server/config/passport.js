const MemberModel = require('../model/MemberModel.js')
const googleClientId = require("./config.json")
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
    MemberModel.findById(_id, function(err, user) {
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
     await MemberModel.findOne({email: email})
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



//GOOGLE STRATEGY---------------------------------------------------------------------------------

const GOOGLE_CLIENT_ID = googleClientId.postman.client_id
const GOOGLE_CLIENT_SECRET = googleClientId.postman.client_secret
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback", //if success?
  passReqToCallback: true,
},
// cb = callback
// profile
  function (accessToken, refreshToken, profile, cb) {
    MemberModel.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

/* 
  async  (
     email, 
     password, 
     done
     ) =>{
    await MemberModel.findOne({email: email})
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
 */


module.exports = passport;



  
    
    
    
    
