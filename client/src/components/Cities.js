import React, { Component } from 'react';


let url = "http://localhost:3000/cities";

let cities_data = [{}]

let dummy_dictionary =[{'city':"Madrid ", 'country':'Spain','photoUrl':'photomadrid'}, {'city':"lyon ", 'country':'france','photoUrl':'photolyon'}]

 const fetchQuotes = () => {
      fetch("http://localhost:5000/cities/all")
      .then(response => response.json())
      .then(json => {
        cities_data = json;
       
        console.log(cities_data, 'cities dentro de fetch');
      });
      
  }

  console.log(cities_data, 'cities data FUERA de fetch')

  
  const Table = () => {
    
     for(let i=0; i< cities_data.length; i++){
      
                return(
                  <div>
                    <p> at least I'm returning this text</p>
                    {cities_data[i].city}
                  </div>
                )
             }
  }

/*s
componentDidMount() {
  this.fetchQuotes()
  this.timer = setInterval(() => this.fetchQuotes(), 2000);
}
 
componentWillUnmount() {
  this.timer = null;
}  
*/

  function Cities () {
    return (
      <div>
     <p> Cities components is here!</p>
        <div>
            <Table/>
          </div>
      </div>
     
    )}





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