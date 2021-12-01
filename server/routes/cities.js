const express = require('express')

const router = express.Router()

//test route:

router.get('/test', (req, res) => {
    console.log("ciaoo mondo!")
    res.send(
        { msg: 'Cities test route.' }
        );
})



module.exports = router;


