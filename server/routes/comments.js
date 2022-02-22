const express = require('express')

const router = express.Router()
const CommentModel = require('./../model/CommentModel.js')
const checkLoggedIn = require('./../middlewares/checkLoggedIn.js')

const passport = require("passport");


//route /comments/all
router.get(
  "/all",checkLoggedIn,
  async (req, res) => {
//    let itineraryIdRequested = req.params.name;
   await CommentModel
      .find({}) 
      .then(data => {
        console.log("get all by Itinerary data", data)
        res.send(data);
      })
      .catch(err => res.send(err));
  });
//route /comments/allByItinerary

/*get comment by ItineraryId*/
//REST API query must be in json. It will return a json automatically.
router.get(
  "/allByItinerary",
  async (req, res) => {
//    let itineraryIdRequested = req.params.name;
  
   await CommentModel
      .findOne({itineraryId: req.body.itineraryId }) 
      .then(data => {
        console.log("get all by Itinerary data", data)
        res.send(data);
      })
      .catch(err => res.send(err));
  });




  router.get("/:itineraryId", (req, res) => {
    CommentModel.find({itineraryId: req.params.itineraryId}, (err, data) => {
      if (err) res.send(err);
      res.send(data);
    });
  });
//route /comments/add
/*add a comment CREATE*/
router.post(
  "/post",
  async (req, res) => {
    const newComment = new CommentModel({
      itineraryId: req.body.itineraryId,
      text: req.body.text,
      memberId: req.body.memberId,
      timestamp: req.body.timestamp,
      profilePicture:req.body.profilePicture,
     });
     //When we save the comment, it retuns its id


   /*   await CommentModel.findOne( {itineraryId: newComment.itineraryId})
     .then(each_comment=>{
         if(each_comment) res.status(501).send({message:'This comment already exists'})
     }) */
    await newComment
      .save()
      .then(comment => {
        res.send(comment);
      })
      .catch(err => {
        res.send(err);
      });
  }
);

// comments/put----------------------------
router.put("/put/:commentId", async (req, res) => {
  const updatedComment = {
    itineraryId: req.body.itineraryId,
    text: req.body.text,
    memberId: req.body.memberId,
    timestamp: req.body.timestamp,
    profilePicture:req.body.profilePicture,
  };
  await CommentModel.findOneAndUpdate({ _id: req.params.commentId }, updatedComment)
    .then(comment => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});


  // DELETE /comments/delete/:itineraryId--------------------------------------
  router.delete("/delete/:itineraryId", /*auth,*/ (req, res) => {
      CommentModel.deleteOne({ itineraryId: req.params.itineraryId })
      .then(comment => res.json({ success: true }))
      .catch(err => res.status(404).json({ success: false }));
  });



module.exports = router;




