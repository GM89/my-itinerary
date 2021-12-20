import React, { useState, useEffect } from 'react';
import {fetchCities} from '../store/actions/cityActions.js';

import { useSelector, useDispatch } from "react-redux";





function Cities() {
//UseEffectis invoked immediately after a component is mounted, but not rendered
//const [data, setData] = useState('')


const datos = useSelector(state => state.cities.cities.data)
const dispatch = useDispatch();


console.log(datos,'il cavaliere davi')


  useEffect( () => {
   const loadCities = async()=> {
   await dispatch(fetchCities())
   };
   loadCities();
  },[dispatch] );


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

*/


  return (


   <div>

    <p>cities.js is here</p>

    {datos 
    && datos.map(x=>{
     return x.city
   } )}
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
        
        
              {Object.keys(data).filter(objectCity => data[objectCity].city.toLowerCase().startsWith(filter.toLowerCase()))
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