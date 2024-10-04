import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      if (response.data) {
        localStorage.setItem('userDetails', JSON.stringify(response.data));
        if (response.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="bg-white/30 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg p-8 w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <div className="mb-4">
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password:</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            onClick={handleSubmit} 
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </div>
      </div>

      {/* Right Side - Image or Graphic */}
      <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/your/image.jpg)' }}>
        {/* You can also add a gradient overlay if desired */}
        <div className="bg-black opacity-25 h-full"></div>
      </div>
    </div>
  );
};

export default Login;
