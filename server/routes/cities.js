
const express = require('express')

const router = express.Router()



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
const cityModel = require('../model/cityModel')

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




router.post('/all', (req, res) => {
    const newCity = new cityModel({
        city: req.body.city,
        country: req.body.country,
        photoUrl: req.body.photoUrl
    })

    cityModel.findOne( {city: cityModel.city})
        .then(city=>{
            if(city) res.status(500).send('This city is repeated')
        })

    newCity.save()
      .then(city => {
      res.send(city)
      })

      .catch(err => {
      res.status(500).send("Server error")}) 
  });
  
  


module.exports = router;


