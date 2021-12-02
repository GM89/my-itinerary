const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const db = require("./keys").mongoURI;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());



//routes


app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

const mongoose = require("mongoose");

mongoose.connect(db, { 
  
})
    .then(() => console.log('Connection to Mongo DB established'))
    .catch(err => console.log(err));