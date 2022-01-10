import React, {useEffect } from 'react';
import { fetchActivitiesByItineraryId,actionFetchInit} from '../store/actions/activityActions.js';
import { useSelector, useDispatch } from "react-redux";


     
function Activity(props) {

    const activitiesData = useSelector(state => state.activities.activities)
    const dispatch = useDispatch();

    useEffect( () => {
        console.log(props.itineraryId, "props.itineraryId ciao")
             dispatch(actionFetchInit())
        const loadActivities = async()=> {
        dispatch(fetchActivitiesByItineraryId(props.itineraryId))
               
       };
       loadActivities();
      },[dispatch] );

   console.log(activitiesData,'sono id')

      let mapping =  activitiesData && activitiesData.filter(x=>
            x.itineraryId === props.itineraryId
        ).map(y=>{
            
            return (
                <div>
                    <h3>{y.activityName}</h3>
                    <p>Itinerary id: {y.itineraryId}</p>
                    <p>{y.location}</p>
                    <p>{y.duration}</p>
                    <p>{y.comments}</p>
                </div>
            )
           
        })
      
         
       
console.log(mapping,'ciao genis')
return(
    <div>
        {mapping}
    </div> 
)
}


//This is like useSelector.
/* me permite sacar info del state, pero no es lo que quiero ahcer, sino sacar
del componente padre 
const mapsStateToProps = (state, ownProps) => {
    
    const activityItineraryId = ownProps.itineraryId 
    const listOfActivities =  state.activities.filter(x => activities.ItineraryId == ItineraryId)    
    const data =fetchActivitiesByItineraryId(activityItineraryId)

    return {
        listOfActivities
    }
  }

export default connect(mapsStateToProps)(Activity)*/


export {Activity}