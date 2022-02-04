import React, {useState} from 'react'

import {GoogleAuthButton} from './GoogleAuthButton.js'


 function Register() {
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

    event.preventDefault()

    
    await fetch('http://localhost:5000/members/add', {
        method: 'POST',
        headers:{
          //We post the data as json, and that's why we set it up content-type application/json
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          userName: user.userName,
          email: user.email, 
          password: user.password,
          profilePicture: user.profilePicture,
        })
      }).then(data => data.json())

   
  }

//This doesn't work
  //const prova = () => { return (<div>buenos días!</div>) }
  



  return(
    <div>
  
     
     {/*  <GoogleAuthButton/> */}

    <div className="login-wrapper">
      <h1>Register</h1>
      <p>Welcome to our app, please register.</p>
      <form onSubmit={e=> registerUser(e)}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUser((x)=>({ ...x, userName:e.target.value,}))} />
        </label>< br/>
        <label>
          <p>Profile Picture</p>
          <input type="text" onChange={e => setUser((x)=>({ ...x, profilePicture:e.target.value,}))} />
        </label>< br/>
        <label>
          <p>Email</p>
          <input type="email" onChange={e => setUser((x)=>({ ...x, email:e.target.value,}))}  />
        </label>< br/>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setUser((x)=>({ ...x, password:e.target.value,}))}  />
        </label>< br/>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    </div>

   
  )
}





export {Register}
