
 const  checkLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.json("not authenticated");
  }
  



  module.exports = checkLoggedIn;

