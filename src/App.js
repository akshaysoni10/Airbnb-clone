import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
        <ConditionalComponents 
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn} 
        />
        <Routes>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </Router>
    </div>
  );
}

const ConditionalComponents = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/favorites';

  return !isAuthRoute ? (
    <>
      <Navbar 
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  ) : null;
};

export default App;
