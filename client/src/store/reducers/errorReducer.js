//actins refer to cityAction.js


const initialState = {
    msg: {},
    status: null,
    id: null
}


const  errorReducer  = (state = initialState, action) => {
    switch (action.type) {
        
    case 'ERROR/get_list_failure':
      return{
        ...state,
        msg: action.payload.message,
        status: action.payload.status, 
        id: action.payload.id,
            }
    
    case 'ERROR_CITIES/get_list_failure':
      return{
        ...state,
        msg: action.payload.message,
        status: action.payload.status, 
        id: action.payload.id
          }

      case 'ERROR_ITINERARIES/get_list_failure':
        return{
          ...state,
          msg: action.payload.message,
          status: action.payload.status, 
          id: action.payload.id
            }

      case 'ERROR_ACTIVITES/get_list_failure':
        return{
          ...state,
          msg: action.payload.message,
          status: action.payload.status, 
          id: action.payload.id
            }

    default:
    return state
  }
}

export default errorReducer;