import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // default styling

const AnnouncementsPage = () => {
    // State for the selected date
    const [date, setDate] = useState(new Date());
    // State for announcements fetched from the database
    const [announcements, setAnnouncements] = useState([]);

    // Handler for date change
    const onDateChange = (newDate) => {
        setDate(newDate);
        // Optional: Fetch or display events for the selected date
    };

    // Fetch announcements from the backend when the component mounts
    useEffect(() => {
        fetch('http://localhost:5050/announcements') // Adjust this URL to where your backend endpoint is hosted
            .then(response => response.json())
            .then(data => setAnnouncements(data))
            .catch(error => console.error('Error fetching announcements:', error));
    }, []); // The empty array ensures this effect runs only once after the initial render

    return (
        <div className="bg-white text-gray-800 min-h-screen">
            <div className="container mx-auto px-4 py-10 flex justify-between">
                <div className="w-full max-w-lg">
                    <h1 className="text-4xl font-bold mb-6">Announcements</h1>
                    {announcements.map((announcement, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-lg shadow mb-4">
                            <h2 className="text-xl font-semibold">{announcement.title}</h2>
                            <p>{announcement.description}</p>
                            <a href={announcement.link} className="text-red-600 hover:text-red-800 visited:text-purple-600">
                                {announcement.link}
                            </a>
                            <p className="text-sm text-gray-500 mt-2">{announcement.date}</p>
                        </div>
                    ))}
                </div>
                <div className="w-full max-w-md flex flex-col items-center">
                    <h2 className="text-4xl mb-6 text-center">Calendar</h2>
                    <Calendar
                        onChange={onDateChange}
                        value={date}
                    // You can use other props to customize the calendar
                    />
                </div>

            </div>
        </div>
    );
};

export default AnnouncementsPage;
