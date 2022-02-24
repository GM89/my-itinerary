let activitiesInit = []
// actions refer to cityAction.js
const initialState = {
  activityLoaded: false,
  activities: activitiesInit,
 
}




const activitiesReducers = (state = initialState, action) => {
  switch(action.type) {

    case 'FETCH_ACTIVITY/fetch_init':
      return{
                 ...state,
                 activityLoaded: false,           
                 activities:[]
                
            }

     case 'FETCH_ACTIVITIES/get_list_success':
      return{
                 ...state,
                 activityLoaded: true,
                 activities:state.activities.concat(action.payload.data),               
            }
  case 'ERROR_ACTIVITES/get_list_failure':
    return{
                ...state,
                activityLoaded: false,
               msg: action.payload.action.msg,

          }

 
    default:
    return state
  }
}


export {activitiesReducers}
