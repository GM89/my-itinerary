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

  //------get--------------

  router.get('/all',
    (req, res) => {
        itineraryModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
});


router.get("/:name_city", (req, res) => {
    itineraryModel.find({ cityName: req.params.name_city }, (err, data) => {
      if (err) res.send(err);
      res.send(data);
    });
  });

//----------------------------------post
/* router.post('/', (req, res) => {
    const newItinerary = new itineraryModel({
        title: req.body.title,
       
        city_id: req.body.city_id,
        price: req.body.price,
        rating: req.body.price,
        picture: req.body.img,
        duration: req.body.duration,
        hashtag:req.body.hashtag
    })

    itineraryModel.findOne({ title: newItinerary.title })
    .then(itinerary => {
        if (itinerary) res.status(500).send("Choose another title, this already exists in the DB")
    }) 
    
    newItinerary.save()
        .then(itinerary => {
        res.send(itinerary)
        })
        .catch(err => {
            res.status(500).send("Error" + err)
        })
}) */
//findone está haciendo una query, busca city: barcelona en la lista de documentos de la colección.
//req.params.name


module.exports = router;
