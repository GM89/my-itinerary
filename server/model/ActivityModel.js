const mongoose = require('mongoose');
const activitySchema = new mongoose.Schema({
    activityName: {
        type: String,
        required: true
    },

    name_city: {
        type: String,
        required: true
        
    },
   
    activityId: {
        type: String,
        
        
    },
    itineraryId: {
        type: String,
        required: true
    
        
        
    },
    rating: {
        type: String,
        
    },
    location: {
        type: String,
       
    },

    duration: {
        type: String,
       
    },

    price: {
        type: Number,
        
    },

    comments: {
        type: Array,
       
    },
})

module.exports = mongoose.model('activity', activitySchema)