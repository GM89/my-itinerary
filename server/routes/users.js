const express = require('express')

const router = express.Router()
const userModel = require('../model/UsersModel')



/*test route:We pass two arguments into our get method. 
The path and a callback function with our request object and 
response object as parameters. */






// We import our SCHEMA for further get instances-------------------------------------------------

// GET ROUTE---------------------------------------------------------------------------
//Create route to retrieve all the cities from the database
/*get all cities*/
router.get('/get',
(req,res)=>{
    userModel.find({})
        .then(f=>{
            res.send(f)
        })
        .catch(e=>console.log(e))
}
)




/*We create a new instance of our City model and  save it in a variable.
 The model properties will have the values of what I pass in the req.body.
Afterwards,I  call save(). This mongoose method will return a promise. 
If resolved it can send back the object created in my response. If rejected we'll need to debug!*/


///--------------post user

// router.post('/register', (req, res) => {
//     const newUser = new userModel({
//         userName: req.body.userName,
//         email: req.body.email,
//         password: req.body.password,
//         profilePicture: req.body.profilePicture
//     })

//     userModel.findOne( {user: newUser.user})
//     .then(user=>{
//         if(user) res.status(500).send('This users already exists')
//     })

// newUser.save()
//   .then(user => {
//   res.send(user)
//   })

//   .catch(err => {
//   res.status(500).send("Server error")}) 
// });
module.exports = router;
