import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { ForgotPasswordPage } from './pages/ForgotPassword';
import { NewPasswordPage } from './pages/NewPassword';
import { HomePage } from './pages/Home';
import { UploadProjectPage } from './pages/UploadProject';
import { ProjectFormPage } from './pages/ProjectForm';
import { ProjectDetailsPage } from './pages/ProjectDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/new-password" element={<NewPasswordPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/upload" element={<UploadProjectPage />} />
        <Route path="/project-form" element={<ProjectFormPage />} />
        <Route path="/project-details" element={<ProjectDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;