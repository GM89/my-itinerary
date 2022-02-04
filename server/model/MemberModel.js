
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
        //unique: true,

    },
    password: {
        type: String,
        //It is not 'required' because some users can login with Google, and then password is not used.
       // required: true, )
    },
    profilePicture: {
        type: String,
    },
    
    googleId: {
        type: String,
        unique: true,
    },
    
    favorites: {
        type: Array,
    },

})


// The following middleware creates a crypted function before creating a member schema
//Therefore, when adding a new user, it will stored in MongoDB with a encrypted password. 

/* Google authentication doesn't create a password, and instead it returns password =null or undefined. */
memberSchema.pre('save', async function (next) {
    try {
        if(!this.password===null|| this.password===undefined){
            this.password = "contrasenya";
            const salt = await bcrypt.genSalt(10)
            hashpassword = await bcrypt.hash(this.password, salt)

        }
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