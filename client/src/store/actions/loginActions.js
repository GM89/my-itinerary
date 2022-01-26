

import axios from 'axios';
//note that in order to access data we select "data.data"
const port = '5000';
const url = `http://localhost:${port}/`;


export const authGoogleUser = () => {
    return async dispatch =>  {
      const  response = await axios.get(`${url}auth/google`);
      const fetchedData = await response;
      
      dispatch(login_sucess(fetchedData));
    }}


    //actions 
const login_sucess = (token)=> {
 return {
   type: 'LOGIN_SUCCESS',
   payload: {
     token
   }
}
 

const login_failure = ()=> {
    return {
      type: 'LOGIN_FAILURE',
    }
}
