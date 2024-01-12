import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const User = (props) => (
  <tr>
    <td>{props.user.name}</td>
    <td>{props.user.number}</td>
    <td>{props.user.admin_no}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.user._id}`}>
        Edit
      </Link>{" "}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteUser(props.user._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const response = await fetch(`http://localhost:5050/user/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const users = await response.json();
      setUsers(users);
    }

    getUsers();

    return;
  }, [users.length]);

  async function deleteUser(id) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!shouldDelete) {
      return;
    }

    await fetch(`http://localhost:5050/user/${id}`, {
      method: "DELETE",
    });

    const newUsers = users.filter((el) => el._id !== id);
    setUsers(newUsers);

    // Show success toast
    toast.success("User deleted successfully!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }

  function UserList() {
    return users.map((user) => {
      return (
        <User
          user={user}
          deleteUser={() => deleteUser(user._id)}
          key={user._id}
        />
      );
    });
  }

  return (
    <div>
      <h3>User List</h3>
      <ToastContainer />
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Admission Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{UserList()}</tbody>
      </table>
    </div>
  );
}
