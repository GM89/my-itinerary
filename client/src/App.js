import logo from './logo.svg';
import React from 'react';
import './App.css'; 
import { BrowserRouter, Route, Routes, NavLink , Link} from 'react-router-dom'
import {Landing} from './components/Landing.js'
import {Cities} from './components/Cities/Cities.js'
import { Itineraries } from './components/Itineraries';
import { Itinerary } from './components/Itinerary';

//routes és equivalent a Switch

//Switch is deprecated, instead we use Routes.
function App() {
  return (
    
     

      <BrowserRouter>

              <div className="App">
                      <div><Link to="landing"> Landing aquí </Link> </div>
                      <div><Link to="cities"> Cities aquí </Link></div>
                      <div><Link to="itineraries/all"> Itineraries aquí </Link></div>
                      <div><p>Hola!</p></div>

                      
                </div>
            <Routes>         
                  <Route path='/landing' element={<Landing/>}> </Route>
                  <Route exact path='/cities' element={<Cities/>}> </Route>
                  <Route exact path='/cities/itineraries/all' element={<Itineraries/>}> </Route>
                  <Route exact path='/cities/itineraries/:city' element={<Itinerary/>}> </Route>
            </Routes>
      </BrowserRouter>
            
            

      

  )
}

export default App;
