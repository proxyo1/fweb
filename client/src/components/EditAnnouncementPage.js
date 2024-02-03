// EditAnnouncementPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditAnnouncement() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    date: ""
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:5050/announcements/${id}`);
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        toast.error(message);
        return;
      }

      const announcement = await response.json();
      if (!announcement) {
        toast.error(`Announcement with id ${id} not found`);
        navigate("/manage-announcements");
        return;
      }

      setForm(announcement);
    }

    fetchData();
  }, [id, navigate]);

  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    
    // Additional validation could be implemented here

    try {
      const response = await fetch(`http://localhost:5050/announcements/${id}`, {
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

      toast.success("Announcement successfully updated!");
      navigate("/manageannouncement");
    } catch (error) {
      toast.error(`Update failed: ${error.message}`);
    }
  }

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Edit Announcement</h2>
        <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {/* Title Input */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={form.title}
              onChange={(e) => updateForm({ title: e.target.value })}
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              required
              value={form.description}
              onChange={(e) => updateForm({ description: e.target.value })}
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              value={form.link}
              onChange={(e) => updateForm({ link: e.target.value })}
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

        

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Announcement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
