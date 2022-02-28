import axios from "axios";
//note that in order to access data we select "data.data"
const port = "5000";
const url = `http://localhost:${port}/`;



/// -----fetching  comments from MongoDB
export function commentsByItineraryId(itineraryIdToCheck) {
  return async (dispatch) => {
    dispatch(commentBegin());
    try {
      const response = await axios.get(
        "http://localhost:5000/comments/byitid/" + itineraryIdToCheck
      );
      const fetchedData = await response;
      console.log("fetchedata", fetchedData);

      dispatch(commentSuccess(fetchedData.data));
    } catch (error) {
      dispatch(commentFailure(error));
    }
  };
}
/// ----- posting a comment
export function commentsPostByItinerary(commentObject ) {
  return async (dispatch) => {
    // dispatch(commentBegin());
    try {

           

       const response =  await fetch('http://localhost:5000/comments/post', {
          method: 'POST',
          headers:{
            'Content-Type':'application/json',  
          },
          body: JSON.stringify({
            itineraryId: commentObject.itineraryId,
            text: commentObject.text, 
            memberId: commentObject.memberId,
            timestamp: commentObject.timestamp,
            profilePicture: commentObject.profilePicture,
            userName: commentObject.userName,
            city: commentObject.city
          })
       })
      
      
      
      const commentPosted = await response;
      console.log("commentBeingPosted", commentPosted);
      dispatch(commentPostSuccess(commentPosted));
    } catch (error) {
      console.log("error when posting comment", error)
      dispatch(commentPostFailure(error));
    }
  };
}

//--------------------------
//actions
export const commentBegin = () => ({
  type: "COMMENT_FETCH_BEGIN",
});

export const commentSuccess = (data) => ({
  type: "COMMENT_FETCH_SUCCESS",
  payload: {
    comments: data,
  },
});

export const commentFailure = (err) => ({
  type: "COMMENT_FETCH_FAILURE",
  payload: {
    error: err,
  },
});

export const commentPostFailure = (err) => ({
  type: "COMMENT_POST_FAILURE",
  payload: {
    error: err,
  },
});

export const commentPostSuccess = (postedMessage) => ({
  type: "COMMENT_POST_SUCCESS",
  payload: {
    comments: postedMessage,
  },
});
