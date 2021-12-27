let activitiesInit = []
// actions refer to cityAction.js
const initialState = {
  activities: activitiesInit,
  //loading: false,
}




const activitiesReducers = (state = initialState, action) => {
  switch(action.type) {

     case 'FETCH/get_list_success':
      return{
                 ...state,
                activities: action.payload,
                //loading: false
            }
 
    default:
    return state
  }
}


export {activitiesReducers}
