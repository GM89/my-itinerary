import React, {useState} from 'react'
import { GoogleLoginButton } from 'react-social-login-buttons';
import {authGoogle} from './../store/actions/loginActions'

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
function SocialGoogleSignin(){
  
  window.open("http://localhost:5000/auth/google","_self")
  
}

 function Login({ setToken }) {
   const[user, setUser] = useState({
     userName:"",
     email:"",
     password:"",
   });


  async function loginUser(event) {
    /* prevent the default behaviour caused by the event itself.
     Keep it from attempting to refresh the browser as the browser
    tries to submit the form to some back end server that doesn't exist */
    event.preventDefault()
    
    await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers:{
          "Access-control-allow-origin" : "localhost:5000",
        },
        body: JSON.stringify({
          userName: user.name,
          email: user.email, 
          password: user.password,
        })
      }).then(data => data.json())

      console.log("user has been authenticated")

  }


  



  return(
    <div>
      
      <GoogleLoginButton onClick={SocialGoogleSignin}/>
     
      <GoogleAuthButton/>

    <div className="login-wrapper">
      <h1>Login</h1>
      <form onSubmit={e=> loginUser(e)}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUser((x)=>({ ...x, userName:e.target.value,}))} />
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
          <button  type="submit">Submit</button>
        </div>
      </form>
    </div>
    </div>

   
  )
}





export {Login}
