// AdminPage.js
import React from 'react';


const AdminPage = () => {
  const members = [
    { name: 'Ryan Lim', id1: '87494203', id2: '22009221' },
    { name: 'Ryan Quek', id1: '87494204', id2: '22009231' },
    { name: 'Ryan Ong', id1: '87494205', id2: '22009241' }
    // Add more members as needed
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-100 p-5">
        <h1 className="text-xl font-semibold mb-5">CCA Members</h1>
        <ul>
          <li className="mb-3">Add Member</li>
          <li className="mb-3">Announcements</li>
          <li className="mb-3">Applications</li>
          {/* Add more sidebar items as needed */}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10">
        <h2 className="text-4xl font-bold mb-10">Admin Page</h2>
        <div className="relative mb-6">
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Search"
          />
        </div>
        <div>
          {members.map((member, index) => (
            <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-md mb-4">
              <img
                className="w-16 h-16 rounded-full mr-4"
                src="https://placehold.co/100" // Placeholder image source
                alt={`Avatar of ${member.name}`}
              />
              <div>
                <p className="font-semibold">{member.name}</p>
                <p>{member.id1}</p>
                <p>{member.id2}</p>
              </div>
              <button className="ml-auto">
                <i className="fas fa-ellipsis-h"></i> {/* This should be replaced with an actual icon */}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
