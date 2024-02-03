import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplicationsPage = () => {
    // State to store the list of applications
    const [applications, setApplications] = useState([]);

    // Function to fetch applications from the backend
    const fetchApplications = async () => {
        try {
            const response = await fetch('http://localhost:5050/application'); // Adjust this URL to your server's endpoint
            const data = await response.json();
            setApplications(data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    // Function to delete an application
    const deleteApplication = async (id) => {
        if (window.confirm('Are you sure you want to delete this application?')){
        try {
            const response = await fetch(`http://localhost:5050/application/${id}`, { // Adjust this URL to your server's endpoint
                method: 'DELETE',
            });
            if (response.ok) {
                toast.success("Application successfully deleted!");
                // Remove the deleted application from the state
                setApplications(applications.filter(app => app._id !== id));
            } else {
                console.error('Failed to delete the application with id:', id);
            }
        } catch (error) {
            console.error('Error deleting application:', error);
        }}
    };

    // Use useEffect to fetch applications when the component mounts
    useEffect(() => {
        fetchApplications();
    }, []); // The empty array ensures this effect runs only once after the initial render

    return (
        <div className="flex min-h-screen bg-white text-gray-800">
            <Sidebar />
            <div className="flex-1 container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-6">Applications</h1>
                {applications.length > 0 ? (
                    <div>
                        {applications.map((application) => (
                            <div key={application._id} className="bg-gray-100 p-4 rounded-lg shadow mb-4 flex justify-between items-center">
                                <div>
                                    <p><strong>Email:</strong> {application.email}</p>
                                    <p><strong>Admin No:</strong> {application.admin_no}</p>
                                    <p><strong>Description:</strong> {application.app_desc}</p>
                                </div>
                                <button
                                    onClick={() => deleteApplication(application._id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No applications so far.</p>
                )}
            </div>
        </div>
    );
};

export default ApplicationsPage;
