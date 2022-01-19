
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const memberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
    },

})

memberSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        hashpassword = await bcrypt.hash(this.password, salt)
        
        this.password = hashpassword
        next()
    }
    catch (error) {
       
        next(error)
    }
})

memberSchema.post('save', async function (next) {
    try {
        console.log("userSchema.post done");
    } catch (e) {
        console.log(e);
    }
})


//We set the export to a variable ‘city’ which was defined as 'Schema' on line6, and we exported as a mongoose model
module.exports = mongoose.model('members', memberSchema)