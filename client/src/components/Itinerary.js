import React, { useState, useEffect } from 'react';
import {fetchAllItineraries, fetchItineraryByCity} from '../store/actions/itineraryActions.js';
import { useSelector, useDispatch } from "react-redux";
import {useParams} from 'react-router-dom';
import {Activity} from './Activity'


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
 
  console.log(city, "useparams city")


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
    console.log(city)
   const loadItineraries = async()=> {
    await dispatch(fetchItineraryByCity(city))
   };
   loadItineraries();
  },[dispatch] );

  

 let mapping =  ((itineraryData  && itineraryData.map(x=>{
  console.log(x._id, 'elobjectid')
      return (

        <div id = "itinerary">
            <h1> {x.title}</h1>

            <img  className="photoUrl" src={x.picture} alt={x.title}/> 
                  <p>Price: {x.price}</p> 
                  <p>Rating:{x.rating}</p> 
          <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Activites
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                    {/*   <Activity itineraryId={x._id}/> */}
                                         


                    </div>
                  </div>
              </div>
            </div>
        </div>









/* 
        <tr key={x.title}>
          <td> {x.title}</td> 
          <td> {x.name_itineraries}</td> 
          <td> {x.rating}</td> 
          <td> <img  className="photoUrl" src={x.picture} alt={x.name_itineraries}/> </td>
        </tr>  */
        
        ) })) ) 

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

/*



function  SingleItinerary(props) {
    const id =Object.keys(props.itinerary.title)
 
  return (
    
        <tr key={props.itinerary.title}>
          <td> {props.itinerary.title}</td> 
          <td> City:{props.itinerary.name_city}</td> 
          <td> Rating: {props.itinerary.rating}</td> 
          <td> Duration:{props.itinerary.duration}</td> 
          <td> Price:{props.itinerary.price}</td> 
          <td> hashtag: {props.itinerary.hashtag}</td>           
          <td> <img  className="photoUrl" src={props.itinerary.picture} alt={props.itinerary.name_city}/> </td>
        </tr> ) 
 
      }
let mapping =  ((itineraryData  && itineraryData.map(x=>{
  
  return (
    <tr key={x.title}>
      <td> {x.title}</td> 
      <td> {x.name_itineraries}</td> 
      <td> {x.rating}</td> 
      <td> <img  className="photoUrl" src={x.picture} alt={x.name_itineraries}/> </td>
    </tr> 
    
    ) })) ) */