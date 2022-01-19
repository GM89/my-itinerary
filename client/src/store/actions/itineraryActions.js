
import axios from 'axios';



//Fetch actions 

//note that in order to access data we select "data.data"
const port = '5000';
/* const url = `http://localhost:${port}/`; */


export const fetchAllItineraries = () => {
return async dispatch =>  {
  const  response = await axios.get("http://localhost:5000/itineraries/all");
  const fetchedData = await response;
  
  dispatch(actionFetchSuccess(fetchedData.data));
}}


//`${url}itineraries/${city}`
export const fetchItineraryByCity = (city) => {
  return async dispatch =>  {
    dispatch(actionFetchInit());
    //city.toLowerCase()
    const  response = await axios.get(`http://localhost:5000/itineraries/${city}`);
    const fetchedData = await response;
    dispatch(actionFetchSuccess(fetchedData.data)); 
  }}
  
  

const actionFetchInit = () => {
    return {
      type: 'FETCH_ITINERARY/fetch_init',
    }
  }
  
   const actionFetchSuccess = (data)=> {
    return {
      type: 'FETCH_ITINERARIES/get_list_success',
      payload: {
        data
      }
    }
  }
  
   
  /*   const actionFetchFailure = (msg, status, id) => {
    return {
      type: 'ERROR_ITINERARIES/get_list_failure',
      payload: {
         msg, status, id 
     }
    }
  } */
  
  