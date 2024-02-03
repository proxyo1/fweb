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
        <Route exact path="/" element={<HomePage />} />
        <Route path="/join" element={<JoinUsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />

        {/* Wrap protected routes with ProtectedRoute component */}
        <Route path="/admin/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
        <Route path="/admin/edit/:id" element={<ProtectedRoute><Edit /></ProtectedRoute>} />
        <Route path="/admin/editannouncement/:id" element={<ProtectedRoute><EditAnnouncementPage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        <Route path="/announcements" element={<ProtectedRoute><AnnouncementsPage /></ProtectedRoute>} />
        <Route path="/admin/manageannouncement" element={<ProtectedRoute><ManageAnnouncementsPage /></ProtectedRoute>} />
        <Route path="/admin/applications" element={<ProtectedRoute><ApplicationsPage /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App;
