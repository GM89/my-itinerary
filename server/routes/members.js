const express = require('express')

const router = express.Router()
//const userModel = require('../model/UsersModel')
const memberModel = require('../model/memberModel')


router.get('/all',(req,res)=>{
    memberModel.find({})
    .then(files=>{
        res.send(files)
    })
    .catch(e=>console.log(e))
    
}) 
router.post("/add", async (req, res) => {
    try{
      const newMember = new memberModel({
       userName : req.body.userName,
       email:req.body.email,
       password:req.body.password
      });
  
      await memberModel.findOne( {userName: newMember.userName})
      .then(each_member=>{
          if(each_member) res.status(500).send('This itinerary is repeated')
      })
  
      await newMember.save()
      .then(each_member => {
        res.send(each_member)
        });
    } catch{
          (err => {
          res.status(500).send("Server error")}) 
      }
    });

    router.post("/prova",(req,res)=>res.send("ciao"))



module.exports = router;