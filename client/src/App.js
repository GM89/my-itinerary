
import React from 'react';
import './App.css'; 
import { BrowserRouter, Route, Routes, NavLink , Link} from 'react-router-dom'
import {Home} from './components/Home.js'
import {Cities} from './components/cities/Cities.js'
import { Itineraries } from './components/Itineraries';
import { Itinerary } from './components/Itinerary';
import { Login } from './components/Login';

//routes és equivalent a Switch

//Switch is deprecated, instead we use Routes.
function App() {
  return (
    
     

      <BrowserRouter>
      



              <div className="App">

                    <div className="miNavbar">

                                    <nav class="navbar navbar-expand-lg  navbar-dark bg-dark">
                                    <a class="navbar-brand" href="#">Navbar</a>
                                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                          <span class="navbar-toggler-icon"></span>
                                    </button>

                                          <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                          <ul class="navbar-nav mr-auto">
                                                <li class="nav-item ">
                                                      <a class="nav-link" href="/">Home </a>
                                                </li> 
                                                <li class="nav-item ">
                                                      <a class="nav-link" href="/cities">Cities </a>
                                                </li> 
                                                <li class="nav-item ">
                                                      <a class="nav-link" href="itineraries/all">All itineraries </a>
                                                </li>
                                                <li class="nav-item ">
                                                      <a class="nav-link" href="/login">Login</a>
                                                </li> 


                                          </ul>
                                          </div>
                                    </nav>
                    </div>

                        

                      {/* <div><Link to="home"> home aquí </Link> </div>
                      <div><Link to="cities"> Cities aquí </Link></div>
                      <div><Link to="itineraries/all"> Itineraries aquí </Link></div>
                      <div><p>Hola!</p></div>
 */}
                      
                </div>
            <Routes>         
                  <Route path='/' element={<Home/>}> </Route>
                  <Route exact path='/cities' element={<Cities/>}> </Route>
                  <Route exact path='/itineraries/all' element={<Itineraries/>}> </Route>
                  <Route exact path='/cities/itineraries/:city' element={<Itinerary/>}> </Route>
                  <Route exact path='/login' element={<Login/>}> </Route>
                  
            </Routes>
      </BrowserRouter>
            
            

      

  )
}

export default App;
