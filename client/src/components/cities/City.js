import React from 'react'
import {  Link} from 'react-router-dom'

export function City(props) {

//props.city props.country props.photoUrl
    return (
      <div class="col">
          <div class="card mb-5 ">
          <div class="card-header"><h4>{props.city}</h4></div>
            <img  className="photoUrl" src={props.photoUrl} alt={props.city}/> 
            <div class="card-body">
            <p class="card-text"><small class="text-muted">{props.country}</small></p>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p><Link to={`itineraries/${props.cityLowcase}`}> Itinerary of {props.city} </Link></p>
            </div>
        </div>
    </div>
    )
}
