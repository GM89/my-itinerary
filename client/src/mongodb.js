
//mongodb connecto to application

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://genis:<admin89>@cluster0.cyxlb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});