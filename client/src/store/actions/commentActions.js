

import axios from 'axios';
//note that in order to access data we select "data.data"
const port = '5000';
const url = `http://localhost:${port}/`;




export function commentsByItineraryId(itineraryIdToCheck) {
    return async dispatch =>  {

          dispatch(commentBegin());
      try{
      const response = await axios.get('http://localhost:5000/comments/byitid/'+ itineraryIdToCheck);
      const fetchedData = await response;
      console.log("fetchedata", fetchedData)

      dispatch(commentSuccess(fetchedData.data));
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
    


