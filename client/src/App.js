import logo from './logo.svg';
import React from 'react';
import './App.css'; 
import { BrowserRouter, Route, Routes, NavLink , Link} from 'react-router-dom'
import {Landing} from './components/Landing.js'

//routes és equivalent a Switch

//Switch is deprecated, instead we use Routes.
function App() {
  return (
    
        <div className="App">
          <Link to="landing"> Landing aquí </Link>
          <div><p>Hola!</p></div>


            <Routes>
                
                  <Route path='/landing' element={<Landing/>}> </Route>
            </Routes>
            
            

        </div>

  )
}

export default App;
