import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserHomeDetails = () => {
  const [home, setHome] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHomeDetails = async () => {
      const token = localStorage.getItem('token'); // Fetch token from local storage

      if (!token) {
        setError('No token found');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/gethomedetails', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setHome(response.data.home);
      } catch (err) {
        setError('Error fetching home details');
      }
    };

    fetchHomeDetails();
  }, []);

  const handlePayNow = (billId) => {
    // Implement payment logic here. For example:
    console.log(`Paying for bill ID: ${billId}`);
    // You can redirect to a payment gateway or make an API request.
  };

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!home) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className='container mx-auto mt-10 p-6 bg-indigo-200  rounded-lg shadow-lg'>
      <h2 className='text-4xl font-semibold font-serif mb-6'>Home Details</h2>
      <div className='grid mb-8'>
        <p className="text-gray-700 font-extrabold"><strong>Room Type:</strong><span className=' font-medium ml-2'>{home.room_type}</span></p>
        <p className="text-gray-700 font-extrabold"><strong>Room Number:</strong> <span className=' font-medium ml-2'>{home.room_number}</span></p>
        <p className="text-gray-700 font-extrabold"><strong>Rent Price:</strong> <span className=' font-medium ml-2'>{home.rent_price}</span></p>
      </div>

      <h3 className='text-3xl font-serif font-semibold mb-4'>Bills</h3>
      <div className='grid gap-8'>
        {home.bills.map((bill) => (
          <div key={bill._id} className='p-4 bg-gray-100 rounded-md shadow-md space-y-4'>
            <p className="text-gray-700"><strong>Bill ID:</strong> {bill._id}</p>
            <p className="text-gray-700"><strong>Month:</strong> {bill.month}</p>
            <p className="text-gray-700"><strong>Electric Bill Units:</strong> {bill.electric_bill_units}</p>
            <p className="text-gray-700"><strong>Electric Bill Rate:</strong> {bill.electric_bill_rate}</p>
            <p className="text-gray-700"><strong>Total Bill:</strong> {bill.total_bill}</p>
            {bill.is_paid ? (
              <p className="text-green-500"><strong>Paid:</strong> Yes</p>
            ) : (
              <button
                onClick={() => handlePayNow(bill._id)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Pay Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHomeDetails;
