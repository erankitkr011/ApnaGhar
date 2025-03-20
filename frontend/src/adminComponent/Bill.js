import React, { useState } from 'react';
import axios from 'axios';
import { useImageUpload } from '../hooks/ImageUpload';

const CreateBill = () => {
  const [homeId, setHomeId] = useState('');
  const [month, setMonth] = useState('');
  const [meterReading, setMeterReading] = useState('0');
  const [meterImage, setMeterImage] = useState(null);
  const [electricBillUnits, setElectricBillUnits] = useState(0);
  const [electricBillRate, setElectricBillRate] = useState(8);
  const [totalBill, setTotalBill] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  // const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { uploadImage, uploading} = useImageUpload();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImage(meterImage);
    try {
      const response = await axios.post('/bills', {
        homeId,
        month,
        meterReading,
        electric_bill_units: electricBillUnits,
        electric_bill_rate: electricBillRate,
        total_bill: totalBill,
        is_paid: isPaid,
        // email,
        image_url: imageUrl
      });

      const { rentPrice, message} = response.data;
      const calculatedTotalBill = rentPrice + (electricBillUnits * electricBillRate);
      
      setTotalBill(calculatedTotalBill);
      setMessage(response.data.message);
      // console.log(response.data)
      setError('');
    } catch (err) {
      setError(err.response.data.error);
      setMessage('');
    }
  };

  const handleImageChange = async(e) => {
    const file = e.target.files[0];
    // console.log(file);
    if(!file) return;
    setMeterImage(file);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Bill</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Home ID:</label>
          <input
            type="text"
            value={homeId}
            onChange={(e) => setHomeId(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Month:</label>
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Meter Reading:</label>
          <input
            type="number"
            value={meterReading}
            onChange={(e) => setMeterReading(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Meter Image:</label>
          <input
            type="file"
            onChange={(e)=>handleImageChange(e)}
            accept="image/*"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Electric Bill Units:</label>
          <input
            type="number"
            value={electricBillUnits}
            onChange={(e) => setElectricBillUnits(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Electric Bill Rate:</label>
          <input
            type="number"
            value={electricBillRate}
            onChange={(e) => setElectricBillRate(e.target.value)}
            readOnly
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Total Bill (Rent + Electric Charges):</label>
          <input
            type="number"
            value={totalBill}
            onChange={(e) => setTotalBill(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div> */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={isPaid}
            onChange={(e) => setIsPaid(e.target.checked)}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label className="ml-2 block text-sm font-medium text-gray-700">Is Paid</label>
        </div>
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-2 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Create Bill
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default CreateBill;
