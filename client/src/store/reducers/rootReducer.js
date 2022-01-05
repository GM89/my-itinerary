import { combineReducers } from "redux";
import {citiesReducers} from "./citiesReducer.js"
import {itinerariesReducers} from "./itinerariesReducer.js"
import {activitiesReducers} from "./activitiesReducer.js"
import errorReducer from "./errorReducer.js";


const rootReducer = combineReducers(
    { cities: citiesReducers,
      error: errorReducer,
      itineraries: itinerariesReducers,
      activities: activitiesReducers,
      
    }
    );

export default rootReducer;