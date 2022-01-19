const express = require('express')
const router = express.Router()
const Member = require('../model/MemberModel')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

/*we find a {Member} based on the email writen on the form (req.body.email), and when found we'll name it loggedMember
Then, we compare the password wrote by the user (re.body.passowrd) with that from our database (loggedMember.password)
We save the result in "comparison".*/
router.post("/login", async (req, res) => {
  try {
    const loggedMember = await Member.findOne({ email: req.body.email, userName: req.body.userName });
    console.log(loggedMember);
    if (loggedMember) {
      const comparison = await bcrypt.compare(req.body.password, loggedMember.password);
      if (comparison) {
        //   ..... further code to maintain authentication like jwt or sessions
        res.send("Auth Successful");
      } else {
        res.send("Wrong password.");
      }
    } else {
      res.send("Wrong email or user name");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
});


// router.post("/", async (req, res) => {
//     try{
//       const newMember = new memberModel({
//        userName : req.body.userName,
//        email: req.body.email,
//        password: req.body.password,
//        profilePicture: req.body.profilePicture
//       });
  
//       const memberFound = await memberModel.findOne( {email: newMember.email})
//       if (memberFound) {
//             .then(memberFound=>{
//               bcrypt.compare(newMember.password,memberFound.password,(err,res)=>{

      
//                 if(err){
//                   throw err;
//                 }
//               else  if(!res){
//                     res.send("not success")
//                 }
//           }
//             else{
//               res.send(res)
//             }
            
           

//         }) 
       
         
//       })


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



      
  
    //   await newMember.save()
    //   .then(each_member => {
    //     res.send(each_member)
    //     });
    // } catch{
    //       (err => {
    //       res.status(500).send("Server error")}) 
    //   }
    // });
    module.exports = router;

