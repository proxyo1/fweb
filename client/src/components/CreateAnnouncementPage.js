import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './sidebar'; // Update the import path as necessary
import ResponsiveNavbar from './navbar'; // Update the import path as necessary

export default function CreateAnnouncementPage() {
  const [announcement, setAnnouncement] = useState({
    title: '',
    description: '',
    link: '',
    date: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement({ ...announcement, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5050/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(announcement),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`${errorMessage}`);
      }
      toast.success('Announcement created successfully!');
      navigate('/admin/manageannouncement'); // Navigate to the announcements management page
    } catch (error) {
      toast.error(`Creation failed: ${error.message}`);
    }
  };

  return (
    <div className="flex">
        <Sidebar />
      <div className="flex-grow">

        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-semibold text-center mb-6">Create New Announcement</h2>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {/* Title Input */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={announcement.title}
                onChange={handleInputChange}
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            
            {/* Description Input */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={announcement.description}
                onChange={handleInputChange}
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            
            {/* Link Input */}
            <div className="mb-4">
              <label htmlFor="link" className="block text-gray-700 text-sm font-bold mb-2">
                Link
              </label>
              <input
                type="url"
                id="link"
                name="link"
                value={announcement.link}
                onChange={handleInputChange}
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            
           
            
            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create Announcement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
