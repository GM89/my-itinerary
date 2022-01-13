const express = require('express')

const router = express.Router()
const userModel = require('../model/UsersModel')


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


///--------------encrypt-----




///--------------post user-------------

router.post('/register', async (req, res) => {
    try{ 
        
       

        const newUser = new userModel({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture
        }) 
       await bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err) throw err;
                newUser=hash;
                
            })

          
        }) 

    await userModel.findOne( {userName: newUser.userName})
        .then(userName=>{
            if(userName) res.status(500).send('This users already exists')
        })

      
});



module.exports = router;
