
//They keys to our database. We obtain the link from our mongoDB in our account. 
//Remember to include name of database in the link
let databaseName = 'myFirstDatabase'
module.exports = {
    mongoURI:
      
      `mongodb+srv://genis123:admin123@sandbox.h6gff.mongodb.net/${databaseName}?retryWrites=true&w=majority`,
  };