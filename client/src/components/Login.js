import React, {useState} from 'react'
import {GoogleAuthButton} from './GoogleAuthButton'
import {authGoogle} from './../store/actions/loginActions'
import {useSelector, useDispatch} from 'react-redux'

import {Link} from 'react-router-dom'





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
   <div className="container">
    <GoogleAuthButton/>

    <p>User status logged in: {loggedIn? "You are connected":"You are  NOT connected"}</p>

 
  <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> 
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form onSubmit={e=> loginUser(e)}>

            <div className="input-field col s12">
            <input type="text" 
              onChange={
                e => setUser((x)=>({ ...x, userName:e.target.value,}))
               } />
                <label htmlFor="name">Username</label>
              </div>

               <div className="input-field col s12">
              <input type="email" 
                onChange={
                e => setUser((x)=>({ ...x, email:e.target.value,
                }))}  />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field col s12">
              <input type="password" 
                onChange={
                e => setUser((x)=>({ ...x, password:e.target.value,
                }))}  />
                <label htmlFor="password">Password</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <div>
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
                  Login
                </button>
                </div>
                <div>
                 <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={loginOut}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable red accent-3"
                >
                  Login Out
                </button>
                </div>

        </div>
      </form>
    </div>
    <br/>
    
    <br/>
    {loginInState? "" :" you are logged out"}

    </div>

   
  )
  }





export {Login}
