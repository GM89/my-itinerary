
const mongoose = require('mongoose')

/* we need to create a model of our resource so that we may ensure 
some sort of structure for the documents in our database collection.*/
const citySchema = new mongoose.Schema({ 
    city: {
        type: String,
        required: true,
        unique:true
      },
    country: {
        type: String,
        required: true
      },
    photoUrl: {
        type: String,
       },
})

//We set the export to a variable ‘city’ which was defined as 'Schema' on line6, and we exported as a mongoose model
module.exports = mongoose.model('city', citySchema)