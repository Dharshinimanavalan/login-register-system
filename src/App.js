import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
function App() {
  return (
    <Router>
     
            <Routes>
              <Route exact path="/" element={<Register />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Profile" element={<Profile />} />
            </Routes>
          
    </Router>
  )
}
export default App