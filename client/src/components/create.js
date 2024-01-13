import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    number: "",
    admin_no: ""
  });
  const navigate = useNavigate();

  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

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
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`${errorMessage}`);
      }

      // clear form inputs
      setForm({ name: "", number: "", admin_no: "" });
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
      hideProgressBar: true,
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
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

return(
    <div>
        <h3>Create New User</h3>
        <ToastContainer />
        
        
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                type="text"
                className="form-control"
                id="name"
                value={form.name}
                onChange={(e) => updateForm({name: e.target.value})}
                />
            </div>
            <div className="form-group">
    <label htmlFor="position">Phone Number</label>
    <input
        type="tel"
        className="form-control"
        id="number"
        value={form.number}
        onChange={(e) => {
            // Allow only numeric input
            const numericValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
            updateForm({ number: numericValue });
        }}
    />
</div>
            <div className="form-group">
                <label htmlFor="position">Admin Number</label>
                <input
                type="text"
                className="form-control"
                id="admin_no"
                value={form.admin_no}
                onChange={(e) => updateForm({admin_no: e.target.value.toUpperCase()})}
                />
            </div>
            <div>
                <div className="form-group">
                    <input
                    type="submit"
                    value="Create User"
                    className="btn btn-primary">

                    </input>
                </div>
            </div>
        </form>
    </div>
)

}
