import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

let url = "http://localhost:3000/cities"
export default class Cities extends Component {


//la url es la correcta?
fetchQuotes = () => {
   
    fetch("http://localhost:5000/cities/all")
      .then(response => response.json())
      .then(json => {
        let data = json;
        console.log(json);
      });
      
  }

/*
componentDidMount() {
  this.fetchQuotes()
  this.timer = setInterval(() => this.fetchQuotes(), 2000);
}
 
componentWillUnmount() {
  this.timer = null;
}  
*/

  render() {
    return (
     <p> Cities components is here!</p>
   
     
    )}
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