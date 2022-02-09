

const MemberModel = require("./../model/MemberModel.js");
const google = require("googleapis");
const { OAuth2Client } = require('google-auth-library');


const googleConfig = require("./config.json")


//-------------
const GOOGLE_CLIENT_ID = googleConfig.postman.client_id
const GOOGLE_CLIENT_SECRET = googleConfig.postman.client_secret
const GOOGLE_CALLBACK_URL = googleConfig.postman.redirect_uris



// create auth client
const oauth2Client = new OAuth2Client(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL,
);

exports.checkToken = (req, res, next) => {
  // check for user
  if (!req.user) {
    return next();
  }
  // subtract current time from stored expiry_date and see if less than 5 minutes (300s) remain
  //if (moment().subtract(req.user.google.expiry_date, "s").format("X") > -300) {
    
    // set the current users access and refresh token
    oauth2Client.setCredentials({
      access_token: req.user.google.token,
      refresh_token: req.user.google.refreshToken
    });

     // request a new token
    oauth2Client.refreshAccessToken(function(err, tokens) {
      if (err) return next(err);
      
      //save the new token and expiry_date
      MemberModel.findOneAndUpdate(
        { "googleId": req.user.google.id },
      /*   {
          "google.token": tokens.access_token,
          "google.expiry_date": tokens.expiry_date
        }, */
        {
          new: true,
          runValidators: true
        },
        function(err, doc) {
          if (err) return next(err);
          next();
        }
      );
    });
    next();

  }





