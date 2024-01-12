import React from "react"

import "bootstrap/dist/css/bootstrap.css"

import { NavLink } from "react-router-dom";

export default function Navbar() {
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">
                    <img style={{"width": 10 + '%'}} src="https://assets-global.website-files.com/6284a6d550fa035b8560a485/63c6646794c96d6dc38e4f25_TemasekPolytechnic_CustomerStory_Featured_v01.png"></img>
                </NavLink>
                <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/create">
                                Create User
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}