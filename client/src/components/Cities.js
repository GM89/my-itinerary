import React, { useState, useEffect } from 'react';
import axios from 'axios';


let dummy_dictionary = [{ 'city': "Madrid ", 'country': 'Spain', 'photoUrl': 'photomadrid' }, { 'city': "lyon ", 'country': 'France', 'photoUrl': 'photolyon' }]



function Cities() {
  // Los estados se cargan antes que el componente se cargue, 

  const [data, setData] = useState('')

  const [filter, setFilter] = useState('')


  // React to only execute the side effect once (at mount time), by passing an empty array:


  //Con axios importamos los datos con y los guardamos dentro del state.data
  const url = "http://localhost:5000/";
  const getData = () => {

    axios.get(`${url}cities/all`)
      .then((response) => {
        let citiesData = response.data;
        setData(citiesData);
        console.log(citiesData, 'cities data DENTRO de axios')
      })

      .catch(error => console.error(`error ${error}`))
  }
  /*
        function createPost() {
          axios
            .post(`${url}cities/all`, {
              city: "Prague",
              country: "Czech republic",
              photoUrl:"https://live.staticflickr.com/2396/2132573649_c987dddc90_b.jpg",
            })
            .then((response) => {
              setData(response.data);
            });
        }
        */

// Esto quizás no es neceseario porque cada vez que cambie el estado se actualiza el componeente igualmente, sin necesidad de useEffect
        useEffect(() => {
          getData()
           }, [])
      
// Dentro del map hay código html. Neceistaríamos indicar el resultado dentro de un return? No es necesario.
/* Dado que map ya está dentro de un return.
Analizamos el siguiente pedazo de código:
filter(objectCity => data[objectCity].city.toLowerCase().includes(filter.toLowerCase()))

objectCity es cada object que está en la array data.
Queremos ir a la propiedad city de cada objeto 
data[objectCity].city nos permite hacer eso. Aqui data[objectCity] actúa como un índice. 

*/



  return (


    <div>

      
        <input
          type="text"
          placeholder='Filter cities'
          id="filter"
        onChange={event => setFilter(event.target.value) || filter === ''} />

    

      {Object.keys(data).filter(objectCity => data[objectCity].city.toLowerCase().startsWith(filter.toLowerCase()))
        .map(x => <li key={data[x].city}>{data[x].city}</li>)}

    </div>  

  )
}
  

  



export  {Cities};

/*
  <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/cities' component={Landing} />
          </Switch>
        </div>
      </BrowserRouter>

*/