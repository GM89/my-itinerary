import React, {useState} from 'react'

import {GoogleAuthButton} from './GoogleAuthButton.js'

/*
async function loginUser(credentials) {
 return fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}*/


 function Login({ setToken }) {
  const [name, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setUserEmail]= useState();

  async function registerUser(event) {
    /* prevent the default behaviour caused by the event itself.
     Keep it from attempting to refresh the browser as the browser
    tries to submit the form to some back end server that doesn't exist */
    event.preventDefault()
    await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        name,
        email, 
        password,
      })
      .then(data => data.json())
    })
  }

//This doesn't work
  //const prova = () => { return (<div>buenos días!</div>) }
  



  return(
    <div>
  
      <p> Google Login</p>
      <GoogleAuthButton/>
  
    
    <div className="login-wrapper">
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>< br/>
        <label>
          <p>Email</p>
          <input type="email" onChange={e => setUserEmail(e.target.value)} />
        </label>< br/>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>< br/>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    </div>

   
  )
}





export {Login}
