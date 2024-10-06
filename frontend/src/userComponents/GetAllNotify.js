import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetAllNotify = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/notifications`);
        setNotifications(response.data);
      } catch (err) {
        setError('Error fetching notifications');
      }
    };

    fetchNotifications();
  },);
  return (
    <div className="p-4">
    
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="max-h-48 overflow-y-auto space-y-4">
        {notifications.map((notification) => (
          <div key={notification._id} className="p-4 bg-white/30 backdrop-blur-md border border-gray-200 rounded-md shadow-md">
            <p className="text-gray-700">{notification.message}</p>
            <p className="text-gray-400 text-sm">{new Date(notification.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
  
    </div>
  );
};

export default GetAllNotify;
