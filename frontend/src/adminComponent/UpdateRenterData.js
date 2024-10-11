import React, { useState } from 'react';
import axios from 'axios';

const UpdateRenterData = () => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('renter');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the object with only non-empty fields
    const updatedData = {
      ...(name && { name }), // Add name only if it's not empty
      ...(email && { email }), // Add email only if it's not empty
      ...(password && { password }), // Add password only if it's not empty
      ...(role && { role }) // Add role only if it's not empty
    };

    try {
      const response = await axios.put(`http://localhost:4000/users/${userId}`, updatedData);
      setMessage(response.data.message);
      setError('');
      // Optionally, you can clear the form after successful update
      setName('');
      setEmail('');
      setPassword('');
      setRole('renter');
      setUserId('');
    } catch (err) {
      setError('Error updating user');
      setMessage('');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-indigo-600">Update Renter Data</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <div className="mb-4">
          <label className="block mb-2 font-medium">User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="renter">Renter</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="bg-indigo-600 text-white p-2 rounded w-full">
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateRenterData;
