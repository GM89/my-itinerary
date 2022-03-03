import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import {GoogleAuthButton} from './GoogleAuthButton'
import {authGoogle, loginUserBegin, loginUserSuccess, loginUserFailure, loginOutSuccess} from './../store/actions/loginActions'
import {useSelector, useDispatch} from 'react-redux'

import {Link} from 'react-router-dom'






 function Login({ setToken }) {

  const navigate = useNavigate()
  const dispatch = useDispatch();


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
          console.log("response en la fetch del front", data);
          console.log("respuesta existosa?", data.success);
          console.log("data!!!!!");
          console.log(data);      
          dispatch(loginUserSuccess(data.userData, data.tokenData));
          alert("You have logged in")

        } else if (data.success ===false){
          console.log("the error is catched", data.success);    
          dispatch(loginUserFailure(data.message));
          alert("There has been an error. Please try again");
        }
      })
 
  }


  async function loginOut() {
    console.log("loggin out")
    /* prevent the default behaviour caused by the event itself.
     Keep it from attempting to refresh the browser as the browser
    tries to submit the form to some back end server that doesn't exist */
        await fetch("http://localhost:5000/auth/logout", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
          .then(() => {
            dispatch(loginOutSuccess());
            alert("You have logged out");
            navigate('/home');
          })
          .catch((error) => console.error("ERROR: ", error));
  }

    
  
  return (
     <section class="vh-100" style={{ "background-color": "#eee" }}>
     <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
      
            <div class="card text-black w-150" style={{ "border-radius": "25px" }}>
           
              <div class="card-body p-md-10">
              
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Login
                </p>

                <GoogleAuthButton />
                <p className="text-center fw-bold mx-3 mb-0 text-muted">
                  User status logged in:
                  {loggedIn ? "You are logged in" : "You are NOT connected"}
                </p>

                <div className="container py-5 h-100">
                  <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                        className="img-fluid"
                        alt="Phone image"
                      />
                    </div>
                    {loggedIn ? (
                      ""
                    ) : (
                      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <form onSubmit={(e) => loginUser(e)}>
                          {/*  <!-- Email input --> */}
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="form1Example13"
                              className="form-control form-control-lg"
                              onChange={(e) =>
                                setUser((x) => ({
                                  ...x,
                                  userName: e.target.value,
                                }))
                              }
                            />
                            <label
                              htmlFor="name"
                              className="form-label"
                              for="form1Example13"
                            >
                              Username
                            </label>
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              type="email"
                              id="form1Example13"
                              className="form-control form-control-lg"
                              onChange={(e) =>
                                setUser((x) => ({
                                  ...x,
                                  email: e.target.value,
                                }))
                              }
                            />
                            <label
                              htmlFor="email"
                              className="form-label"
                              for="form1Example13"
                            >
                              Email address
                            </label>
                          </div>

                          {/*  <!-- Password input --> */}
                          <div className="form-outline mb-4">
                            <input
                              type="password"
                              id="form1Example23"
                              className="form-control form-control-lg"
                              onChange={(e) =>
                                setUser((x) => ({
                                  ...x,
                                  password: e.target.value,
                                }))
                              }
                            />
                            <label className="form-label" for="form1Example23">
                              Password
                            </label>
                          </div>
                          <div className="d-flex justify-content-evenly">
                            {/* <!-- Submit button --> */}
                            <button
                              type="submit"
                              class="btn btn-primary btn-lg btn-block"
                            >
                              Sign in
                            </button>
                          </div>

                          <div className="divider d-flex align-items-center my-4">
                            <p className="text-center fw-bold mx-3 mb-0 text-muted">
                              Don't have an account?{" "}
                              <Link to="/register">Register</Link>
                            </p>
                            <p className="text-center fw-bold mx-3 mb-0 text-muted">
                              OR
                            </p>
                            <p className="text-center fw-bold mx-3 mb-0 text-muted">
                              Back to{" "}
                              <Link to="/" className="btn-flat waves-effect">
                                Home
                              </Link>
                            </p>
                          </div>
                        </form>
                      </div>
                    )}

                    <div className="d-flex justify-content-evenly p-4">
                      <button
                        type="button"
                        onClick={loginOut}
                        className="btn btn-primary btn-lg btn-block"
                      >
                        Sign Out
                      </button>
                    </div>
                  
                </div>
              </div>
            </div>
          </div>
           </div>
          </div>
        </div>
      </section>
    
  );
  }





export {Login}
