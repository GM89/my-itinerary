

// actions refer to loginActions.js
const initialState = {
  allComments: [],
  loading: false,
}




const commentReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'COMMENT_FETCH_BEGIN':
      return {
        ...state,
        loading: true,
      }
  
    
    case 'COMMENT_FETCH_SUCCESS':
      return {
        ...state,
        allComments: action.payload.comments,
        loading: false,
  
      };
    case 'COMMENT_FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        errorComments: action.payload.error,
   
      };
   

    default:
    return state
  }
}


export {commentReducer}




