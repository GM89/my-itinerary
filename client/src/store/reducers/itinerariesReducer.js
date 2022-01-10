let itinerariesInit = []
// actions refer to cityAction.js
const initialState2 = {
  itineraryLoaded: false,
  itineraries: itinerariesInit,
  //loading: false,
}




const itinerariesReducers = (state = initialState2, action) => {
  switch(action.type) {



    case 'FETCH_ITINERARY/fetch_init':
      return{
                 ...state,
                itineraryLoaded: false,
                itineraries: []
                                
            }

     case 'FETCH_ITINERARIES/get_list_success':
      return{
                 ...state,
                itineraryLoaded: true,
                itineraries: action.payload,
              
            }
 
    default:
    return state
  }
}


export {itinerariesReducers}
