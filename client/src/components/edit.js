import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    number: "",
    admin_no: "",
    image: ""
  });
  const [imagePreview, setImagePreview] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:5050/user/${params.id}`);
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const user = await response.json();
      if (!user) {
        window.alert(`Record with id ${params.id} not found`);
        navigate("/");
        return;
      }

      setForm(user);
      // If the user has an image, set it as the preview
      if (user.image) {
        setImagePreview(user.image);
      }
    }
    fetchData();
  }, [params.id, navigate]);

  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(reader.result);
        // Update form state with the image as a base64 string
        updateForm({ image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(e) {
    e.preventDefault();
    // Similar validation as in Create.js
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

    try {
      const response = await fetch(`http://localhost:5050/user/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`${errorMessage}`);
      }

      showSuccess("User successfully updated!");
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
      progress: undefined,
    });
  };

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Update Member</h2>
        <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {/* Similar structure for image upload and preview */}
          <div className="flex flex-col items-center mb-4">
          <label htmlFor="upload-button" className="cursor-pointer">
    {/* Display image preview or default icon */}
    {imagePreview ? (
      <img src={imagePreview} alt="Profile preview" className="h-24 w-24 rounded-full object-cover" />
    ) : (
      <div className="rounded-full border border-gray-300 w-24 h-24 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M4 5h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v4m2-2H10" />
        </svg>
      </div>
    )}
    <input
      id="upload-button"
      type="file"
      className="hidden"
      accept="image/*"
      onChange={handleImageUpload}
    />
  </label>
          </div>
{/* Name Input */}
<div className="mb-6">
  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
  <input
    type="text"
    name="name"
    id="name"
    required
    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
    placeholder=""
    value={form.name}
    onChange={(e) => updateForm({ name: e.target.value.replace(/[^a-zA-Z\s]/g, '') })}
  />
</div>

{/* Number Input */}
<div className="mb-6">
  <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
  <input
    type="tel"
    name="number"
    id="number"
    required
    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
    placeholder=""
    value={form.number}
    onChange={(e) => updateForm({ number: e.target.value.replace(/\D/g, '').slice(0, 8) })}
  />
</div>

{/* Admin Number Input */}
<div className="mb-6">
  <label htmlFor="admin_no" className="block mb-2 text-sm font-medium text-gray-900">Admin Number</label>
  <input
    type="text"
    name="admin_no"
    id="admin_no"
    required
    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
    placeholder=""
    value={form.admin_no}
    onChange={(e) => updateForm({ admin_no: e.target.value.slice(0, 8).toUpperCase() })}
  />
</div>

{/* Submit Button */}
<div className="flex justify-center">
  <button
    type="submit"
    className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center"
  >
    Update
  </button>
</div>

        </form>
      </div>
    </div>
  );
}
