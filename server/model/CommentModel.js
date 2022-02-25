
const mongoose = require('mongoose');


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
//The third argument there is the collection name to be used rather than what will be determined based on the model name.
module.exports = mongoose.model('Comment', CommentSchema)

//module.exports = mongoose.model('Comment', CommentSchema, "comments")