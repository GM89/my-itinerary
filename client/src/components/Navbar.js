import React from 'react';

import { useNavigate, Link } from "react-router-dom";

import { useEffect} from "react";
import {useSelector} from 'react-redux'
import {GoogleAuthButton} from "./GoogleAuthButton.js"

function Navbar() {
  const loggedIn = useSelector(state => state.members.loggedIn)

return (
  <div className="miNavbar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li className="nav-item ">
              <a className="nav-link" href="/">
                Home{" "}
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="/cities">
                Cities{" "}
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="itineraries/all">
                All itineraries{" "}
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
            {loggedIn? ""  :
            <li className="nav-item ">
              <a className="nav-link" href="/register">
                Register
              </a>
            </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  </div>
);
}

export  {Navbar}