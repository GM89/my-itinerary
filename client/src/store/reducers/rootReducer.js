import { combineReducers } from "redux";
import {citiesReducers} from "./citiesReducer.js"
import {itinerariesReducers} from "./itinerariesReducer.js"
import {activitiesReducers} from "./activitiesReducer.js"
import errorReducer from "./errorReducer.js";
import { loginReducer } from "./loginReducer.js";


const rootReducer = combineReducers(
    { cities: citiesReducers,
      error: errorReducer,
      itineraries: itinerariesReducers,
      activities: activitiesReducers,
      members: loginReducer,            
    }
    );

export default rootReducer;