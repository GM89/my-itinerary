

// actions refer to loginActions.js
const initialState = {
  user: {
    favorites: [],
    _id: "",
    userName: "",
    email: "",
    token: "",
    profilePicture: "",
  
  },
  loading: false,
  loadingFav: false,
  errorMsg: "",
  //popup: false,
  loggedIn: false,
}





const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN_USER_BEGIN':
      return {
        user: {
          //favorites: [],
          _id: "",
          userName: "",
          email: "",
          password: "",
          profilePicture: "",
          favorites:[],
        
        },
        token: "",
        loading: true,
        //loadingFav: true,
        errorMsg: "",
        //popup: false,
        loggedIn: false,
        
      };
    
      case 'LOGIN_USER_SUCCESS':
        return {
          ...state,
          user: action.payload.user,
          token:action.payload.token,
          loading: false,
          //popup: false,
          loggedIn: true
        };
      case 'LOGIN_USER_FAILURE':
        return {
          ...state,
          loading: false,
          errorMsg: action.payload.error,
          //popup: true,
          loggedIn: false
        };
 
    default:
    return state
  }
}


export {loginReducer}




