import logo from './logo.svg';
import React from 'react';
import './App.css'; 
import { BrowserRouter, Route, Routes, NavLink , Link} from 'react-router-dom'
import {Landing} from './components/Landing.js'
import {Cities} from './components/Cities.js'

//routes és equivalent a Switch

//Switch is deprecated, instead we use Routes.
function App() {
  return (
    
     

      <BrowserRouter>

              <div className="App">
                      <div><Link to="landing"> Landing aquí </Link> </div>
                      <div><Link to="cities"> Cities aquí </Link></div>
                      <div><p>Hola!</p></div>

                      
                </div>
            <Routes>         
                  <Route path='/landing' element={<Landing/>}> </Route>
                  <Route path='/cities' element={<Cities/>}> </Route>
            </Routes>
      </BrowserRouter>
            
            

      

  )
}

export default App;
