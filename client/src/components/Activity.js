import React, { useState, useEffect } from 'react';
import {fetchAllActivities, fetchActivitiesByItineraryId, fetchActivityById} from '../store/actions/activityActions.js';
import { useSelector, useDispatch } from "react-redux";
import {useParams} from 'react-router-dom';


     
function Activity(props) {

    const activitiesData = useSelector(state => state.activities.activities.data)
    const dispatch = useDispatch();

    useEffect( () => {
        console.log(props.itineraryId, "props.itineraryId,ciao ")
        const loadActivities = async()=> {
        await dispatch(fetchActivitiesByItineraryId(props.itineraryId))
               
       };
       loadActivities();
       console.log(loadActivities(),'prova')
      },[dispatch] );
    
  

      let mapping =  ((activitiesData  && activitiesData.map(x=>{
      
            return (
                <div>
                    <h3>{x.activityName}</h3>
                    <p>{x.itineraryId}</p>
                    <p>{x.location}</p>
                    <p>{x.duration}</p>
                    <p>{x.comments}</p>
                </div>

            )
      })))


return(
    <div>
          
        {mapping}
    </div>
    
)
}


export {Activity}