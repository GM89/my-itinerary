
const mongoose = require('mongoose')

/* we need to create a model of our resource so that we may ensure 
some sort of structure for the documents in our database collection.


itle, a profile picture(URL), a rating, a duration, a price and some hashtags
*/
const itinerarySchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: true,
        unique:true
      },
    picture: {
        type: String,
    },
    rating: {
        type: int32,
       },
    duration: {
            type: String,
           },
    hashtag: {
            type: String,
        
           },
    city_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cities',  //hace referenci a la colecion cities
        required: true
    },
    })


//We set the export to a variable ‘city’ which was defined as 'Schema' on line6, and we exported as a mongoose model
module.exports = mongoose.model('itinerary', itinerarySchema)