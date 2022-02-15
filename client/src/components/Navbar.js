import React from 'react';

import { useNavigate, Link } from "react-router-dom";

import { useEffect} from "react";

import {GoogleAuthButton} from "./GoogleAuthButton.js"

function Navbar() {

 
return(
              
       <div className="miNavbar">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                        <li className="nav-item ">
                              <a className="nav-link" href="/">Home </a>
                        </li> 
                        <li className="nav-item ">
                              <a className="nav-link" href="/cities">Cities </a>
                        </li> 
                        <li className="nav-item ">
                              <a className="nav-link" href="itineraries/all">All itineraries </a>
                        </li>
                        <li className="nav-item ">
                              <a className="nav-link" href="/login">Login</a>
                        </li> 
                        <li className="nav-item ">
                              <a className="nav-link" href="/register">Register</a>
                        </li> 
                  </ul>
            </div>
            </div>
            </nav>
      </div>
                      
       
)
}

export  {Navbar}