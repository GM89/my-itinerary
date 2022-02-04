//308689586174-4khajs2tnup117oq5119fcq27n8m9hhq.apps.googleusercontent.com
//'/auth/google

const express = require('express');
const router = express.Router();
const MemberModel = require('../model/MemberModel');
const jwt = require("jsonwebtoken");

const passport = require('passport');

//-----------------------------
//auth/google 
router.get('/',
  passport.authenticate('google', { scope: ['profile','email'] }));



router.get('/callback', 
  passport.authenticate('google', { failureRedirect: '/', session:false }),
  function(req, res) {
    console.log("callback", req.body);
    //let token = req.user.token;
    //res.redirect("http://localhost:3000");

    try {
      //read token file you saved earlier in passport_setup.js
      var pathToJson_2 = path.resolve(__dirname, './../config/tokens.json');

      //get tokens to details to object
      const tokens = JSON.parse(fs.readFileSync(pathToJson_2));
      //extract credential details
      const { client_secret, client_id, redirect_uris } = credentials.installed

      //make OAuth2 object
      const oAuth2Client = new google.auth.OAuth2(client_id,
      client_secret,
      redirect_uris[0])

      // set token details to OAuth2 object
      oAuth2Client.setCredentials(tokens)

/*       //create gmail object to call APIs
      const gmail = google.gmail({ version: 'v1', auth: oAuth2Client }) */

     /*  //call gmail APIs message send method
      gmail.users.messages.send({
            userId: 'me',//'me' indicate current logged in user id
            resource: {
                raw:"gmail"
              }
        }, (err, res) => {
            if (err) {
              console.log('The API returned an error: ' + err)
              throw err
            }
            console.log('Email Status : ' + res.status)
            console.log('Email Status Text : ' + res.statusText)
        })
 */
      res.status(200).json({ status:true })
  
} catch (err) {
  res.status(500).json(err)
}

})



















 

  const authenticated = (req, res, next) => { 
    const customError = new Error('you are not logged in'); 
    customError.statusCode = 401; (!req.user) ? next(customError) : next() 
  }
  
router.get('/getUser', authenticated,(req,res)=>res.send(req.user))



/*app.get('/auth/google/callback', passport.authenticate( 'google', {
   successRedirect: '/dashboard',
   failureRedirect: '/login'
})); */












module.exports = router;

