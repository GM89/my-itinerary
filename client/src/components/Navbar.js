import React from 'react';

import {useSelector} from 'react-redux'
import {GoogleAuthButton} from "./GoogleAuthButton.js"
import { Link} from 'react-router-dom'

function Navbar() {
  const loggedIn = useSelector(state => state.members.loggedIn)

return (
  <div className="miNavbar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <Link class="navbar-brand" to="#">
          Navbar
        </Link>
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
              <Link className="nav-link" to="/">
                Home{" "}
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to="/cities">
                Cities{" "}
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            {loggedIn? ""  :
            <li className="nav-item ">
              <Link className="nav-link" to="/register">
                Register
              </Link>
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