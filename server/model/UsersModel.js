
const mongoose = require('mongoose')

/* we need to create a model of our resource so that we may ensure 
some sort of structure for the documents in our database collection.


itle, a profile picture(URL), a rating, a duration, a price and some hashtags
*/
//category: {type: Schema.Types.ObjectId, ref: 'itineraries'}, 
const usersSchema = new mongoose.Schema({ 
    email: {
        type: String,
        required: true,
        unique:true
      },
    userName: {
            type: String,
            required: true,
            unique:true
          },
    password: {
            type: String,
            required: true,
          },
    profilePicture: {
            type: String,
           },
    
    })

/*     usersSchema.pre('save', async function (next){
        try{
            console.log("called before saving an user!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        }
        catch(error){
            console.log(error)
            next(error)
        }

    })


    usersSchema.post('save', async function (next){
        try{
            console.log("called before saving an user!!!!!!!1!!!!!!!!!!!!!!!!!!!!!!!!!!1")
        }
        catch(error){
            console.log(error)
            next(error)
        }

    }) */
//We set the export to a variable ‘city’ which was defined as 'Schema' on line6, and we exported as a mongoose model
module.exports = mongoose.model('users', usersSchema)