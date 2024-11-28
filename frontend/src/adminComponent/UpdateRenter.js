import React, { useState } from 'react';
import axios from 'axios';

const UpdateRenter = () => {
  const [billId, setBillId] = useState('');
  const [electricBillUnits, setElectricBillUnits] = useState('');
  const [electricBillRate, setElectricBillRate] = useState('');
  const [totalBill, setTotalBill] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...(electricBillUnits && { electric_bill_units: electricBillUnits }),
      ...(electricBillRate && { electric_bill_rate: electricBillRate }),
      ...(totalBill && { total_bill: totalBill }),
      is_paid: isPaid,
    };

    try {
      await axios.put(`/bills/${billId}`, updatedData);
      setMessage('Bill updated successfully!');
      setError('');
      // Reset form after successful update
      setBillId('');
      setElectricBillUnits('');
      setElectricBillRate('');
      setTotalBill('');
      setIsPaid(false);
    } catch (err) {
      setError('Failed to update bill');
      setMessage('');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Update Bill</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {message && <p className="text-green-500 text-center">{message}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block mb-2">Bill ID:</label>
          <input
            type="text"
            value={billId}
            onChange={(e) => setBillId(e.target.value)}
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Electric Bill Units:</label>
          <input
            type="number"
            value={electricBillUnits}
            onChange={(e) => setElectricBillUnits(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Electric Bill Rate:</label>
          <input
            type="number"
            value={electricBillRate}
            onChange={(e) => setElectricBillRate(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Total Bill:</label>
          <input
            type="number"
            value={totalBill}
            onChange={(e) => setTotalBill(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isPaid}
              onChange={(e) => setIsPaid(e.target.checked)}
              className="mr-2"
            />
            Is Paid
          </label>
        </div>
        <button type="submit" className="bg-indigo-600 text-white p-2 rounded">
          Update Bill
        </button>
      </form>
    </div>
  );
};

export default UpdateRenter;
