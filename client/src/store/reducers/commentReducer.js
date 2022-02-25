

// actions refer to loginActions.js
const initialState = {
  comments: [],
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
        comments: action.payload.data,
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




