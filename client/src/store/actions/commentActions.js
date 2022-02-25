

import axios from 'axios';
//note that in order to access data we select "data.data"
const port = '5000';
const url = `http://localhost:${port}/`;




export function commentsByItinerary(itineraryIdToCheck) {
    return async dispatch =>  {
      
          dispatch(commentBegin());
      try{
      await fetch('http://localhost:5000/comments/allByItinerary', {
        method: 'GET',
        headers:{
          'Content-Type':'application/json',  
        },
        body: JSON.stringify({
          itineraryId: itineraryIdToCheck,
        })
      }).then((response) => {
  
      const fetchedData = response;
    
      dispatch(commentSuccess(fetchedData));
      })
    
      }  catch(error){
        dispatch(commentFailure(error));
      }
    }
  }

//--------------------------
    //actions 
    export const commentBegin = () => ({
      type: 'COMMENT_FETCH_BEGIN',
    });
    
    export const commentSuccess = (data) => ({
      type: 'COMMENT_FETCH_SUCCESS',
      payload:  {
        comments: data,
      }
    });
    
    export const commentFailure = err => ({
      type: 'COMMENT_FETCH_FAILURE',
      payload: {
        error: err,
      }
    });
    


