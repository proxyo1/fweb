import React from "react";

import { Route,Routes } from "react-router-dom";
import UserList from "./components/userList";
import Create from "./components/create";
import Edit from "./components/edit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./components/homePage";
import "./HomePage.css"


import Navbar from "./components/navbar";
import AdminPage from "./components/adminPage";



const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
      <Route exact path="/" element={<HomePage />}/> {/* Set HomePage as the main page */}

      <Route path ="/create" element={<Create />}/>
      <Route path ="/edit/:id" element={<Edit />}/>
      <Route path="/users" element={<UserList />}/>
      <Route path="/admin" element={<AdminPage />}/>
      </Routes>
    </div>
  )
}

export default App;