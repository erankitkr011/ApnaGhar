import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetAllNotify = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const [visibleCount, setVisibleCount] = useState(3); // Track the number of visible notifications

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/notifications`);
        setNotifications(response.data);
      } catch (err) {
        setError('Error fetching notifications');
      }
    };

    fetchNotifications();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3); // Increase visible count by 3
  };

  return (
    <div className="p-4">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="max-h-48 overflow-y-auto space-y-4">
        {notifications.slice(0, visibleCount).map((notification) => (
          <div key={notification._id} className="p-4 bg-white/30 backdrop-blur-md border border-gray-200 rounded-md shadow-md">
            <p className="text-gray-900 text-xl">{notification.message}</p>
            <p className="text-white text-sm">{new Date(notification.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
      {visibleCount < notifications.length && (
        <button
          onClick={handleLoadMore}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default GetAllNotify;
