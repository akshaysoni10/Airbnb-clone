import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = () => {
    if(email && password) {
        setIsLoggedIn(true);
        navigate('/');
    }
    else{
        setError("Please fill all fields.");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
        <div className="absolute rounded-xl shadow-md w-full md:w-[40vw] bg-white overflow-hidden text-sm p-4">
            <div className="flex flex-col items-center">
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-2 p-2 border border-gray-300 rounded w-full max-w-xs md:max-w-full"
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-2 p-2 border border-gray-300 rounded w-full max-w-xs md:max-w-full"
                />
                <button onClick={handleLogin} className="bg-rose-500 text-white py-2 rounded w-full max-w-xs md:max-w-full">
                    Login
                </button>
            </div>
        </div>
    </div>
  )
}

export default LogIn;
