const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;



const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
//
//route 
app.use('/cities', require('./routes/cities'));
app.use('/prova',require('./routes/prova'));
//
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://genis123:admin89@itinerary.h6gff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
//


app.listen(port, () => console.log(`Server running on port ${port}`));