import React, { useState, useEffect } from 'react';
import {fetchCities} from '../../store/actions/cityActions.js';
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes, NavLink , Link} from 'react-router-dom'

import {City} from './City.js'
            /*   console.log(dispatch, 'el dispatch') */
            // Los estados se cargan antes que el componente se cargue, 
            //const [filter, setFilter] = useState('')
                /* useEffect(() => {
                    getData()
                    }, [])*/
              
            // Dentro del map hay código html. Neceistaríamos indicar el resultado dentro de un return? No es necesario.
            /* Dado que map ya está dentro de un return.
            Analizamos el siguiente pedazo de código:
            filter(objectCity => data[objectCity].city.toLowerCase().includes(filter.toLowerCase()))
            objectCity es cada object que está en la array data.
            Queremos ir a la propiedad city de cada objeto 
            data[objectCity].city Ssnos permite hacer eso. Aqui data[objectCity] actúa como un índice. 
            //const [data, setData] = useState('')
            */

function Cities() {

/* Note! There could have been asyncrony troubles here. CityData intitial data is read and mounted before useEffect, meaning that fetch has not been done
therefore we don't have access to entire state object, but just partially. 
state.cities.cities.data.data (where the cities are) can't be read right now because fetch hasn't download it. 
So initialy cityData is dummy variable that only gets cities.cities.data*/
const cityData = useSelector(state => state.cities.cities.data)
const dispatch = useDispatch();
console.log(cityData,'cityData here');

/*UseEffect invoked immediately after a component is mounted.it is also called everytime its dispatch change its values, that is, when there's a new fetch
On the previous section topic, here we have access to whole already fetched state, so we could go cities.cities.data.data. Where do we do this?
In the cityActions fetchCities() downloads the whole state as 'fetchedData', and now we can access to where the cities are.
that is the ".data" key-value, and we do this when we write fetchedData.data.
 */
/*  */

  useEffect( () => {
   const loadCities = async()=> {
   await dispatch(fetchCities())
   };
   loadCities();
  },[dispatch] );


     
    let mapping =  ((cityData  && cityData.map(x=>{  
      let city = (x.city)
      let cityLowCase = city && city.toLowerCase()  //mirko
      let props = {city: x.city, cityLowcase: cityLowCase, country:cityLowCase, photoUrl:x.photoUrl}
    
          return (
            
            <City {...props}/>
          
            ) 
          })) ) 
      

  return (
   <div>
    <p>cities.js is here</p>
  
    <table>
     {mapping}
    </table>
  </div>  

  )
} 

  



export  {Cities};


/* 
        <input
          type="text"
          placeholder='Filter cities'
          id="filter"
        onChange={event => setFilter(event.target.value) || filter === ''} /> .
        
        
              {Object.+(data).filter(objectCity => data[objectCity].city.toLowerCase().startsWith(filter.toLowerCase()))
        .map(x => <li key={data[x].city}>{data[x].city}</li>)}
        */

    

/*
  <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/cities' component={Landing} />
          </Switch>
        </div>
      </BrowserRouter>

*/