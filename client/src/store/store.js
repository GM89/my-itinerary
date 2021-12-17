
import rootReducer from './reducers/rootReducer.js';
import { createStore, applyMiddleware } from "redux";

import { composeWithDevTools } from 'redux-devtools-extension'


import {middleware} from './middlewares/middleware.js'

let initialState = []
const store = createStore(
  rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export {store}

/* You pass your root reducer to the Redux createStore function, which returns a store object.
You then pass this object to the react-redux Provider component, which is rendered at the 
top of our component tree. This ensures that any time we connect to Redux in our app, 
the store is available to our components.*/
 

