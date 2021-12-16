import { combineReducers } from "redux";
import {itineraryReducers} from "./citiesReducer.js"
import errorReducer from "./errorReducer.js";


const rootReducer = combineReducers(
    { cities: itineraryReducers,
      error: errorReducer,
    }
    );

export default rootReducer;