let citiesInit = []
// actions refer to cityAction.js
const initialState = {
  cities: citiesInit,
  //loading: false,
}




const citiesReducers = (state = initialState, action) => {
  switch(action.type) {

     case 'FETCH_CITIES/get_list_success':
      return{
                 ...state,
                cities: action.payload,
                //loading: false
            }
 
    default:
    return state
  }
}


export {citiesReducers}

/*
Reducers 3 laws:
They should only calculate the new state value based on the state and action arguments
They are not allowed to modify the existing state. Instead, they must make immutable updates, by copying the existing state and making changes to the copied values.
They must not do any asynchronous logic, calculate random values, or cause other "side effects" */


/*

const itineraryReducers = createSlice({
    name: 'itineraryReducers',
    initialState,
    reducers: {

      FETCH_INIT(state) {
       
        loading:true,
      },
      GET_CITIES_LIST_SUCCESS(state, action) {
       
        cities: action.payload,
        loading: false

      },
      GET_CITIES_LIST_FAILURE(state, action){
        
      }      

      
        postUpdated(state, action) {
        const { id, title, content } = action.payload
        const existingPost = state.find(post => post.id === id)
        if (existingPost) {
          existingPost.title = title
          existingPost.content = content
        }
      }
    }
  )

  //actions are saved in slice.actions.FETCH_INIT
  export const { FETCH_INIT, GET_CITIES_LIST_SUCCESS, GET_CITIES_LIST_FAILURE } = itineraryReducers.actions

  
export const {fetchData} = itineraryReducers.actions;
  */
  