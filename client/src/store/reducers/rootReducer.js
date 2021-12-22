import { combineReducers } from "redux";
import {citiesReducers} from "./citiesReducer.js"
import {itinerariesReducers} from "./itinerariesReducer.js"
import errorReducer from "./errorReducer.js";


const rootReducer = combineReducers(
    { cities: citiesReducers,
      error: errorReducer,
      itineraries: itinerariesReducers,
      
    }
    );

export default rootReducer;