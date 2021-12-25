const mongoose = require('mongoose');
const activitySchema = new mongoose.Schema({
    activityName: {
        type: String,
        required: true
    },

    itineraryId: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    ubication: {
        type: String,
        required: true
    },
/*  */
    rating: {
        type: String,
        required: true
    },

    duration: {
        type: String,
        required: true
    },

    cost: {
        type: String,
        required: true
    },

    comments: {
        type: Array,
        required: true
    },
})

module.exports = mongoose.model('activity', activitySchema)