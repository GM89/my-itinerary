//308689586174-4khajs2tnup117oq5119fcq27n8m9hhq.apps.googleusercontent.com

//'/auth/api/google

//import the jwt module: 
const express = require('express')

const router = express.Router()
//const userModel = require('../model/UsersModel')
const memberModel = require('../model/MemberModel')

router.get('/all',(req,res)=>{
    memberModel.find({})
    .then(files=>{
        res.send(files)
    })
    .catch(e=>console.log(e))
    
}) 
module.exports = router;

