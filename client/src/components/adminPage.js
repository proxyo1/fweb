import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./sidebar";



const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch('http://localhost:5050/user/');
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const users = await response.json();
        setUsers(users);
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Failed to fetch users. Please try again later.');
      }
    }
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:5050/user/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (response.ok) {
          setUsers(users.filter((user) => user._id !== id));
          toast.success('User deleted successfully!');
        } else {
          // Handle HTTP error status codes
          const errorMessage = await response.text();
          toast.error(errorMessage);
        }
      } catch (error) {
        // Handle network error or any other error that prevented the fetch
        console.error('Error:', error);
        toast.error('An error occurred while deleting the user.');
      }
    }
  };
  

  // Filtered list based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
    <Sidebar/>
      {/* Main content */}
      <div className="flex-1 p-10">
        <h2 className="text-4xl font-bold mb-10">Members List</h2>
        <div className="relative mb-6">
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="max-h-[calc(100vh-200px)] overflow-auto">
          {filteredUsers.map((user) => (
            <div key={user._id} className="flex items-center py-3 border-b border-gray-200">
              <img
                className="w-16 h-16 rounded-full mr-4 object-cover "
                src={user.image || "https://placehold.co/100"} 
                alt={`Avatar of ${user.name}`}
              />
              <div className="flex-grow">
                <p className="font-semibold">{user.name}</p>
                <p>{user.number}</p>
                <p>{user.admin_no}</p>
              </div>
              <div className="flex space-x-2">
                <Link to={`/admin/edit/${user._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;