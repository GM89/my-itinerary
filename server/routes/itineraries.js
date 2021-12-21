const express = require('express')

const router = express.Router()
const itineraryModel = require('../model/ItineraryModel')

//test route:

router.get('/prova', (req, res) => {
    console.log("ciaoo mondo!")
    res.send(
        { msg: 'prova' }
        );
})
/*en server.jsapp.use('/itineraries', require('./routes/itineraries'))
la ruta será itineraries/all */ 
  //------get----itineraries/all----------

  router.get('/all',
    (req, res) => {
        itineraryModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
});

//-------GET  itineraries/barcelona -------------------
router.get("/:name_city", (req, res) => {
    itineraryModel.find({ name_city : req.params.name_city }, (err, data) => {
      if (err) res.send(err);
      res.send(data);
    });
  });


// POST /itineraries/barcelona-------------------------------
router.post("/:name_city", (req, res) => {
    const newItinerary = new itineraryModel({
      title: req.body.title,

      picture: req.body.picture,
      rating: req.body.rating,
      duration: req.body.duration,
      price: req.body.price,
      hashtag: req.body.hashtag,    
      name_city: req.body.name_city,
 
    });
    newItinerary.save().then(itinerary => res.send(itinerary));
  });
  
  

module.exports = router;
