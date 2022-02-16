

const googleConfig = require("./config.json")
//Import the main Passport and Express-Session library
const passport = require('passport')
//----strategy-------------

const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local').Strategy


//Import the secondary "Strategy" library
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcrypt');
const MemberModel = require('../model/MemberModel.js')



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
       // by default passport uses [username] in `usernameField` so we override it with [email]
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
/*The “done()” function is then used to pass the “{authenticated_user}” to the serializeUser() function. 
- if user not found, 
done( <no error> so null, <no matching user> so false),
- if user found but password does not match,
done ( <no error> so null, <no matching user> so false)
- if user found and password matches, we found 
our authenticated user and done ( <no error> so null, <pass authenticated user to serializeUser()>)
*/


//GOOGLE STRATEGY---------------------------------------------------------------------------------
 //  When the project is ready to test its front-end, change 'postman' to 'web'
const GOOGLE_CLIENT_ID = googleConfig.postman.client_id
const GOOGLE_CLIENT_SECRET = googleConfig.postman.client_secret

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback", //if success?
    passReqToCallback: true,
    
    
  },
// cb = callback
// profile
async (accessToken, refreshToken, params, profile, done) => {

   /*
      params = { 
        access_token: 'Long_string',
        token_type: 'Bearer',
        expires_in: 3599, // seconds
        id_token: 'Longer_string'
      }
    */
     // find expiry_date so it can be save in the database, along with access and refresh token
     //const expiry_date = moment().add(params.expires_in, "s").format("X");
  

  try {
    const currentUser = await MemberModel.findOne({
      googleId: profile.id,
    });
    // create new user if the database doesn't have this user
    if (!currentUser) {
      const newUser = await new MemberModel({
        googleId: profile.id,
       userName:profile.name.familyName,
        email:profile.email,
        password:null
      }).save();
      //token_type, expires_in, id_token
      localStorage.setItem('x-auth-token', accessToken)
      //cuando accessToken expira, utilizaré el refreshToken
      localStorage.setItem('refresh token', refreshToken)
      if (newUser) {
        done(null, newUser);
      }
    }
    done(null, currentUser);
  } catch (error) {
    return done(error);
  }
}
)
);




///----------- Middleware for protected requests using token----
module.exports = passport;



  
    
    
    
    