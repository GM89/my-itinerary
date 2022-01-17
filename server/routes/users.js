const express = require('express')

const router = express.Router()
const userModel = require('../model/UsersModel')


// We import our SCHEMA for further get instances-------------------------------------------------

// GET ROUTE---------------------------------------------------------------------------
//Create route to retrieve all the cities from the database
/*get all cities*/
router.get('/all',
    (req,res)=>{
        userModel.find({})
            .then(f=>{
                res.send(f)
            })
            .catch(e=>console.log(e))
    }
    )

router.post('/ciao',(req,res)=>{
    res.send('ciaooooooo')
})
///--------------encrypt-----




///--------------post user-------------

router.post('/add', async (req, res) => {
    try{ 
           const newUser = new userModel({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture
        }) 
        await userModel.findOne( {userName: newUser.userName})
            .then(user =>{
                if(user) res.status(500).send('This user already exists')
            })

        await userModel.save()
        .then(user =>{
            res.send(user)
        });

    } catch{
        (err => {
        res.status(500).send("Server error")})
     }
    });

      


module.exports = router;
