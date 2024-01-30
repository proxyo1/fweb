import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";


export default function ResponsiveNavbar() {


  return (
    <header className="bg-red-600 px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#" className="flex items-center">
          <img src="https://i.ibb.co/MN71qxX/TPlogo-Webreversed.png" alt="Temasek Polytechnic logo" className="mr-3" />

        </a>
        <nav>
          <ul className="flex space-x-4">
          <nav>
  <ul className="flex space-x-4">
    <li><a href="#" className="nav-link text-lg text-white font-semibold hover:underline">Information</a></li>
    <li><a href="#" className="nav-link text-lg text-white font-semibold hover:underline">Join Us</a></li>
    <li><a href="#" className="nav-link text-lg text-white font-semibold hover:underline">Login</a></li>
    <li>
              {/* Apply the same TailwindCSS classes to NavLink */}
              <NavLink to="/create" className="nav-link text-lg text-white font-semibold hover:underline">
                Create User
              </NavLink>
            </li>
            <li>
              {/* Apply the same TailwindCSS classes to NavLink */}
              <NavLink to="/admin" className="nav-link text-lg text-white font-semibold hover:underline">
                Admin Page
              </NavLink>
            </li>
    {/* ... other nav items ... */}
  </ul>
</nav>

  
          </ul>
        </nav>
      </div>
    </header>


  );
}


// <nav className="navbar navbar-expand-lg navbar-light bg-light">
//   <NavLink className="navbar-brand" to="/">
//     <img
//       style={{ width: "10%" }}
//       src="https://assets-global.website-files.com/6284a6d550fa035b8560a485/63c6646794c96d6dc38e4f25_TemasekPolytechnic_CustomerStory_Featured_v01.png"
//       alt="logo"
//     />
//   </NavLink>
//   <button
//     className="navbar-toggler"
//     type="button"
//     data-toggle="collapse"
//     data-target="#navbarSupportedContent"
//     aria-controls="navbarSupportedContent"
//     aria-expanded={isOpen ? "true" : "false"}
//     aria-label="Toggle navigation"
//     onClick={toggleNavbar}
//   >
//     <span className="navbar-toggler-icon"></span>
//   </button>

//   <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarSupportedContent">
//     <ul className="navbar-nav ml-auto">
//       <li className="nav-item">
//         <NavLink className="nav-link" to="/create">
//           Create User
//         </NavLink>
//       </li>

//     </ul>
//   </div>
// </nav>