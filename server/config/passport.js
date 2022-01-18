//Import Express
const express = require('express')
const app = express()
//Import the main Passport and Express-Session library
const passport = require('passport')
const session = require('express-session')
//Import the secondary "Strategy" library
const LocalStrategy = require('passport-local').Strategy

//middleware
app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
  }))
  // This is the basic express session({..}) initialization.
  app.use(passport.initialize()) 
  // init passport on every route call. 
  app.use(passport.session())    
  // allow passport to use "express-session".It creates a req.session where the auth used will be stored



  
//Step 3: Use Passport to define the Authentication Strategy
  // The "authUser" is a function that we will define later will contain the steps to authenticate a user, and will return the "authenticated user".
  passport.use(new LocalStrategy (authUser))
  //--------------------------------------------
//Step 3a: Define the “authUser” function to get authenticated Users
  //ERROR!!!!!!!!!!!!!!!
 authUser = (user, password, done) => {
    //Search the user, password in the DB to authenticate the user
    //Let's assume that a search within your DB returned the username and password match for "Kyle".
       let authenticated_user = { id: 123, name: "Kyle"}
       return done (null, authenticated_user )
    }

    /* done() method in jQuery is used to add handlers which are to be called when the deferred object is resolved
    1. If the user not found in DB, 
    done (null, false)
    2. If the user found in DB, but password does not match, 
    done (null, false)
    3. If user found in DB and password match, 
    done (null, {authenticated_user})*/
/* So in effect during "serializeUser", the PassportJS library adds the authenticated user to end of the "req.session.passport" object.
This is what is meant by serialization.
This allows the authenticated user to be "attached" to a unique session.  */

//Step 4: Serialize and De-Serialize (authenticated) users

passport.serializeUser( (userObj, done) => {
    done(null, userObj)
})


/* Deserialize a user:Now anytime we want the user details for a session, 
we can simply get the object that is stored in “req.session.passport.user.{..}”.*/
passport.deserializeUser((userObj, done) => {
    done (null, userObj )
})
/* 2. When the done (null, user) function is called in the deserializeUser(), Passport JS takes this last object attached to "req.session.passport.user.{..}", and attaches it to "req.user" i.e "req.user.{..}"
In our case, since after calling the done() in "serializeUser" we had req.session.passport.user.{id: 123, name: "Kyle"}, 
calling the done() in the "deserializeUser" will take that last object that was attached to req.session.passport.user.{..} and attach to req.user.{..} 
i.e. req.user.{id: 123, name: "Kyle"}*/


//Step 5: Use passport.authenticate() as middleware on your login route
//routers
/*app.post ("/login", passport.authenticate('local', {
   successRedirect: "/dashboard",
   failureRedirect: "/login",
}))*/


/*Step 6: Use the “req.isAuthenticated()” function to protect logged in routes
Create a function as follows,*/

checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/login")
}

//Now you can use this function as middleware to protect your routes as follows,
app.get("/dashboard", checkAuthenticated, (req, res) => {
  res.render("dashboard.ejs", {name: req.user.name})
})

//Step 7: Use “req.logOut()” to clear the sessions object

app.delete("/logout", (req,res) => {
    req.logOut()
    res.redirect("/login")
    console.log(`-------> User Logged out`)
 })

 