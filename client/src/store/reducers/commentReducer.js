

// actions refer to loginActions.js
const initialState = {
  allComments: [],
  loading: false,
  errorComments:{},
}



const commentProva = {
  itineraryId: "999999",
  text: ['fuck this'],
  memberId: "1354354354",
  timestamp: "CurrentDate",
  profilePicture: "none",
  userName: "Rocco Sifredi",
  city: "Polonia",
};



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
      
      case 'COMMENT_POST_BEGIN':
        return {
          ...state,
          loading: true,
        };


      //potser concat has d'incloure [] 
    case 'COMMENT_POST_SUCCESS':
      return {
        ...state,
        allComments: state.comments.allComments.concat([action.payload.comments]),
        loading: false,
      };

    case 'COMMENT_POST_FAILURE':
      return {
        ...state,
        loading: "false",
        errorComments: action.payload.error,
      };

    default:
    return state
  }
}


export {commentReducer}




