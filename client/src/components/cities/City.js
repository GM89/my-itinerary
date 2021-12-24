import React from 'react'
import {  Link} from 'react-router-dom'

export function City(props) {

//props.city props.country props.photoUrl
    return (
        <div>
          
             <tr key={props.city}>
                <td> {props.city}</td>
                <td> {props.country}</td> 
                <td> 
                  <Link to={`itineraries/${props.cityLowcase}`}> Itinerary of {props.city} </Link>
                  
                  

                </td>
                <td> <img  className="photoUrl" src={props.photoUrl} alt={props.city}/> </td>
                
              </tr> 

        </div>
    )
}
