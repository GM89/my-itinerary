
import React from 'react';
import './App.css'; 
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import {Home} from './components/Home.js'
import {Cities} from './components/cities/Cities.js'
import { AllItineraries } from './components/AllItineraries';
import { ItinerariesByCity } from './components/ItinerariesByCity';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Navbar } from './components/Navbar';
import {useSelector, useDispatch} from 'react-redux'


//routes és equivalent a Switch

//Switch is deprecated, instead we use Routes.
function App() {
      const isLoggedIn = useSelector(state => state.members.members)
  return (      
      <div className="App">
            <BrowserRouter>
                  <Navbar/>
            
                  <Routes>         
                        <Route path='/' element={<Home/>}> </Route>
                        <Route exact path='/cities' element={<Cities/>}> </Route>
                        <Route exact path='/itineraries/all' element={<AllItineraries/>}> </Route>
                        <Route exact path='/cities/itineraries/:city' element={<ItinerariesByCity/>}> </Route>
                        <Route exact path='/login' element={<Login/>}> </Route>
                        <Route exact path='/register' element={<Register/>}> </Route>
                        
                  </Routes>
            </BrowserRouter>
      </div>

  )
}

export default App;
