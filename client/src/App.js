import React from "react";

import { Route,Routes } from "react-router-dom";

import Create from "./components/create";
import Edit from "./components/edit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./components/homePage";
import "./components/css/app.css"


import Navbar from "./components/navbar";
import AdminPage from "./components/adminPage";
import Login from "./components/loginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import JoinUsPage from "./components/joinUsPage";
import AnnouncementsPage from "./components/announcements";
import ManageAnnouncementsPage from "./components/manageAnnouncements";
import EditAnnouncementPage from "./components/EditAnnouncementPage";
import ApplicationsPage from "./components/applications";




const App = () => {
  return (
    <div>
      <ToastContainer />

      <Navbar />
      <Routes>
      <Route exact path="/" element={<HomePage />}/> {/* Set HomePage as the main page */}

      <Route path ="/create" element={<Create />}/>
      <Route path ="/edit/:id" element={<Edit />}/>
      <Route path ="/editannouncement/:id" element={<EditAnnouncementPage />}/>

      <Route path="/join" element={<JoinUsPage />}/>
      <Route path="/admin" element={<ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/announcements" element={<AnnouncementsPage />}/>
      <Route path="/admin/manageannouncement" element={<ManageAnnouncementsPage />}/>
      <Route path="/admin/applications" element={<ApplicationsPage />}/>
      
      </Routes>
   
    </div>
  )
}

export default App;