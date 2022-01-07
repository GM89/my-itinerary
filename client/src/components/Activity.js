import React, {  useEffect } from 'react';
import { fetchActivitiesByItineraryId} from '../store/actions/activityActions.js';
import { useSelector, useDispatch } from "react-redux";

     
function Activity(props) {

    const activitiesData = useSelector(state => state.activities.activities.data)
    const dispatch = useDispatch();

    useEffect( () => {
              console.log(props.itineraryId, "props.itineraryId ")
        const loadActivities = async()=> {
        await dispatch(fetchActivitiesByItineraryId(props.itineraryId))
        console.log()
               
       };
       loadActivities();
      },[dispatch] );

  

      let mapping =  ((activitiesData  && activitiesData.map(x=>{
      
        console.log(x.activityName, "activity Id")
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