import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

export default function ResponsiveNavbar() {
  // Check if the user is logged in by reading from sessionStorage
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  // Function to handle logout
  const handleLogout = () => {
    // Clear the session storage to log out the user
    sessionStorage.removeItem('isLoggedIn');
    window.location.reload();
    // You can also perform other logout-related actions here if needed
  };

  return (
    <header className="bg-red-600 px-2 py-3 shadow-md"> {/* Reduced padding on the X-axis */}
    <div className="max-w-9x1 max-h-20 mx-4 flex justify-between items-center">
      <a href="#" className="flex items-center ml-[-8px]"> {/* Applied negative margin to move logo to the left */}
        <NavLink to="/" className="flex items-center">
          <img src="https://i.ibb.co/MN71qxX/TPlogo-Webreversed.png" alt="Temasek Polytechnic logo" className="mr-3"style={{ width: '130px', height: 'auto' }} />
        </NavLink>
      </a>
        <nav>
          <ul className="flex space-x-4">
          <NavLink to="/announcements" className="nav-link text-lg text-white font-semibold hover:underline mt-2">
                  Announcements
                </NavLink>
            {/* Conditionally render the "Join Us" link based on login state */}
            {!isLoggedIn && (
              <li>
                <NavLink to="/join" className="nav-link text-lg text-white font-semibold hover:underline mt-2">
                  Join Us
                </NavLink>
              </li>
            )}

            {/* Conditionally render the "Admin Page" and "Logout" link based on login state */}
            {isLoggedIn && (
              <>
                <li>
                  <NavLink to="/admin" className="nav-link text-lg text-white font-semibold hover:underline mt-2">
                    Admin Page
                  </NavLink>
                </li>
                <li>
                  <a href="#" className="nav-link text-lg text-white font-semibold hover:underline mt-2" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </>
            )}

            {/* Render "Login" link when not logged in */}
            {!isLoggedIn && (
              <li>
                <NavLink to="/login" className="nav-link text-lg text-white font-semibold hover:underline mt-2">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}