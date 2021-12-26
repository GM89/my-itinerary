const express = require('express')

const router = express.Router()
const activityModel = require('../model/ActivityModel.js')
const db = require("../keys").mongoURI;

//test route:

router.get('/prova', (req, res) => {
    console.log("ciaoo mondo!")
    res.send(
        { msg: 'activites.js works!' }
        );
})
/*en server.jsapp.use('/itineraries', require('./routes/itineraries'))
la ruta será itineraries/all */ 

// ---------------GET -------------------------
  //------get----itineraries/all----------

  router.get('/all',
    (req, res) => {
        activityModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
});

//-------GET  activities by activitId -------------------
router.get("/:activityId", (req, res) => {
  
    activityModel.find({ activityId : req.params.activityId }, (err, data) => {
      if (err) res.send(err);
      res.send(data);
    });
  });

  ///-------------------ESTO NO FUNCIONA
  //-------GET  activities by _id -------------------
/*
var id = req.params._id;       
var o_id = new ObjectId(id);


router.get("/id/:_id", (req, res) => {
  
  activityModel.find({_id: o_id} , (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
})*/
  
//-------GET  ALL activities by city -------------------

  router.get("/city/:city", (req, res) => {
    activityModel.find({ name_city : req.params.city }, (err, data) => {
      if (err) res.send(err);
      res.send(data); 
    });
  });
            
                   

// POST /itineraries/barcelona-------------------------------
router.post("/:activity_id", (req, res) => {
    const newActivity = new activityModel({
      activityName: req.body.activityName,
      name_city: req.body.name_city,
      rating: req.body.rating,
      activityId: req.body.activityId,
      location: req.body.location,
      duration: req.body.duration,
      price: req.body.price,
      comments: req.body.comments,   
    });

    activityModel.findOne( {activityId: newActivity.activityId})
    .then(activity=>{
        if(activity) res.status(500).send('This activity is repeated')
    })

    newActivity.save().then(activity => res.send(activity));
  });
  
//UPDATE itineraries/barcelona ----------------------

  // UPDATE /activities/:activityId
  router.put("/:activityId", /*auth,*/ (req, res) => {
    const updatedActivity = {
      activityName: req.body.activityName,
      name_city: req.body.name_city,
      activityId: req.body.activityId,
      location: req.body.location,
      rating: req.body.rating,
      duration: req.body.duration,
      price: req.body.price,
      comments: req.body.comments,    
    
    };
    activityModel.findOneAndUpdate({ activityId: req.params.activityId }, updatedActivity)
      .then(activity => res.json({ success: true }))
      .catch(() => res.status(404).json({ success: false }));
  });
  
    // DELETE /itineraries/:itineraryId--------------------------------------
    router.delete("/:activityId", /*auth,*/ (req, res) => {
      activityModel.deleteOne({ _id: req.params.activityId })
        .then(activity => res.json({ success: true }))
        .catch(err => res.status(404).json({ success: false }));
    });

module.exports = router;
