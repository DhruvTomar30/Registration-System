import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { AuthContext, AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import './components/Register.css';
import './components/Login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="/" element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default function AppWithProvider() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}