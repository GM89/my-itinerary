module.exports.isAuth = (req, res, next) =>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(401).json({message: "You are not authorize to view this page"});
    }
}

/*
router.get("/protected-route", (req,res,next)=>{
  if(req.isAuthenticated()){
    res.send("<h2>you are authenticated</h2>")
  } else{
    res.send("<h2>you are NOT authenticated</h2>")
  }
})
*/
