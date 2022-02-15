

import axios from 'axios';
//note that in order to access data we select "data.data"
const port = '5000';
const url = `http://localhost:${port}/`;




export function  authLocal(event, user){

event.preventDefault()
return async dispatch =>  {
    dispatch(loginUserBegin());
  try{
    const  response =  await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers:{
          'Content-Type':'application/json',  
        },
        body: JSON.stringify({
          userName: user.userName,
          email: user.email, 
          password: user.password,
        })
      }).then(data => data.json())
      .catch(error => console.error("ERROR: ",error));
      
    const fetchedData = await response;
    console.log(fetchedData)
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
 


