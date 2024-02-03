import Sidebar from './sidebar';
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const ManageAnnouncementsPage = () => {
    const [announcements, setAnnouncements] = useState([]);

    // Fetch all announcements
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch('http://localhost:5050/announcements');
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                setAnnouncements(data);
            } catch (error) {
                toast.error("Error fetching announcements: " + error.message);
            }
        };

        fetchAnnouncements();
    }, []);
    
    const createAnnouncement = async (newAnnouncement) => {
        try {
          const response = await fetch('http://localhost:5050/announcements', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAnnouncement),
          });
          if (!response.ok) {
            throw new Error('Failed to create announcement');
          }
          const data = await response.json();
          setAnnouncements([...announcements, data]);
          toast.success('Announcement created successfully');
        } catch (error) {
          toast.error('Error creating announcement: ' + error.message);
        }
      };
      
      // Add this function to handle updating an existing announcement
      
      
      // Add this function to handle deleting an announcement
      const deleteAnnouncement = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')){
        try {
          const response = await fetch(`http://localhost:5050/announcements/${id}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete announcement');
          }
          setAnnouncements(announcements.filter(announcement => announcement._id !== id));
          toast.success('Announcement deleted successfully');
        } catch (error) {
          toast.error('Error deleting announcement: ' + error.message);
        }}
      };
    // Here you would add functions to handle creating, updating, and deleting announcements

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">

                <div className="p-4">
                <h2 className="text-4xl font-bold mb-10">Announcements</h2>
                    {/* The main content of your management page goes here */}
                    <div>
                        {announcements.map((announcement) => (
                            <div key={announcement.id} className="border p-4 rounded-lg my-4 flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-semibold">{announcement.title}</h3>
                                    <p>{announcement.description}</p>
                                    <a href={announcement.link} className="text-red-600 hover:text-red-800 visited:text-purple-600">
                                        {announcement.link}
                                    </a>
                                    <p className="text-sm text-gray-500">{announcement.date}</p>
                                </div>

                                <div className="flex flex-col items-end">
                                    <Link to={`/admin/editannouncement/${announcement._id}`} className="text-xs font-semibold text-red-500 hover:text-red-700">Edit</Link>
                                    <button onClick={() => deleteAnnouncement(announcement._id)} className="text-xs font-semibold text-red-500 hover:text-red-700 mt-2">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageAnnouncementsPage;
