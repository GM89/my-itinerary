import React, { useState } from 'react'
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';



//Fetch actions 

//note that in order to access data we select "data.data"
const port = '5000';
const url = `http://localhost:${port}/`;
const selectedCity = 'Barcelona'
const selectedItineraryId= ''

export const fetchAllItineraries = () => {
return async dispatch =>  {
  const  response = await axios.get(`${url}itineraries/all`);
  const fetchedData = await response;
  
  dispatch(actionFetchSuccess(fetchedData.data));
}}




const actionFetchInit = () => {
    return {
      type: 'FETCH/fetch_init',
    }
  }
  
   const actionFetchSuccess = (data)=> {
    return {
      type: 'FETCH/get_list_success',
      payload: {
        data
      }
    }
  }
  
   
    const actionFetchFailure = (msg, status, id) => {
    return {
      type: 'ERROR/get_list_failure',
      payload: {
         msg, status, id 
     }
    }
  }
  
  