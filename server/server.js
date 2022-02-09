
//----------------------------
const fs = require("fs");
const path = require("path");
let pathToJson_1 =path.resolve(__dirname,'./config/credentials.json')
const credentials = JSON.parse(fs.readFileSync(pathToJson_1));

//-------------------------

const express = require("express");
const app = express();
const secret = require('./config/secret');

const db = require("./config/keys");

const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

const session =require("express-session");



const passport = require("./config/passport.js");
const auth = require("./routes/auth");



const port = process.env.PORT || 5000;

const bodyParser = require("body-parser");
const cors = require("cors");

const cookieSession = require('cookie-session');
const {google} = require('googleapis');

//-----------
//const mongoose = require("mongoose")
app.use(cookieSession({
  name:'Reserve It',
  maxAge: 1*60*60*1000,
  keys: ['secret']
}))

//----------

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});






//mongoose connection to Mongo DB

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

/* Make a call to “app.use” and pass in two arguments, 
the api route and the relative path to the file where 
we will defining our route methods.*/
//------------------------routes-----------------------------------------
app.use('/cities', isLoggedIn, require('./routes/cities'),);
app.use('/cities/all', require('./routes/cities'));
app.use('/itineraries', require('./routes/itineraries'));
app.use('/activities', require('./routes/activities'));
app.use('/members',require('./routes/members.js'));
app.use('/auth',require('./routes/auth.js'));
app.use('/auth/google',require('./routes/googleAuth.js'));


// Database ----------------

mongoose.connect(db.mongoURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
  
})
    .then(() => console.log('Connection to Mongo DB established!'))
    .catch(err => console.log(err));





//Bodyparse middleware, extended false does not allow nested payloads
app.use(express.json());
app.use(express.urlencoded({extended:false}));




//-----------isLoggedIn flag-----------------

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
//express session: middleware------------------------------------------------------------
app.use(
  session({
    secret: secret.secretOrKey,
    resave:false,
    saveUninitialized:true, 
   /*  store: new MongoStore ({mongooseConnection: mongoose.connection}) */
    store: MongoStore.create({ mongoUrl: db.mongoURI })
  })
)


//  checktoken middleware---------
const router = express.Router();

const { checkToken } = require("./config/token-validator");




// tell the router to use checkToken function
router.use(checkToken);








// LOG OUT ------------------------------


app.use(passport.initialize());// init passport on every route call.
app.use(passport.session());// allow passport to use "express-session".

//Routes
app.use("auth", auth);




