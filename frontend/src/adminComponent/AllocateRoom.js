import React, { useState } from 'react';
import axios from 'axios';

const AllocateRoom = () => {
  const [userId, setUserId] = useState('');
  const [roomType, setRoomType] = useState('flat');
  const [roomNumber, setRoomNumber] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/allocateroom', {
        userId,
        room_type: roomType,
        room_number: roomNumber,
        rent_price: rentPrice,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred while allocating the room');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Allocate Room</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">User ID:</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Room Type:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option value="flat">Flat</option>
            <option value="singleRoom">Single Room</option>
            <option value="shop">Shop</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Room Number:</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Rent Price:</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={rentPrice}
            onChange={(e) => setRentPrice(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Allocate Room
        </button>
      </form>
    </div>
  );
};

export default AllocateRoom;
