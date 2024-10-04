import React, { useEffect, useState } from "react";
import axios from "axios";

const AllRenter = () => {
  const [renters, setRenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRenter, setSelectedRenter] = useState(null); // State to hold the selected renter

  useEffect(() => {
    const fetchRenters = async () => {
      try {
        const response = await axios.get("http://localhost:3000/allrenters");
        setRenters(response.data.data);
      } catch (err) {
        setError(
          err.response?.data?.error ||
          "An error occurred while fetching renters"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRenters();
  }, []);

  const handleRenterClick = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/alldetails/${id}`
      ); // Change endpoint to /alldetails/:id
      setSelectedRenter(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching renter details:", error);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">All Renters</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Role</th>
              <th className="py-3 px-4 border-b">ID</th>
            </tr>
          </thead>
          <tbody>
            {renters.map((renter) => (
              <tr
                key={renter._id}
                className="hover:bg-gray-100 cursor-pointer transition duration-200"
                onClick={() => handleRenterClick(renter._id)}
              >
                <td className="py-3 px-4 border-b">{renter.name}</td>
                <td className="py-3 px-4 border-b">{renter.email}</td>
                <td className="py-3 px-4 border-b">{renter.role}</td>
                <td className="py-3 px-4 border-b">{renter._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Display selected renter details below the table */}
      {selectedRenter && (
        <div className="mt-8 p-6 border border-gray-300 rounded-lg bg-white shadow-md">
          <h3 className="text-2xl font-bold mb-4">Renter Details</h3>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {selectedRenter.renter.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedRenter.renter.email}
            </p>
            <p>
              <strong>Role:</strong> {selectedRenter.renter.role}
            </p>
          </div>
          <h4 className="text-xl font-bold mt-4">Allocated Rooms:</h4>
          {selectedRenter.rooms.length > 0 ? (
            <ul className="space-y-4">
              {selectedRenter.rooms.map((room) => (
                <li key={room._id} className="border p-4 rounded-lg bg-gray-100">
                  <p>
                    <strong>Room ID:</strong> {room._id}
                  </p>
                  <p>
                    <strong>Room Type:</strong> {room.room_type}
                  </p>
                  <p>
                    <strong>Room Number:</strong> {room.room_number}
                  </p>
                  <p>
                    <strong>Rent Price:</strong> ₹{room.rent_price}
                  </p>
                  <p>
                    <strong>User ID:</strong> {room.user}
                  </p>
                  {room.bills.length > 0 ? (
                    <table className="mt-2 w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border py-2">Month</th>
                          <th className="border py-2">Electric Bill Rate</th>
                          <th className="border py-2">Electric Bill Units</th>
                          <th className="border py-2">Total Bill</th>
                          <th className="border py-2">Is Paid</th>
                          <th className="border py-2">ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        {room.bills.map((bill) => (
                          <tr key={bill._id}>
                            <td className="border py-2">{bill.month}</td>
                            <td className="border py-2">₹{bill.electric_bill_rate}/unit</td>
                            <td className="border py-2">{bill.electric_bill_units}</td>
                            <td className="border py-2">₹{bill.total_bill}</td>
                            <td className="border py-2">{bill.is_paid ? "Yes" : "No"}</td>
                            <td className="border py-2">{bill._id}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="mt-2 text-gray-600">No bills available.</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-gray-600">No rooms allocated.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllRenter;
