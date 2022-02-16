

import axios from 'axios';
//note that in order to access data we select "data.data"
const port = '5000';
const url = `http://localhost:${port}/`;




export function  authLocal(){
return async dispatch =>  {
    dispatch(loginUserBegin());
  try{
    const  response = await axios.post(`${url}auth/login`);
    const fetchedData = await response;
    dispatch(loginUserSuccess(fetchedData));
  } catch(error){
    dispatch(loginUserFailure(error));
  }
}}


export function authGoogle() {
    return async dispatch =>  {
      dispatch(loginUserBegin());
    try{
      const  response = await axios.get(`${url}auth/google/`
      );
      const fetchedData = await response;
      
      dispatch(loginUserSuccess(fetchedData));
    } catch(error){
        dispatch(loginUserFailure(error));
      }
    }}

//--------------------------
    //actions 
    export const loginUserBegin = () => ({
      type: 'LOGIN_USER_BEGIN',
    });
    
    export const loginUserSuccess = user => ({
      type: 'LOGIN_USER_SUCCESS',
      payload: user,
    });
    
    export const loginUserFailure = error => ({
      type: 'LOGIN_USER_FAILURE',
      payload: {
        error
      }
    });
 


