const express = require('express')
const router = express.Router()
const memberModel = require('../model/memberModel')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');




router.post("/", async (req, res) => {
    try{
      const newMember = new memberModel({
       userName : req.body.userName,
       email:req.body.email,
       password:req.body.password,
       profilePicture:req.body.profilePicture
      });
  
      await memberModel.findOne( {email: newMember.email})
      .then(memberFound=>{
        bcrypt.compare(newMember.password,memberFound.password,(err,res)=>{

            if(err){
               throw err;
            }
          else  if(!res){
                console.log("is not res")
            }
            else{
                console.log("match!")
            }

        }) 
       
         
      })


/*     
  bcrypt.compare(req.body.password, user.password, function(err, res) {
        if (err){
          // handle error
        }
        if (res)
          // Send JWT
        } else {
          // response is OutgoingMessage object that server response http request
          return response.json({success: false, message: 'passwords do not match'});
        }
      });
 */



      
  
      await newMember.save()
      .then(each_member => {
        res.send(each_member)
        });
    } catch{
          (err => {
          res.status(500).send("Server error")}) 
      }
    });
    module.exports = router;

