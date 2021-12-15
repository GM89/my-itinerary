
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';


import thunk from 'redux-thunk';



// Dispacth the fetch 
//(port = '5000') => 
const getCitiesList = async dispatch => {
  dispatch(actionFetchInit());
  try {
    const port = '5000';
    const url = `http://localhost:${port}/`;
    axios.get(`${url}cities/all`)
      .then((response) => {
        let citiesData = response.data;
        //setData(citiesData);
        console.log(citiesData, 'cities data DENTRO de axios')
      })
      dispatch(actionFetchSuccess(citiesData));

  } catch (error) {
    console.error(`error ${error}`)
    dispatch(actionFetchFailure(error.message));
  }
}


//Fetch actions 


 const actionFetchInit = () => {
  return {
    type: FETCH_INIT
  }
}

const actionFetchSuccess = (data)=> {
  return {
    type: GET_CITIES_LIST_SUCCESS,
    payload: {
      data
    }
  }
}

 const actionFetchFailure = errormessage => {
  return {
    type: GET_CITIES_LIST_FAILURE,
    payload: {
      errormessage
    }
  }
}






/*

const getData = () => {
  const url = "http://localhost:`{port}`/";
  axios.get(`${url}cities/all`)
    .then((response) => {
      let citiesData = response.data;
      setData(citiesData);
      console.log(citiesData, 'cities data DENTRO de axios')
    })

    .catch(error => console.error(`error ${error}`))
}

function actionFetch() {
  // Los estados se cargan antes que el componente se cargue, 

  const [data, setData] = useState('')

  const [filter, setFilter] = useState('')


  // React to only execute the side effect once (at mount time), by passing an empty array:

  //Con axios importamos los datos con y los guardamos dentro del state.data

  const getData = () => {
    const url = "http://localhost:5000/";
    axios.get(`${url}cities/all`)
      .then((response) => {
        let citiesData = response.data;
        setData(citiesData);
        console.log(citiesData, 'cities data DENTRO de axios')
      })

      .catch(error => console.error(`error ${error}`))
  }

// Esto quizás no es neceseario porque cada vez que cambie el estado se actualiza el componeente igualmente, sin necesidad de useEffect
        useEffect(() => {
          getData()
           }, [])
      
  return data

}*/
  

  






  export {getCitiesList};