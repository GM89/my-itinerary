import React, {useState} from 'react'

import {GoogleAuthButton} from './GoogleAuthButton.js'

import{Link} from 'react-router-dom'


 function Register() {
  const [stateError, setStateError] = useState("")

   const[user, setUser] = useState({
     userName:"",
     email:"",
     password:"",
     profilePicture:"",
   });



  async function registerUser(event) {
  
    /* prevent the default behaviour caused by the event itself.
     Keep it from attempting to refresh the browser as the browser
    tries to submit the form to some back end server that doesn't exist */
    console.log('USUARIO', user)
    event.preventDefault()
   
    await fetch('http://localhost:5000/members/add', {
        method: 'POST',
        headers:{
          'Content-Type':'application/json',  
        },
        body: JSON.stringify({
          userName: user.userName,
          email: user.email, 
          password: user.password,
          profilePicture: user.profilePicture,
        })
     }).then((response)=> {  
        console.log("response aquí", response);                   // first then()
        if(response.ok){
          return response.json();         
        }if(response.status === 501){  
          setStateError("User already registered")
          throw new Error('error 501. User already registered.');
        } else{
          setStateError("Something went wrong.")
          throw new Error('Something went wrong.');
        }
      }) .catch(
        error =>{ console.error("Error here: ", error)}
      ) 
     }

  //This doesn't work
    //const prova = () => { return (<div>buenos días!</div>) }
  
  return(     
    
     <div className="container">
        <p>{stateError}</p>
        {/*  <GoogleAuthButton/> */}
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b>
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form onSubmit={e=> registerUser(e)}>
                <div className="input-field col s12">
                  <input type="text" 
                    onChange={
                    e => setUser((x)=>({ ...x, userName:e.target.value,}))
                    } />
                  <label htmlFor="name">Username</label>
                </div>
                <div className="input-field col s12">
                  <input type="text" 
                    onChange={
                      e => setUser((x)=>({ ...x, profilePicture:e.target.value,}))
                    } />
                    <label htmlFor="name">Picture</label>
                </div>

                
                <div className="input-field col s12">
                  <input type="email" 
                      onChange={
                        e => setUser((x)=>({ ...x, email:e.target.value,}))
                    }/>
                  <label htmlFor="email">Email</label>
                </div>



                <div className="input-field col s12">
                  <input type="password" onChange={
                      e => setUser((x)=>({ ...x, password:e.target.value,}))
                    }  />
                  <label htmlFor="password">Password</label>
                </div>

                <div className="input-field col s12">
                  <input type="password"   
                    id="password2" 
                    onChange={
                      e => setUser((x)=>({ ...x, password:e.target.value,}))
                    } />
                    <label htmlFor="password2">Confirm Password</label>
                </div>

                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Sign up
                  </button>
                </div>
              </form>
          </div>
        
        </div>
      </div>

  )
}





export {Register}
