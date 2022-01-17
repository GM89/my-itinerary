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
       password:req.body.password,
       profilePicture:req.body.profilePicture
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



      // UPDATE /members/:memberId
  router.put("/:memberId", /*auth,*/ (req, res) => {
    const updatedMember = {
        userName : req.body.userName,
        email:req.body.email,
        password:req.body.password,
        profilePicture:req.body.profilePicture
    };
    memberModel.findOneAndUpdate({ _id: req.params.memberId }, updatedMember)
      .then(member => res.json({ success: true }))
      .catch(() => res.status(404).json({ success: false }));
  });
  
    // DELETE /members/:memberId--------------------------------------
    router.delete("/:memberId", /*auth,*/ (req, res) => {
        memberModel.deleteOne({ _id: req.params.memberId })
        .then(member => res.json({ success: true }))
        .catch(err => res.status(404).json({ success: false }));
    });









module.exports = router;