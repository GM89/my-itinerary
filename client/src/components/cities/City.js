import React from 'react'
import {  Link} from 'react-router-dom'
import { capitalizeFirstLetter } from '../ItinerariesByCity'
export function City(props) {

//props.city props.country props.photoUrl
    return (
      <div class="col">
          <div class="card mb-5 "  style={{ "borderRadius": "25px" }}>
          <div class="card-title"><h4>{props.cityCapitalLetter}</h4></div>
            <img  className="photoUrl" src={props.photoUrl}/> 
            <div class="card-body">
            <p class="card-text"><small class="text-muted">{capitalizeFirstLetter(props.country)}</small></p>
            <Link to={`itineraries/${props.cityLowCase}`} class="btn btn-primary" role="button" > Itinerary of {props.cityCapitalLetter} </Link>
            </div>
        </div>
    </div>
    )
}
