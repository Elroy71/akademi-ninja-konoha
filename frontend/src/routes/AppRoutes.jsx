import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Layouts
import DashboardLayout from '../layouts/DashboardLayout';
import GuestLayout from '../layouts/GuestLayout';

// Import pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Courses from '../pages/Courses';
import CourseDetail from '../pages/CourseDetail';
import CoursePlayer from '../pages/CoursePlayer';
import ExamPage from '../pages/ExamPage';
import MyCourses from '../pages/MyCourses';
import MyCertificates from '../pages/MyCertificates';
import Profile from '../pages/Profile';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Guest Route Component (redirect to dashboard if already logged in)
const GuestRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with GuestLayout */}
      <Route path="/" element={
        <GuestLayout>
          <Home />
        </GuestLayout>
      } />
      
      <Route path="/login" element={
        <GuestRoute>
          <GuestLayout>
            <Login />
          </GuestLayout>
        </GuestRoute>
      } />
      
      <Route path="/register" element={
        <GuestRoute>
          <GuestLayout>
            <Register />
          </GuestLayout>
        </GuestRoute>
      } />
      
      {/* Protected Routes with DashboardLayout */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/courses" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Courses />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/course/:id" element={
        <ProtectedRoute>
          <DashboardLayout>
            <CourseDetail />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      {/* CoursePlayer without sidebar (fullscreen) */}
      <Route path="/learn/:id" element={
        <ProtectedRoute>
          <CoursePlayer />
        </ProtectedRoute>
      } />
      
      <Route path="/exam/:id" element={
        <ProtectedRoute>
          <DashboardLayout>
            <ExamPage />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/my-courses" element={
        <ProtectedRoute>
          <DashboardLayout>
            <MyCourses />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/certificates" element={
        <ProtectedRoute>
          <DashboardLayout>
            <MyCertificates />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Profile />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      {/* 404 Not Found */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;