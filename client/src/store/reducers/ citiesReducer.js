import { createSlice } from '@reduxjs/toolkit'


import React, { useState } from 'react'
import {getCitiesList} from '../actions/cityActions'

const initialState = [];
/*const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' }
]*/



const itineraryReducers = createSlice({
    name: 'itineraryReducers',
    initialState,
    reducers: {
      FETCH_INIT(state) {},
      GET_CITIES_LIST_SUCCESS(state, action) {
      },
      GET_CITIES_LIST_FAILURE(state, action){}      

      /*,
        postUpdated(state, action) {
        const { id, title, content } = action.payload
        const existingPost = state.find(post => post.id === id)
        if (existingPost) {
          existingPost.title = title
          existingPost.content = content
        }*/
      }
    }
  )



  
export const {fetchData} = itineraryReducers.actions;
  ;
  /*
Reducers 3 laws:
They should only calculate the new state value based on the state and action arguments
They are not allowed to modify the existing state. Instead, they must make immutable updates, by copying the existing state and making changes to the copied values.
They must not do any asynchronous logic, calculate random values, or cause other "side effects" */