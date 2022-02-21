import React, {useState} from 'react'
import {GoogleAuthButton} from './GoogleAuthButton'
import {authGoogle, loginUserBegin, loginUserSuccess, loginUserFailure, loginOutSuccess} from './../store/actions/loginActions'
import {useSelector, useDispatch} from 'react-redux'

import {Link} from 'react-router-dom'





 function Login({ setToken }) {
  const dispatch = useDispatch();

  const [loginInState, setLoginInState] = useState()
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
    dispatch(loginUserBegin);
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
      }).then(async(response) => {
        console.log("response en la fetch del front", response)
        const data = await response.json();
        if(data.success === true) {
          console.log("response en la fetch del front", data)
          console.log("respuesta existosa?", data.success)
          console.log("data!!!!!")
          console.log(data)      
          dispatch(loginUserSuccess(data.userData, data.tokenData));

        } else if (data.success ===false){
          console.log("the error is catched", data.success )
          dispatch(loginUserFailure(data.message));
        }
      })
 
  }


  async function loginOut() {
    console.log("loggin out")
    /* prevent the default behaviour caused by the event itself.
     Keep it from attempting to refresh the browser as the browser
    tries to submit the form to some back end server that doesn't exist */
        await fetch('http://localhost:5000/auth/logout', {
        method: 'GET',
        headers:{
          'Content-Type':'application/json',  
        },
        withCredentials: true,
      }).then (setLoginInState(false))
      .catch(error => console.error("ERROR: ", error));
  }

    
  
  return(
    <div>
    <section class="vh-100">
      
    <h2>
      <b>Login</b>
    </h2>
          <GoogleAuthButton/>
          <p>User status logged in: {loggedIn? "You are connected":"You are  NOT connected"}</p>

    {loginInState? "" :" you are logged out"}

    <div class="container py-5 h-100">
      <div class="row d-flex align-items-center justify-content-center h-100">
        <div class="col-md-8 col-lg-7 col-xl-6">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image"/>
        </div>
        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          <form onSubmit={e=> loginUser(e)}>
           {/*  <!-- Email input --> */}
           <div class="form-outline mb-4">
            <input type="text" 
                id="form1Example13"
                class="form-control form-control-lg" 
                onChange={
                e => setUser((x)=>({ ...x, userName:e.target.value,
                }))}  />
              <label  htmlFor="name" class="form-label" for="form1Example13">Username</label>
            </div>


            <div class="form-outline mb-4">
            <input type="email" 
                id="form1Example13"
                class="form-control form-control-lg" 
                onChange={
                e => setUser((x)=>({ ...x, email:e.target.value,
                }))}  />
              <label htmlFor="email" class="form-label" for="form1Example13">Email address</label>
            </div>
  
           {/*  <!-- Password input --> */}
            <div class="form-outline mb-4">
            <input type="password" 
                id="form1Example23" 
                class="form-control form-control-lg"
                onChange={
                e => setUser((x)=>({ ...x, password:e.target.value,
                }))}  />
              <label class="form-label" for="form1Example23">Password</label>
            </div>
  
            <div class="d-flex justify-content-evenly">
            {/* <!-- Submit button --> */}
              <button type="submit" class="btn btn-primary btn-lg btn-block">Sign in</button>
              <button type="button" onClick={loginOut} class="btn btn-primary btn-lg btn-block">Sign Out</button>
           
           
            </div>
            <div class="divider d-flex align-items-center my-4">
            <p class="text-center fw-bold mx-3 mb-0 text-muted">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
              <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              <p class="text-center fw-bold mx-3 mb-0 text-muted" >
                Back to <Link to="/"  className="btn-flat waves-effect">Home</Link>
              </p>
            </div>
  
  
          </form>
        </div>
      </div>
    </div>
  </section>


    </div>  )
  }





export {Login}
