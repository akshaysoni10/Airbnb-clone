import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LogIn from './components/Login/LogIn';
import SignUp from './components/Login/SignUp';
import Favorites from './components/Cards/Favorites';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="w-full bg-white z-10 shadow-sm">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              </>
            }
          />
          <Route path="/favorites" element={isLoggedIn ? <Favorites /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
