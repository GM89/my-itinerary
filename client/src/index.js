import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux";

import {store} from './store/store.js'

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


/* you pass your root reducer to the Redux createStore function, which returns a store object.
You then pass this object to the react-redux Provider component, which is rendered at the 
top of our component tree. This ensures that any time we connect to Redux in our app, 
the store is available to our components.
 
*/
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);