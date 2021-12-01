const express = require('express')

const router = express.Router()

//test route:

router.get('/prova', (req, res) => {
    console.log("ciaoo mondo!")
    res.send(
        { msg: 'prova' }
        );
})



module.exports = router;
