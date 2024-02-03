import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './sidebar';

export default function Create() {
  const [form, setForm] = useState({
    name: '',
    number: '',
    admin_no: '',
    image: '',
  });
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const updateForm = useCallback((value) => {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }, []);

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleImageUpload(files[0]);
    }
  };

  const handleImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(reader.result);
        const base64String = event.target.result;
        updateForm({ image: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.number || !form.admin_no) {
      showError("All fields must be filled");
      return;
    }

    if (!/^\d+$/.test(form.number)) {
      showError("Phone number must contain numbers only");
      return;
    }

    if (form.number.length !== 8) {
      showError("Phone Number must be 8 digits");
      return;
    }

    if (form.admin_no.length !== 8 || !/^\d{7}[A-Z]$/.test(form.admin_no)) {
      showError("Admin Number is not in the right format");
      return;
    }

    // When a post request is sent to the create URL, we'll add a new record to the database.
    try {
      const response = await fetch("http://localhost:5050/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`${errorMessage}`);
      }

      // clear form inputs
      setForm({ name: "", number: "", admin_no: "" ,image:""});
      showSuccess("User successfully created!");
      // navigate back to the root page
      navigate("/");
    } catch (error) {
      showError(`${error.message}`);
    }
  }

  const showError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000, // 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000, // 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

  


  return (
    <div className="flex">
    <Sidebar />
    <div className="flex-grow flex  justify-center p-12">
        <div className="mx-auto w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 ">Add Member</h2>
          <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {/* Drag and drop area */}
          <div
            className="flex flex-col items-center mb-4 p-6 border-2 border-dashed border-gray-300 rounded-md"
            onDragOver={onDragOver}
            onDrop={onDrop}
          >
            <label htmlFor="upload-button" className="cursor-pointer w-full text-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Profile preview" className="h-24 w-24 rounded-full object-cover mx-auto" />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M4 5h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v4m2-2H10" />
                  </svg>
                  <p className="mt-2">Drag & drop your image here, or click to select files</p>
                </div>
              )}
              <input
                id="upload-button"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files[0])}
              />
            </label>
          </div>
  
          {/* Name input */}
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value.replace(/[^a-zA-Z\s]/g, '') })}
            />
          </div>
  
          {/* Phone number input */}
          <div className="mb-6">
            <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
            <input
              type="tel"
              id="number"
              name="number"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              value={form.number}
              onChange={(e) => updateForm({ number: e.target.value.replace(/\D/g, '').slice(0, 8) })}
            />
          </div>
  
          {/* Admin number input */}
          <div className="mb-6">
            <label htmlFor="admin_no" className="block mb-2 text-sm font-medium text-gray-900">Admin Number</label>
            <input
              type="text"
              id="admin_no"
              name="admin_no"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              value={form.admin_no}
              onChange={(e) => updateForm({ admin_no: e.target.value.slice(0, 8).toUpperCase() })}
            />
          </div>
  
          {/* Submit button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}