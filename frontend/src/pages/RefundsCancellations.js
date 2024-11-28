import React from 'react';

const RefundsCancellations = () => {
  return (
    <div className="bg-white text-gray-800 p-8 md:p-12 lg:px-24 lg:py-16 rounded-xl shadow-lg max-w-4xl mx-auto my-12">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Refunds and Cancellations Policy</h1>

      <p className="mb-4 text-lg leading-relaxed">
        We understand that sometimes plans change. Below is our policy on refunds and cancellations for services and rentals.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. Cancellations</h2>
      <p className="mb-4">
        If you wish to cancel your rental booking, please notify us at least 7 days prior to your scheduled move-in date. Any cancellations made less than 7 days before the move-in date will result in the forfeiture of the deposit.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. Refunds</h2>
      <p className="mb-4">
        Refunds are applicable only under the following circumstances:
      </p>
      <ul className="list-disc ml-8 mb-4">
        <li>If the rental property becomes unavailable for reasons outside our control.</li>
        <li>If you cancel your booking more than 2 days before the move-in date, you will receive a full refund of your deposit.</li>
        <li>Partial refunds may be provided in cases of emergency cancellations, subject to approval.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. Refund Process</h2>
      <p className="mb-4">
        Once your cancellation is confirmed and approved, your refund will be processed within 7-10 business days. Refunds will be issued to the original payment method.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. Non-Refundable Charges</h2>
      <p className="mb-4">
        Please note that any service fees, utilities, or damage charges are non-refundable and will be deducted from your security deposit if applicable.
      </p>

      <p className="mt-8 mb-4 text-gray-600 text-sm">
        For any questions or concerns regarding our Refund and Cancellation Policy, feel free to contact us at <a href="mailto:Erankitkr011@gmail.com" className="text-blue-600 hover:underline">Erankitkr011@gmail.com</a>.
      </p>
    </div>
  );
};

export default RefundsCancellations;
