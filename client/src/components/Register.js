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
  <section class="vh-100" style={{"background-color": "#eee"}}>
    <div class="container h-100">
    <p>{stateError}</p>
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style={{"border-radius": "25px"}}>
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register form</p>
                  <p className="grey-text text-darken-1">
                  Already have an account? <Link to="/login">Log in</Link>
                </p>
                  <form onSubmit={e=> registerUser(e)} class="mx-1 mx-md-4">

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                      <input type="text"  
                      id="form3Example1c" 
                      class="form-control"
                      onChange={
                      e => setUser((x)=>({ ...x, userName:e.target.value,}))
                      } /> 
                      <label class="form-label" for="form3Example1c">Your Name</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                      <input type="text"  
                      id="form3Example1c" 
                      class="form-control"
                      onChange={
                        e => setUser((x)=>({ ...x, profilePicture:e.target.value,}))
                      } /> 
                      <label class="form-label" for="form3Example1c">Profile picture</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">

                      <input type="email" 
                        id="form3Example3c" 
                        class="form-control"
                        onChange={
                          e => setUser((x)=>({ ...x, email:e.target.value,}))
                         }/> 
                        <label class="form-label" for="form3Example3c">Your Email</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                      <input type="password"  
                      id="form3Example4c" 
                      class="form-control" 
                      onChange={
                        e => setUser((x)=>({ ...x, password:e.target.value,}))
                        }/>
                        <label class="form-label" for="form3Example4c">Password</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="password"  
                        id="form3Example4c" 
                        class="form-control" 
                        onChange={
                        e => setUser((x)=>({ ...x, password:e.target.value,}))
                        }/>
                        <label class="form-label" for="form3Example4cd">Repeat your password</label>
                      </div>
                    </div>

                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="submit" class="btn btn-primary btn-lg">Register</button>
                    </div>

                  </form>

                </div>
                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" class="img-fluid" alt="Sample image"/>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</section>



  )
}





export {Register}
