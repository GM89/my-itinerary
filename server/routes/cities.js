
const express = require('express')

const router = express.Router()
const cityModel = require('../model/CityModel')



/*test route:We pass two arguments into our get method. 
The path and a callback function with our request object and 
response object as parameters. */


router.get('/test', (req, res) => {
   
    res.send(
        { msg: 'Cities test route.' }
        );

    res.json({city:"sevilla", country:"spain", photoUrl: "none"})
})



// We import our SCHEMA for further get instances-------------------------------------------------

// GET ROUTE---------------------------------------------------------------------------
//Create route to retrieve all the cities from the database
/*get all cities*/
router.get('/all',
    (req, res) => {
    console.log("router is working")
        cityModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });



/*We create a new instance of our City model and  save it in a variable.
 The model properties will have the values of what I pass in the req.body.
Afterwards,I  call save(). This mongoose method will return a promise. 
If resolved it can send back the object created in my response. If rejected we'll need to debug!*/





router.post('/add',  async  (req, res) => {
    try{
       const newCity = new cityModel({
        city: req.body.city,
        country: req.body.country,
        photoUrl: req.body.photoUrl
       })
    
 await  cityModel.findOne( {city: newCity.city})
        .then(city=>{
            if(city) res.status(500).send('This city is repeated')
        })

    await newCity.save()
      .then(city => {
      res.send(city)
      })
    } catch{
      (err => {
      res.status(500).send("Server error")}) 
  }
      
  });
  
  // -------------------findOne city-------------------------------

//findOne está haciendo una query, busca city: barcelona en la lista de documentos de la colección.
//busca fin
//req.params.name

  router.get('/:name',
  (req, res) => {
        let cityRequested = req.params.name;
        cityModel.findOne({ city: cityRequested })
          .then(city => {
              res.send(city)
              
          })
          .catch(err => console.log(err));
});





router.get('/all',
(req, res) => {
    cityModel.find({})
        .then(files => {
            res.send(files)
        })
        .catch(err => console.log(err));
});

//-------GET  cities/barcelona -------------------
router.get("/:name_city", (req, res) => {
cityModel.find({ name_city : req.params.name_city }, (err, data) => {
  if (err) res.send(err);
  res.send(data);
});
});




// UPDATE /city/:cityId
router.put("/:cityId", /*auth,*/ (req, res) => {
const updatedCity = {
    city: req.body.city,
    country: req.body.country,
    photoUrl: req.body.photoUrl,
};
cityModel.findOneAndUpdate({ _id: req.params.cityId }, updatedCity)
  .then(city => res.json({ success: true }))
  .catch(() => res.status(404).json({ success: false }));
});


  // DELETE /cities/:cityId
  router.delete("/:cityId", /*auth,*/ (req, res) => {
    cityModel.deleteOne({ _id: req.params.cityId })
      .then(city => res.json({ success: true }))
      .catch(err => res.status(404).json({ success: false }));
  });


module.exports = router;




