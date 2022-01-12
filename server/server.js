const express = require("express");
const app = express();


const port = process.env.PORT || 5000;

const bodyParser = require("body-parser");

//cors policy: 
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);




//mongoose connection to Mongo DB

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

/* Make a call to “app.use” and pass in two arguments, 
the api route and the relative path to the file where 
we will defining our route methods.*/
//------------------------routes-----------------------------------------
app.use('/cities', require('./routes/cities'))
app.use('/cities/all', require('./routes/cities'))
app.use('/itineraries', require('./routes/itineraries'))
app.use('/activities', require('./routes/activities'))
app.use('/users', require('./routes/users'))

// app.use('/auth', require('./routes/auth'))
//---------------------------------------------
const db = require("./keys").mongoURI;
const mongoose = require("mongoose");

//It works out without useNewUrlParser and useUnifiedTopology too!
mongoose.connect(db, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
  
})
    .then(() => console.log('Connection to Mongo DB established!'))
    .catch(err => console.log(err));




//routes
/* nd pass in two arguments, the api route and the relative path to the file where we will defining our route method*/

