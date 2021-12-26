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

// ---------------GET -------------------------
  //------get----itineraries/all----------

  router.get('/all',
    (req, res) => {
        itineraryModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
});

//-------GET  itineraries by city /barcelona -------------------
router.get("/:name_city", (req, res) => {
    itineraryModel.find({ name_city : req.params.name_city }, (err, data) => {
      if (err) res.send(err);
      res.send(data);
    });
  });
  

            ///-------------------ESTO NO FUNCIONA
          // ---------------GET  ONE SINGLE ITINERARY BY ID -------------
            router.get('/:id',
            (req, res) => {
                  let itineraryRequested = req.params.id;
                  itineraryModel.findOne({ _id: itineraryRequested })
                    .then(itinerary => {
                        res.send(itinerary)
                        
                    })
                    .catch(err => console.log(err));
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

    itineraryModel.findOne( {title: newItinerary.title})
    .then(title=>{
        if(title) res.status(500).send('This itinerary is repeated')
    })

    newItinerary.save().then(itinerary => res.send(itinerary));
  });
  
//UPDATE itineraries/barcelona ----------------------

  // UPDATE /api/itineraries/:itineraryId
  router.put("/:itineraryId", /*auth,*/ (req, res) => {
    const updatedItinerary = {
      title: req.body.title,
      picture: req.body.picture,
      rating: req.body.rating,
      duration: req.body.duration,
      price: req.body.price,
      hashtag: req.body.hashtag,
      name_city: req.body.name_city,
    };
    itineraryModel.findOneAndUpdate({ _id: req.params.itineraryId }, updatedItinerary)
      .then(itinerary => res.json({ success: true }))
      .catch(() => res.status(404).json({ success: false }));
  });
  
    // DELETE /itineraries/:itineraryId--------------------------------------
    router.delete("/:itineraryId", /*auth,*/ (req, res) => {
      itineraryModel.deleteOne({ _id: req.params.itineraryId })
        .then(itinerary => res.json({ success: true }))
        .catch(err => res.status(404).json({ success: false }));
    });

module.exports = router;
