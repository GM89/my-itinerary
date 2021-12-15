import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers/rootReducer";


/* You pass your root reducer to the Redux createStore function, which returns a store object.
You then pass this object to the react-redux Provider component, which is rendered at the 
top of our component tree. This ensures that any time we connect to Redux in our app, 
the store is available to our components.*/
 
const middleware = thunk;


const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );

  export {store};