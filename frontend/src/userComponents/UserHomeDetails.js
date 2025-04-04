import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ShareShotDetails from './ShareShotDetails';

const UserHomeDetails = () => {
  const [homes, setHomes] = useState([]);
  const [error, setError] = useState('');
  const [billsToShow, setBillsToShow] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeDetails = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No token found');
        return;
      }

      try {
        const response = await axios.get('/gethomedetails', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHomes(response.data.home);
        // console.log(response.data.home);
      } catch (err) {
        setError('Error fetching home details');
      }
    };

    fetchHomeDetails();
  }, []);

  const handlePayNow = (billId, totalBill) => {
    navigate('/razorpay', { state: { billId, totalAmount: totalBill } });
  };

  const handleShareShot = (id) => {
    setSelectedBill(id);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedBill(null);
  };

  const loadMoreBills = () => {
    setBillsToShow((prev) => prev + 1);
  };

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (homes.length === 0) {
    return <p className="text-center text-white mt-10 text-2xl">No Room Allocated YET..</p>;
  }

  return (
    <div className="container mx-auto mt-10 p-6 bg-indigo-200 rounded-lg shadow-lg">
      <h2 className="text-4xl font-semibold font-serif mb-6">Home Details</h2>
      {homes.map((home, index) => (
        <div key={index} className="mb-8">
          <div className="bg-gray-600 text-white p-4 rounded-md shadow-md mb-4">
            <div className="grid gap-2">
              <p className="font-bold">
                <strong>Room Type:</strong>
                <span className="font-medium ml-2">{home.room_type.toUpperCase()}</span>
              </p>
              <p className="font-bold">
                <strong>Room Number:</strong>
                <span className="font-medium ml-2">{home.room_number}</span>
              </p>
              <p className="font-bold">
                <strong>Rent Price:</strong>
                <span className="font-medium ml-2">{home.rent_price}</span>
              </p>
            </div>
          </div>

          <h3 className="text-3xl font-serif font-semibold mb-4">Bills</h3>
          <div className="grid gap-8 font-serif">
            {home.bills
              .slice(0)
              .reverse()
              .slice(0, billsToShow)
              .map((bill) => (
                <div
                  key={bill._id}
                  className="p-6 bg-gray-100 rounded-md shadow-md space-y-4 flex justify-between m-4 flex-wrap"
                >
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      <strong>Bill ID:</strong> {bill._id}
                    </p>
                    <p className="text-gray-700">
                      <strong>Month:</strong> {bill.month.toUpperCase()}
                    </p>
                    <p className="text-gray-700">
                      <strong>Meter Reading:</strong> {bill.meterReading}
                    </p>
                    <p className="text-gray-700">
                      <strong>Electric Bill Units:</strong> {bill.electric_bill_units}
                    </p>
                    <p className="text-gray-700">
                      <strong>Electric Bill Rate:</strong> {bill.electric_bill_rate}
                    </p>
                    <p className="text-gray-700">
                      <strong>Total Bill:</strong> {bill.total_bill}
                    </p>
                    <p className="text-gray-700">
                      <strong>Pay on:</strong> 9453699626 / 7677767594
                    </p>
                    {bill.is_paid ? (
                      <p className="text-green-500">
                        <strong>Paid:</strong> Yes
                      </p>
                    ) : (
                      <div className="flex flex-wrap justify-evenly">
                        <button
                          onClick={() => handlePayNow(bill._id, bill.total_bill)}
                          className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                          Pay Now
                        </button>
                        <button
                          onClick={() => handleShareShot(bill._id)}
                          className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                          Share Shot
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <img src={bill.image_url} alt="img" className="w-[200px] h-[200px] rounded-2xl" />
                  </div>
                  {
                    bill.shot_url && <div>
                    <img src={bill.shot_url} alt="img" className="w-[200px] h-[200px] rounded-2xl" />
                  </div>
                  }
                </div>
              ))}
          </div>
          {home.bills.length > billsToShow && (
            <button
              onClick={loadMoreBills}
              className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Load More
            </button>
          )}
        </div>
      ))}

      {/* Popup */}
      {showPopup && selectedBill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center mt-20">
          <div className="bg-white rounded-lg p-6 shadow-lg relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4">Share Bill Details</h2>
              <ShareShotDetails id={selectedBill}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHomeDetails;
