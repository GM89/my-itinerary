import React, {useState,useEffect } from 'react';
import axios from 'axios';



let dummy_dictionary =[{'city':"Madrid ", 'country':'Spain','photoUrl':'photomadrid'}, {'city':"lyon ", 'country':'france','photoUrl':'photolyon'}]





  function Cities () {
    const [data, setData] = useState('');
    let url = "http://localhost:5000/";
// React to only execute the side effect once (at mount time), by passing an empty array:
    useEffect( () => {
      getData()
          }, [])
        
    
    
    const getData = () => {
        
       axios.get(`${url}cities/all`)
       .then((response)=>{
         const citiesData = response.data;
         setData(citiesData)
         console.log(citiesData, 'cities data DENTRO de axios')
       })
    
       .catch(error=>console.error(`error ${error}`))
          
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
      
    
      return(
        Object.keys(data).map((x) => {
            return(
              
                <ul key={data[x]._id}>
                    <li>{data[x].city}</li>
                    <li>{data[x].country}</li>
                    <li>{data[x]._id}</li>
                    <li>{data[x].photoUrl}</li>
                </ul>             
        )
        })
        
    
      )
  }
  

  





export {Cities}

/*
  <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/cities' component={Landing} />
          </Switch>
        </div>
      </BrowserRouter>
      
*/