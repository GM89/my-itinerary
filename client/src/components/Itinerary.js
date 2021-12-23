import React, { useState, useEffect } from 'react';
import {fetchAllItineraries, fetchItineraryByCity} from '../store/actions/itineraryActions.js';
import { useSelector, useDispatch } from "react-redux";
import {useParams} from 'react-router-dom';


            /*   console.log(dispatch, 'el dispatch') */
            // Los estados se cargan antes que el componente se cargue, 
            //const [filter, setFilter] = useState('')
                /* useEffect(() => {
                    getData()
                    }, [])*/
              
            // Dentro del map hay código html. Neceistaríamos indicar el resultado dentro de un return? No es necesario.
            /* Dado que map ya está dentro de un return.
            Analizamos el siguiente pedazo de código:
            filter(objectitineraries => data[objectitineraries].itineraries.toLowerCase().includes(filter.toLowerCase()))
            objectitineraries es cada object que está en la array data.
            Queremos ir a la propiedad itineraries de cada objeto 
            data[objectitineraries].itineraries Ssnos permite hacer eso. Aqui data[objectitineraries] actúa como un índice. 
            //const [data, setData] = useState('')
            */

     
function Itinerary(props) {


  const {city} = useParams();
  const cityLowerCase = city.toLowerCase()
  console.log(city.toLowerCase(), "useparams city")


/* Note! There could have been asyncrony troubles here. itineraryData intitial data is read and mounted before useEffect, meaning that fetch has not been done
therefore we don't have access to entire state object, but just partially. 
state.itineraries.itineraries.data.data (where the itineraries are) can't be read right now because fetch hasn't download it. 
So initialy itineraryData is dummy variable that only gets itineraries.itineraries.data*/
const itineraryData = useSelector(state => state.itineraries.itineraries.data)
const dispatch = useDispatch();
console.log(itineraryData,'itineraryData here');

/*UseEffect invoked immediately after a component is mounted.it is also called everytime its dispatch change its values, that is, when there's a new fetch
On the previous section topic, here we have access to whole already fetched state, so we could go itineraries.itineraries.data.data. Where do we do this?
In the itinerariesActions fetchitineraries() downloads the whole state as 'fetchedData', and now we can access to where the itineraries are.
that is the ".data" key-value, and we do this when we write fetchedData.data.
 */


  useEffect( () => {
   const loadItineraries = async()=> {
    await dispatch(fetchItineraryByCity(cityLowerCase))
   };
   loadItineraries();
  },[dispatch] );

  

 let mapping =  ((itineraryData  && itineraryData.map(x=>{
  
      return (
        <tr key={x.title}>
          <td> {x.title}</td> 
          <td> {x.name_itineraries}</td> 
          <td> {x.rating}</td> 
          <td> <img  className="photoUrl" src={x.picture} alt={x.name_itineraries}/> </td>
        </tr> ) })) ) 

  return (
   <div>
    <p>itinerary of Wakanda will be here</p>
    <p> {city}</p>

    <table>
     {mapping}
    </table>
  </div>  

  )
} 

  



export  {Itinerary};


