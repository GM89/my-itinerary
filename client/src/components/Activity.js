import React, { useState, useEffect } from 'react';
import {fetchAllActivities, fetchActivitiesByItineraryId, fetchActivityById} from '../store/actions/activityActions.js';
import { useSelector, useDispatch } from "react-redux";
import {useParams} from 'react-router-dom';


     
function Activity(props) {

    const activitiesData = useSelector(state => state.activities.activities.data)
    const dispatch = useDispatch();

    useEffect( () => {
        console.log(props.itineraryId, "itineraryId")
       const loadActivities = async()=> {
        await dispatch(fetchActivitiesByItineraryId(props.itineraryId))
       };
       loadActivities();
      },[dispatch] );
    
  

      let mapping =  ((activitiesData  && activitiesData.map(x=>{
      
            return (
                <div>
                    <p>{x.activityName}</p>
                    <p>{x.location}</p>
                    <p>{x.duration  }</p>
                    <p>{x.comments}</p>
                </div>

            )
      })))


return(

    <p>activitiesData</p>
    
)
}


export {Activity}