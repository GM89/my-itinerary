const express = require("express");
const app = express();

const urlMongoDB =  require('./keys')


const db = require("./keys").mongoURI;
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")

const session =require("express-session")

//const mongoose = require("mongoose")
const passport = require("./config/passport.js");
const auth = require("./routes/auth")



const port = process.env.PORT || 5000;

const bodyParser = require("body-parser");
const cors = require("cors");

//-------------------------

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());



//mongoose connection to Mongo DB

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

/* Make a call to “app.use” and pass in two arguments, 
the api route and the relative path to the file where 
we will defining our route methods.*/
//------------------------routes-----------------------------------------
app.use('/cities', require('./routes/cities'),);
app.use('/cities/all', require('./routes/cities'));
app.use('/itineraries', require('./routes/itineraries'));
app.use('/activities', require('./routes/activities'));
app.use('/members',require('./routes/members.js'));
app.use('/auth',require('./routes/auth.js'));
app.use('/auth/google',require('./routes/googleAuth.js'));


// Database ----------------

mongoose.connect(db, { 
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
//express session------------------------------------------------------------
app.use(
  session({
    secret: "secret",
    resave:false,
    saveUninitialized:true, 
   /*  store: new MongoStore ({mongooseConnection: mongoose.connection}) */
    store: MongoStore.create({ mongoUrl: urlMongoDB.mongoURI })
  })
)

//Passport middleware
/* app.use(flash()); */
app.use(passport.initialize())
app.use(passport.session())

//Routes
app.use("auth", auth)
app.get("/", (req,res) => res.send("Good morning sunshine!"));





