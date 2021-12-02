const express = require('express');

const app = express();


const port = process.env.PORT || 5000;

app.listen(port, () => 
  console.log(`Server running on port ${port}`
  ));



//Send message to the html
app.get('/', (req, res) => res.send('Hello world!'));



//// Middleware----------------------------------------------

const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());



//route ------------------------------------------------------
app.use('/cities', require('./routes/cities'));
app.use('/all', require('./routes/cities'));

//----------------------------------------------------------------

/*
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://genis123:admin123@sandbox.h6gff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
// */





// db es el modulo mongoURI del archivo keys.js --------------------------------
const db = require('./keys').mongoURI;

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://genis123:admin123@sandbox.h6gff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('Connection to Mongo DB established!'))
    .catch(err => console.log(err));

////
