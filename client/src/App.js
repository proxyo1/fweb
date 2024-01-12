import React from "react";

import { Route,Routes } from "react-router-dom";
import UserList from "./components/userList";
import Create from "./components/create";
import Edit from "./components/edit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/navbar";



const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
      <Route exact path="/" element={<UserList />}/>
      <Route path ="/create" element={<Create />}/>
      <Route path ="/edit/:id" element={<Edit />}/>
      </Routes>
    </div>
  )
}

export default App;