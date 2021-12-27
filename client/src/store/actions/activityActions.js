import React, { useState } from 'react'
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';



//Fetch actions 

//note that in order to access data we select "data.data"
const port = '5000';
const url = `http://localhost:${port}/`;


export const fetchAllActivities = () => {
return async dispatch =>  {
  const  response = await axios.get(`${url}activities/all`);
  const fetchedData = await response;
  
  dispatch(actionFetchSuccess(fetchedData.data));
}}

//------fetch by itineraryId
//`${url}activities/it_it/${itineraryId}`
export const fetchActivitiesByItineraryId = (itineraryId) => {
  return async dispatch =>  {
        const  response = await axios.get(`http://localhost:5000/activities/it_id/${itineraryId}`);
    const fetchedData = await response;
    dispatch(actionFetchSuccess(fetchedData.data));
  }}
  

//------fetch by _id
//`${url}activities/id/${_id}`
export const fetchActivityById = (_id) => {
  return async dispatch =>  {
        const  response = await axios.get(`http://localhost:5000/activities/id/${_id}`);
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
  
  