import React, {useState} from 'react'
import {GoogleAuthButton} from './GoogleAuthButton'
import {authGoogle} from './../store/actions/loginActions'
import {useSelector, useDispatch} from 'react-redux'


 function Login({ setToken }) {

  

  const[loginInState, setLoginInState] = useState()

  const loggedIn = useSelector(state => state.members.loggedIn);   
  
  

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
          'Content-Type':'application/json',  
        },
        body: JSON.stringify({
          userName: user.userName,
          email: user.email, 
          password: user.password,
        })
      }).then(data => {
        data.json()
        setLoginInState(true)
      })
      .catch(error => console.error("ERROR: ", error));
 
  }


  async function loginOut() {
    /* prevent the default behaviour caused by the event itself.
     Keep it from attempting to refresh the browser as the browser
    tries to submit the form to some back end server that doesn't exist */
        await fetch('http://localhost:5000/auth/logout', {
        method: 'GET',
        headers:{
          'Content-Type':'application/json',  
        },
        withCredentials: true,
      }).then (   setLoginInState(false))
      .catch(error => console.error("ERROR: ", error));

 
  }

    
  
  return(
    <div>
  <GoogleAuthButton/>

  <p>User status logged in: {loggedIn? "You are connected":"You are  NOT connected"}</p>

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
    <br/>

    <button onClick={loginOut}>Login Out</button>
    <br/>
    {loginInState? "" :" you are logged out"}

    </div>

   
  )
  }





export {Login}
