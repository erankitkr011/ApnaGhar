import React from "react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "../components/Login";
import Admin from "../adminComponent/Admin";

const Nav = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const role = userDetails ? userDetails.user.role : null;
  const token = userDetails ? userDetails.token : null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 bg-white/30 backdrop-blur-md border-b border-gray-200 shadow-md p-4 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {token ? (
              <>
                {role === "renter" ? (
                  <Link to="/" className="text-blue-600 hover:underline">Home</Link>
                ) : (
                  <Link to="/admin" className="text-blue-600 hover:underline">Admin</Link>
                )}
                <button onClick={handleLogout} className="text-red-600 hover:underline">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            token && role === "renter" ? <Home /> : <Navigate to="/login" />
          }
        />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Admin Route (Protected) */}
        <Route
          path="/admin"
          element={
            token && role === "admin" ? <Admin /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </div>
  );
};

export default Nav;
