const express = require('express')

const router = express.Router()
//const userModel = require('../model/UsersModel')
const testModel = require('../model/testModel')


router.get('/all',(req,res)=>{
    testModel.find({})
    .then(files=>{
        res.send(files)
    })
    .catch(e=>console.log(e))
    
}) 
router.post("/add", async (req, res) => {
    try{
      const newTest = new testModel({
       userName : req.body.userName,
       email:req.body.email,
       password:req.body.password
      });
  
      await testModel.findOne( {userName: newTest.userName})
      .then(test=>{
          if(test) res.status(500).send('This itinerary is repeated')
      })
  
      await newTest.save()
      .then(test => {
        res.send(test)
        });
    } catch{
          (err => {
          res.status(500).send("Server error")}) 
      }
    });

    router.post("/prova",(req,res)=>res.send("ciao"))



module.exports = router;