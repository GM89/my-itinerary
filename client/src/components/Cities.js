import React, { useState} from 'react';

import { useSelector } from 'react-redux'

let dummy_dictionary = [{ 'city': "Madrid ", 'country': 'Spain', 'photoUrl': 'photomadrid' }, { 'city': "lyon ", 'country': 'France', 'photoUrl': 'photolyon' }]




function Cities() {
  // Los estados se cargan antes que el componente se cargue, 
  const initialdata = useSelector(state => state.cities)


  console.log(initialdata)
 
  const [data, setData] = useState(initialdata)

  const [filter, setFilter] = useState('')
  



  return (


    <div>

      {/* 
        <input
          type="text"
          placeholder='Filter cities'
          id="filter"
        onChange={event => setFilter(event.target.value) || filter === ''} /> */}

    

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