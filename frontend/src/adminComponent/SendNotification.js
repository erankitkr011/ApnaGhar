import React, { useState } from 'react';

const SendNotification = () => {
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    if (!message) {
      alert("Notification message can't be empty");
      return;
    }

    // Assuming you have a backend API to send notifications
    try {
      const response = await fetch('http://localhost:3000/allnotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        alert('Notification sent successfully!');
        setMessage('');
      } else {
        alert('Failed to send notification');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Error occurred while sending notification');
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Send Notification</h2>
      <textarea
        className="w-full p-2 border rounded mb-4"
        rows="5"
        placeholder="Enter notification message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        onClick={handleSend}
      >
        Send Notification
      </button>
    </div>
  );
};

export default SendNotification;
