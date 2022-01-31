 //Middlware ----

 const checkLoggedIn = (req, res, next)=>{
    if (req.isAuthenticated()) { 
      console.log("Hey, you're already logged in")
      res.send({message: " ala verga todo el código!"})
      
      next()
     }
     console.log("Hey, you're NOT logged in")
    next()
  }



  module.exports = checkLoggedIn;

