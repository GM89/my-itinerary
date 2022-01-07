import React, { useState, useEffect } from 'react';
import {fetchAllItineraries, fetchItineraryByCity} from '../store/actions/itineraryActions.js';
import { useSelector, useDispatch, ReactReduxContext } from "react-redux";
import {useParams} from 'react-router-dom';
import {Activity} from './Activity'
import {ItineraryItem} from './ItineraryItem'
import {connect} from "react-redux";


     
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
      let itineraryIdString = x._id.valueOf()

      console.log(itineraryIdString, 'itineraryIdString ')
      console.log(typeof itineraryIdString)
      //hay Berlin Standard y Berlin Alternativo
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
        <p>itinerary of Wakanda will be here</p>
        <p> {city}</p>

        <div>
          {mapping}
        </div>
      </div>  

      )
} 

  
export default connect()(Itinerary);


 


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