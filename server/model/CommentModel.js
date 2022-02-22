
const mongoose = require('mongoose')


const CommentSchema = new mongoose.Schema({
    itineraryId: {
        type: String,
        required: true,
       
    },
    text: {
        type: Array,
        required: true,
    },
    memberId: {
        type: String,
        required: true,
        //unique: true,
    },
    timestamp: {
        type: Number,
        //It is not 'required' because some users can login with Google, and then password is not used.
       // required: true, )
    },
    profilePicture: {
        type: String,
        //unique: true,
    },

})
module.exports = mongoose.model('comment', CommentSchema)

