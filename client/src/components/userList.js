import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const User = (props) => (
  <tr>
    <td>{props.user.name}</td>
    <td>{props.user.number}</td>
    <td>{props.user.admin_no}</td>
    <td>
      <Link className="btn btn-primary" to={`/edit/${props.user._id}`}>
        Edit
      </Link>
      <button
        className="btn btn-danger"
        onClick={() => {
          props.deleteUser(props.user._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch(`http://localhost:5050/user/`);

        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        const users = await response.json();
        setUsers(users);
      } catch (error) {
        console.error(error.message);
        toast.error("Failed to fetch users. Please try again later.");
      }
    }

    getUsers();
  }, []);

  async function deleteUser(id) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!shouldDelete) {
      return;
    }

    try {
      await fetch(`http://localhost:5050/user/${id}`, {
        method: "DELETE",
      });

      const newUsers = users.filter((el) => el._id !== id);
      setUsers(newUsers);

      // Show success toast
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to delete user. Please try again later.");
    }
  }

  return (
    <div className="user-list-container">
      <h3>Member List</h3>

      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Admission Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{users.map((user) => <User user={user} deleteUser={() => deleteUser(user._id)} key={user._id} />)}</tbody>
      </table>
    </div>
  );
}

export default UserList;
