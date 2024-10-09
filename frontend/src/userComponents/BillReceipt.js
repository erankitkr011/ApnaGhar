import React, { useEffect, useState } from "react";
import axios from "axios";

const BillReceipt = () => {
  const [receipts, setReceipts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReceipts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/getreceipts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReceipts(response.data.receipts);
      } catch (err) {
        setError("Error fetching receipts");
      }
    };

    fetchReceipts();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto mt-10 p-6 bg-indigo-200 rounded-lg shadow-lg">
        <h2 className="text-4xl font-semibold font-serif mb-6">
          Payment History
        </h2>
        <p className="text-center text-gray-500">No bills generated yet.</p>
      </div>
    );
  }

  if (receipts.length === 0) {
    return (
      <div className="container mx-auto mt-10 p-6 bg-indigo-200 rounded-lg shadow-lg">
        <h2 className="text-4xl font-semibold font-serif mb-6">
          Payment History
        </h2>
        <p className="text-center text-gray-500">No bills generated yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 p-6 bg-indigo-200 rounded-lg shadow-lg">
      <h2 className="text-4xl font-semibold font-serif mb-6">
        Payment History
      </h2>
      {receipts
        .slice()
        .reverse()
        .map(
          (
            receipt // Reverse the array here
          ) => (
            <div
              key={receipt._id}
              className="p-4 bg-gray-100 rounded-md shadow-md space-y-4 mb-4"
            >
              <p className="text-gray-700">
                <strong>Receipt ID:</strong> {receipt._id}
              </p>
              <p className="text-gray-700">
                <strong>Bill ID:</strong> {receipt.billId}
              </p>
              <p className="text-gray-700">
                <strong>Payment ID:</strong> {receipt.paymentId}
              </p>
              <p className="text-gray-700">
                <strong>Amount:</strong> {receipt.amount / 100} INR
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong> {receipt.status}
              </p>
              <p className="text-gray-700">
                <strong>Payment Method:</strong> {receipt.method}
              </p>
              <p className="text-gray-700">
                <strong>Bank:</strong> {receipt.bank}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {receipt.email}
              </p>
              <p className="text-gray-700">
                <strong>Contact:</strong> {receipt.contact}
              </p>
              <p className="text-gray-700">
                <strong>Created At:</strong>{" "}
                {new Date(receipt.timespan).toLocaleString()}
              </p>
            </div>
          )
        )}
    </div>
  );
};

export default BillReceipt;
