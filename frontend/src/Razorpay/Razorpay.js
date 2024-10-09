import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RazorpayComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { billId, totalAmount } = location.state || {};

  const [email, setEmail] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [orderId, setOrderId] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [loading, setLoading] = useState(false); // New loading state

  const createRazorpayOrder = async (amount) => {
    try {
      setLoading(true); // Set loading to true when starting the order creation
      const { data } = await axios.post('http://localhost:3000/orders', {
        amount,
        currency: 'INR',
      });
      setOrderId(data);
      handleRazorpayScreen(data.id, amount * 100);
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleRazorpayScreen = async (orderId, amount) => {
    const res = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Failed to load Razorpay SDK.');
      return;
    }

    const options = {
      key: 'rzp_test_1862b1A6yEY3Wt',
      amount: amount,
      currency: 'INR',
      name: 'Dulari Bhawan',
      description: 'Payment for Bill',
      image: 'https://dularibhawan.com/demo.png',
      order_id: orderId,
      handler: (response) => {
        setPaymentStatus(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        setPaymentId(response.razorpay_payment_id);
      },
      prefill: {
        name: 'Ankit Kumar',
        email,
      },
      theme: {
        color: '#F4C430',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const updateBillStatus = async () => {
      try {
        await axios.put(`http://localhost:3000/update/${billId}`, {
          is_paid: true,
        });
      } catch (error) {
        console.error('Error updating bill:', error);
      }
    };

    const Receipt = async () => {
      const token = localStorage.getItem('token');
      try {
        await axios.post('http://localhost:3000/receipt', {
          billId,
          paymentId,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      } catch (error) {
        console.error('Error creating receipt:', error);
      }
    };

    if (paymentStatus) {
      updateBillStatus();
      toast.success("Payment sucessfull")
      Receipt();
    }
  }, [paymentStatus, billId, paymentId]);

  const sendSucessMail=async()=>{
    try {
      await axios.post('http://localhost:3000/sendmail', {
        billId,
        email
      });
      
    } catch (error) {
      console.log(error)
    } 
}

  return (
    <div className="container mx-auto mt-10 p-6 bg-indigo-200 rounded-lg shadow-lg">
      <h2 className="text-4xl font-semibold mb-6">Pay Now</h2>
      {billId && <p className="text-lg">You are paying for Bill ID: <strong>{billId}</strong></p>}
      <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label className="block text-lg font-medium">Amount:</label>
          <input
            type="text"
            value={totalAmount || 'Loading...'}
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white px-4 py-2 rounded-md`}
          onClick={() => createRazorpayOrder(totalAmount)}
          disabled={loading} // Disable button when loading
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
      {paymentStatus && sendSucessMail() && navigate('/payment-history')}
    </div>
  );
};

export default RazorpayComponent;
