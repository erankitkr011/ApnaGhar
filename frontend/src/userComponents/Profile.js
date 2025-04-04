import { useState, useEffect, useRef } from "react";
import React from 'react';
import axios from "axios";
import GetAllNotify from "../userComponents/GetAllNotify";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const notificationsRef = useRef(null);
  
    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem("token");
    
            if (!token) {
                setError("No token found");
                return;
            }
    
            try {
                const response = await axios.get("/getuser", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data.user);
                setNotificationCount(response.data.user.notificationCount || 0); // Assuming notificationCount is in user data
  
            } catch (err) {
                setError("Error fetching user details");
            }
        };
    
        fetchUserDetails();
    }, []);
  
    // Close notifications when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                setShowNotifications(false);
                setNotificationCount(0); // Reset count when notifications are viewed
            }
        };
  
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
  
    if (error) {
        return <p>{error}</p>;
    }
  
    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="relative bg-indigo-200 shadow-lg rounded-lg p-4 sm:p-6 flex items-center max-w-4xl mx-auto">
                <div className="border-l-4 border-red-500 h-12 sm:h-16 mr-4 sm:mr-6"></div>

                <div className="mr-3 sm:mr-8">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
                        alt="User Icon"
                        className="rounded-full w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32"
                    />
                </div>

                <div className="flex-1">
                    <p className="text-sm md:text-xl font-bold text-blue-600 truncate">Hi, {user.name.toUpperCase()}</p>
                    <p className="text-md sm:text-lg text-gray-600 font-bold">{user.email}</p>
                    <p className="text-md sm:text-lg text-gray-600 font-extrabold">{user.role}</p>
                </div>

                <div className="ml-auto">
                    <button onClick={() => setShowNotifications(!showNotifications)} className="p-2">
                        <div className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 hover:text-gray-800 transition duration-200"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 17h5l-1.405-1.405C18.402 15.302 18 14.179 18 13V8c0-3.866-3.582-7-8-7S2 4.134 2 8v5c0 1.179-.402 2.302-1.595 2.595L0 17h5m5 0v1a3 3 0 006 0v-1m-6 0h6"
                                />
                            </svg>
                            {/* Notification Count Badge */}
                            {notificationCount > 0 && (
                                <span className={`absolute top-0 right-0 transform translate-x-1 -translate-y-1 rounded-full bg-red-500 text-white text-xs font-bold px-1 ${showNotifications ? 'animate-pulse' : ''}`}>
                                    {notificationCount}
                                </span>
                            )}
                        </div>
                    </button>

                    {/* Notification Pop-Out Panel */}
                    {showNotifications && (
                        <div ref={notificationsRef} className="absolute right-0 mt-9 mr-1 w-80 max-h-80 overflow-hidden bg-indigo-700 border border-gray-200 shadow-lg rounded-lg z-20">
                            <GetAllNotify onNewNotification={() => setNotificationCount(notificationCount + 1)} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
