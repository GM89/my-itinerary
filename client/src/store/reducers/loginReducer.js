

// actions refer to loginActions.js
const initialState = {
  user: {
    favorites: [],
    _id: "",
    userName: "",
    email: "",
    profilePicture: "",
  
  },
  loading: false,
  loadingFav: false,
  errorMsg: "",
  popup: false,
  loggedIn: false,
}





const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN_USER_BEGIN':
      return {
        user: {
          favorites: [],
          _id: "",
          userName: "",
          email: "",
          profilePicture: "",
        
        },
        loading: true,
        loadingFav: true,
        errorMsg: "",
        popup: false,
        loggedIn: false,
        
      };
    
      case 'LOGIN_USER_SUCCESS':
        return {
          ...state,
          user: action.payload,
          loading: false,
          popup: false,
          loggedIn: true
        };
      case 'LOGIN_USER_FAILURE':
        return {
          ...state,
          loading: false,
          popup: true,
          loggedIn: false
        };
 
    default:
    return state
  }
}


export {loginReducer}




