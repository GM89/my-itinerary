import React, {useState,useEffect } from 'react';
import axios from 'axios';
import Filterform from './Filterform.js'


let dummy_dictionary =[{'city':"Madrid ", 'country':'Spain','photoUrl':'photomadrid'}, {'city':"lyon ", 'country':'france','photoUrl':'photolyon'}]



class Cities extends Component {
    constructor() {
      super()
      this.state = {
        data: [],
        filterData: [],
        }
      this.url = "http://localhost:5000/";
      }
    


   //const [data, setData] = useState('')
   //const [filter, setFilter] = useState('')

   
   

// React to only execute the side effect once (at mount time), by passing an empty array:
    useEffect(() => {
      getData()
          }, [])
          
        
    
    //Con axios importamos los datos con y los guardamos dentro del state.data
    let getData = () => {
        
       axios.get(`${this.url}cities/all`)
       .then((response)=>{
         let citiesData = response.data;
         this.state({
              data: citiesData,
            })

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
      

    // ara tenim la filter Data 
      let changeFilterData = (e) => {
        const filtered_array = this.state.data.city.filter(e.target.value);
        this.setState({
          filterData: filtered_array,
        })
      }


      
    render(


          <div>
            <form> 
                <input 
                type="text"
                placeholder = 'Filter cities'
                id="filter" 

                onChange={this.changeFilterData}/>

            </form>
          </div>
          
              {Object.keys((filtered_array.length == 0? data : filtered_array)).map((x) => {
                  return(
                    
                      <ul key={data[x]._id}>
                          <li>{data[x].city}</li>
                          <li>{data[x].country}</li>
                          <li>{data[x]._id}</li>
                          <li>{data[x].photoUrl}</li>
                      </ul>             
                  )
              })}
              
    
          )
  }
  

  





export Cities;

/*
  <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/cities' component={Landing} />
          </Switch>
        </div>
      </BrowserRouter>
      
*/