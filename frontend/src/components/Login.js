import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Flip } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error('Email and Password cannot be empty!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      if (response.data) {
        localStorage.setItem("userDetails", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          toast.success("Login successful as Admin!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
          });
          navigate("/admin");
        } else {
          toast.success("Login successful as Renter!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
          });
          navigate("/");
        }
      }
    } catch (err) {
      toast.error("Invalid credentials. Please try again!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-indigo-950">
      {/* Left Side - Welcome Text */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 text-white">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Welcome to Dulari Bhawan!
        </h1>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center sm:rounded-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8 w-96">
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
    </div>
  );
};

export default Login;
