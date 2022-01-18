const express = require("express");
const app = express();


const port = process.env.PORT || 5000;

const bodyParser = require("body-parser");
const cors = require("cors");

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
app.use('/cities', require('./routes/cities'));
app.use('/cities/all', require('./routes/cities'));
app.use('/itineraries', require('./routes/itineraries'));
app.use('/activities', require('./routes/activities'));
app.use('/members',require('./routes/members.js'));
app.use('/auth',require('./routes/auth.js'));


const db = require("./keys").mongoURI;
const mongoose = require("mongoose");



mongoose.connect(db, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
  
})
    .then(() => console.log('Connection to Mongo DB established!'))
    .catch(err => console.log(err));




//routes
/* nd pass in two arguments, the api route and the relative path to the file where we will defining our route method*/

