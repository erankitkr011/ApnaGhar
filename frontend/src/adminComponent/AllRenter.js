import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from 'react-icons/fa';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllRenter = () => {
  const [renters, setRenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRenter, setSelectedRenter] = useState(null);

  useEffect(() => {
    const fetchRenters = async () => {
      try {
        const response = await axios.get("/allrenters");
        setRenters(response.data.data);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred while fetching renters");
      } finally {
        setLoading(false);
      }
    };

    fetchRenters();
  }, []);

  const handleRenterClick = async (id) => {
    try {
      const response = await axios.get(`/alldetails/${id}`);
      setSelectedRenter(response.data);
    } catch (error) {
      console.error("Error fetching renter details:", error);
    }
  };

  const deleteRenter = async (id) => {
    if (window.confirm("Are you sure you want to delete this renter?")) {
      try {
        await axios.delete(`/renter/${id}`);
        setRenters(renters.filter((renter) => renter._id !== id));
        setSelectedRenter(null);
        toast.success("Renter deleted successfully!");
      } catch (error) {
        toast.error("Error deleting renter!");
        console.error("Error deleting renter:", error);
      }
    }
  };

  const deleteRoom = async (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await axios.delete(`/room/${roomId}`);
        if (selectedRenter) {
          setSelectedRenter(prev => ({
            ...prev,
            rooms: prev.rooms.filter(room => room._id !== roomId),
          }));
        }
        toast.success("Room deleted successfully!");
      } catch (error) {
        toast.error("Error deleting room!");
        console.error("Error deleting room:", error);
      }
    }
  };

  const deleteBill = async (roomId, billId) => {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      try {
        await axios.delete(`/bill/${billId}`);
        if (selectedRenter) {
          setSelectedRenter(prev => ({
            ...prev,
            rooms: prev.rooms.map(room => 
              room._id === roomId
                ? { ...room, bills: room.bills.filter(bill => bill._id !== billId) }
                : room
            ),
          }));
        }
        toast.success("Bill deleted successfully!");
      } catch (error) {
        toast.error("Error deleting bill!");
        console.error("Error deleting bill:", error);
      }
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-600">All Renters</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {renters.map((renter) => (
              <tr
                key={renter._id}
                className="hover:bg-gray-100 cursor-pointer transition duration-200"
                onClick={() => handleRenterClick(renter._id)}
              >
                <td className="py-2 px-4 border-b">{renter.name}</td>
                <td className="py-2 px-4 border-b">{renter.email}</td>
                <td className="py-2 px-4 border-b">{renter.role}</td>
                <td className="py-2 px-4 border-b">{renter._id}</td>
                <td className="py-2 px-4 border-b">
                  <button onClick={() => deleteRenter(renter._id)} className="text-red-500">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Display selected renter details below the table */}
      {selectedRenter && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Renter Details</h3>
          <div className="space-y-2">
            <p><strong>Name:</strong> {selectedRenter.renter.name}</p>
            <p><strong>Email:</strong> {selectedRenter.renter.email}</p>
            <p><strong>Role:</strong> {selectedRenter.renter.role}</p>
          </div>
          <h4 className="text-lg sm:text-xl font-bold mt-4">Allocated Rooms:</h4>
          {selectedRenter.rooms.length > 0 ? (
            <div className="space-y-4">
              {selectedRenter.rooms.map((room) => (
                <div key={room._id} className="border p-4 rounded-lg bg-gray-100">
                  <p><strong>Room ID:</strong> {room._id}</p>
                  <p><strong>Room Type:</strong> {room.room_type}</p>
                  <p><strong>Room Number:</strong> {room.room_number}</p>
                  <p><strong>Rent Price:</strong> ₹{room.rent_price}</p>
                  <p><strong>User ID:</strong> {room.user}</p>
                  <button onClick={() => deleteRoom(room._id)} className="text-red-500 mt-2">
                    <FaTrash />
                  </button>
                  {room.bills.length > 0 ? (
                    <div className="mt-2 space-y-2">
                      {room.bills.map((bill) => (
                        <div key={bill._id} className="border p-4 rounded-lg bg-white shadow">
                          <p><strong>Month:</strong> {bill.month}</p>
                          <p><strong>Electric Bill Rate:</strong> ₹{bill.electric_bill_rate}/unit</p>
                          <p><strong>Electric Bill Units:</strong> {bill.electric_bill_units}</p>
                          <p><strong>Total Bill:</strong> ₹{bill.total_bill}</p>
                          <p><strong>Is Paid:</strong> {bill.is_paid ? "Yes" : "No"}</p>
                          <p><strong>Bill ID:</strong> {bill._id}</p>
                          <button onClick={() => deleteBill(room._id, bill._id)} className="text-red-500 mt-2">
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-gray-600">No bills available.</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-gray-600">No rooms allocated.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllRenter;
