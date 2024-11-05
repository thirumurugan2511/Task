import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import OtpAuth from './OtpAuth';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/OtpAuth" element={<OtpAuth />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


