import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import api, { setAuthToken } from './services/api';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserProfile from './components/Auth/UserProfile';
import ManagePoints from './components/Points/ManagePoints';
import Users from './components/Users/Users';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setAuthToken(storedToken);
      api
        .apiGetUser()
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Let's Play App</h1>
        {user && <p>Welcome, {user.username}!</p>}
        <Routes>
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/profile" element={<UserProfile />} /> 
          <Route path="/manage-points" element={<ManagePoints />} /> 
          <Route path="/users" element={<Users />} /> 
          <Route path="/" element={<p>Welcome to the Let's Play App! Please log in or register.</p>} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
