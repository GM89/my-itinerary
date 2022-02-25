import React, {useEffect } from 'react';
import {fetchItineraryByCity} from '../store/actions/itineraryActions.js';
import { useSelector, useDispatch } from "react-redux";
import {useParams} from 'react-router-dom';

import {ItineraryItem} from './ItineraryItem'
import {connect} from "react-redux";

           
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



     
function ItinerariesByCity(props) {


  const {city} = useParams();


/* Note! There could have been asyncrony troubles here. itineraryData intitial data is read and mounted before useEffect, meaning that fetch has not been done
therefore we don't have access to entire state object, but just partially. 
state.itineraries.itineraries.data.data (where the itineraries are) can't be read right now because fetch hasn't download it. 
So initialy itineraryData is dummy variable that only gets itineraries.itineraries.data*/
const itineraryData = useSelector(state => state.itineraries.itineraries.data)
    const dispatch = useDispatch();
    /*UseEffect invoked immediately after a component is mounted.it is also called everytime its dispatch change its values, that is, when there's a new fetch
    On the previous section topic, here we have access to whole already fetched state, so we could go itineraries.itineraries.data.data. Where do we do this?
    In the itinerariesActions fetchitineraries() downloads the whole state as 'fetchedData', and now we can access to where the itineraries are.
    that is the ".data" key-value, and we do this when we write fetchedData.data.
    */


      useEffect( () => {
  
      const loadItineraries = async()=> {
        await dispatch(fetchItineraryByCity(city))
      };
      loadItineraries();
      },[dispatch] );

      

    let mapping =  ((itineraryData  && itineraryData.map(x=>{
      let itineraryIdString = x._id.valueOf()
          return (
            <div id = "itinerary">                             
                <ItineraryItem itineraryId={itineraryIdString}
                  title={x.title}
                  price={x.price}
                  rating={x.rating}
                  picture={x.picture}/>
              </div>

            
            ) })) ) 

      return (
      <div>
        <h1>{capitalizeFirstLetter(city)}</h1>

        <div className="container">
        <div class="row row-cols-1 g-4  px-5">
          {mapping}
        </div>
        </div>
      </div>  

      )
} 

  
export default connect()(ItinerariesByCity);

export  {ItinerariesByCity};

