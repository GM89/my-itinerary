let itinerariesInit = []
// actions refer to cityAction.js
const initialState = {
  itineraries: itinerariesInit,
  //loading: false,
}




const itinerariesReducers = (state = initialState, action) => {
  switch(action.type) {

     case 'FETCH_ITINERARIES/get_list_success':
      return{
                 ...state,
                itineraries: action.payload,
              
                //loading: false
            }
 
    default:
    return state
  }
}


export {itinerariesReducers}
