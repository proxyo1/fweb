// JoinUsPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const JoinUsPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    admin_no: '',
    app_desc: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Specific logic for 'admin_no' to enforce the format
    if (name === "admin_no") {
      // Remove any character that is not a digit or letter, limit to 8 characters
      formattedValue = formattedValue.replace(/[^0-9A-Za-z]/g, '').slice(0, 8);
  
      // Check if length is at the 8th character and it is a letter, capitalize it
      if (formattedValue.length === 8) {
        formattedValue = formattedValue.slice(0, 7) + formattedValue.charAt(7).toUpperCase();
      }
    }
  
    setFormData(prevState => ({
      ...prevState,
      [name]: formattedValue
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.admin_no || !formData.app_desc) {
        toast.error("Please fill in all the fields.");
        return;
        
    }
    if (formData.admin_no.length !== 8 || !/^\d{7}[A-Z]$/.test(formData.admin_no)) {
        toast.error("Admin Number is not in the right format");
        return;
    }

    try {
        const response = await fetch('http://localhost:5050/application', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`${errorMessage}`);
        }

        toast.success("Application submitted successfully!");
        navigate('/'); // Redirect to a thank-you page or dashboard
    } catch (error) {
        toast.error(`Application submission failed: ${error.message}`);
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen flex items-start justify-center pt-10 lg:pt-10">
      <div className="bg-gray-50 p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-5x1  mb-1 text-center">Want to be a Falcon?</h2>
        <h2 className="text-5xl font-bold mb-6 text-center">Sign Up Now!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-red-500 block w-full rounded-md"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="admin_no" className="block text-sm font-medium text-gray-700">Admission No.</label>
            <input
              type="text"
              name="admin_no"
              id="admin_no"
              required
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-red-500 block w-full rounded-md"
              placeholder="Admission No."
              value={formData.admin_no}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="app_desc" className="block text-sm font-medium text-gray-700">Tell us about yourself!</label>
            <textarea
              name="app_desc"
              id="app_desc"
              required
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-red-500 block w-full rounded-md"
              placeholder="Tell us about yourself!"
              value={formData.app_desc}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition-colors"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinUsPage;
