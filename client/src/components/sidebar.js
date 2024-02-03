import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 p-5">
      <h1 className="text-xl font-semibold mb-5">CCA Members</h1>
      <ul className="flex flex-col">
        <li className="mb-3">
          <NavLink to="/admin" className="text-gray-800 hover:text-gray-600" activeClassName="text-gray-600 font-semibold">
            CCA Members
          </NavLink>
        </li>
        <li className="mb-3">
          <NavLink to="/create" className="text-gray-800 hover:text-gray-600" activeClassName="text-gray-600 font-semibold">
            Add Member
          </NavLink>
        </li>
        <li className="mb-3">
          <NavLink to="/admin/announcements" className="text-gray-800 hover:text-gray-600" activeClassName="text-gray-600 font-semibold">
            Announcements
          </NavLink>
        </li>
        <li className="mb-3">
          <NavLink to="/admin/applications" className="text-gray-800 hover:text-gray-600" activeClassName="text-gray-600 font-semibold">
            Applications
          </NavLink>
        </li>
        {/* Add more sidebar items as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
