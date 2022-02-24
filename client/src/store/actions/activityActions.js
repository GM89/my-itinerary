

import axios from 'axios';



//Fetch actions 

//note that in order to access data we select "data.data"
const port = '5000';
const url = `http://localhost:${port}/`;


export const fetchAllActivities = () => {
return async dispatch =>  {
  dispatch(actionFetchInit()) 
  try{
    const  response = await axios.get(`${url}activities/all`);
    const fetchedData = await response;
    
    dispatch(actionFetchSuccess(fetchedData.data));
  }catch(e){
    dispatch(actionFetchFailure)
  }
}}

//------fetch by itineraryId
//`${url}activities/it_it/${itineraryId}`



export const fetchActivitiesByItineraryId = (itineraryId) => {
    return async dispatch =>  {
     /*  dispatch(storeItineraryId(itineraryId)); */
      dispatch(actionFetchInit()) //1

      try{ //2
        const  response = await axios.get(`http://localhost:5000/activities/it_id/${itineraryId}`);
        const fetchedData = await response;
   
        dispatch(actionFetchSuccess(fetchedData.data));
      }catch(e){
        dispatch(actionFetchFailure)
      }
        /*  const responseIt = await axios.get() */
    }}


  

export const actionFetchInit = () => {
    return {
      type: 'FETCH_ACTIVITY/fetch_init',
      
    }
  }
  
   const actionFetchSuccess = (data)=> {
    return {
      type: 'FETCH_ACTIVITIES/get_list_success',
      payload: {
        data
      }
    }
  }
  
   
    const actionFetchFailure = (msg, status, id) => {
    return {
      type: 'ERROR_ACTIVITES/get_list_failure',
      payload: {
         msg, status, id 
     }
    }
  }
  
  