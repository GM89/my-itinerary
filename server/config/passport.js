

const googleConfig = require("./config.json")
//Import the main Passport and Express-Session library
const passport = require('passport')
//----strategy-------------

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const fs = require("fs");
const path = require('path');

//make OAuth2 Credentials file using Google Developer console and download it(credentials.json)
//replace the 'web' using 'installed' in the file downloaded
var pathToJson = path.resolve(__dirname, './credentials.json');
const config = JSON.parse(fs.readFileSync(pathToJson));


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
                  
                  throw err;
                }
                if(isMatch){
                  
                  return done (null, user);
                } else{
                  
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
    callbackURL: "http://localhost:5000/auth/google/callback", //callback if success
    
  },
// cb = callback
// profile
async (accessToken, refreshToken,otherTokenDetails, profile, done) => {
  
  console.log('ID!!!', typeof profile.id)
  console.log('NAME!!!', typeof profile.name.familyName)
  console.log('EMAIL!!!',typeof profile._json.email)
  try {
    let token = {
      access_token:accessToken,
      refresh_token:refreshToken,
      scope: otherTokenDetails.scope,
      token_type: otherTokenDetails.token_type,
      expiry_date: otherTokenDetails.expires_in,
    }
    let data = JSON.stringify(token);
        fs.writeFileSync('./tokens.json', data);
    const currentUser = await MemberModel.findOne({
      googleId: profile.id,
    });
    // create new user if the database doesn't have this user
    if (!currentUser) {
      const newUser = await new MemberModel({
        googleId: profile.id,
       userName:profile._json.name,
        email:profile._json.email,
        password:null
      }).save();
      if (newUser) {
        done(null, newUser);
      }
    }
    //if user was found in the database
    done(null, currentUser);
  } catch (error) {
    return done(error);
  }
}
)
);




///----------- Middleware for protected requests using token----
module.exports = passport;



  
    
    
    
    
