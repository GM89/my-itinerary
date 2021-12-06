
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



// We import our schema for further get instances
const cityModel = require('../model/cityModel')

//
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

///


module.exports = router;


