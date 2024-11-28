import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-6 rounded-2xl">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-4">
        {/* Left Side Content */}
        <div className="mb-4 md:mb-0 space-y-2">
          <p className="text-xl">
            We are helping by since 2000.
          </p>
          <p className="text-sm mt-6 font-mono">Owner: <span className='text-gray-400'>Ankit Kumar</span></p>
          <p className="text-sm">Address: <span className=' text-gray-400'>Dekulighat, Khandakper, Bihar, Nalanda, Bihar 803101</span></p>
          <p className="text-sm">Email: <a href="mailto:Erankitkr011@gmail.com" className="text-gray-400 hover:text-gray-300">Erankitkr011@gmail.com</a></p>
          <p className="text-sm">Mobile: <a href="tel:9453699626" className="text-gray-400 hover:text-gray-300">9453699626</a></p>

          <p className="text-sm mt-4">
            <Link to="/terms-and-conditions" className="text-gray-400 hover:text-gray-300">Terms and Conditions</Link>
          </p>

          <p className="text-sm">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-gray-300">Privacy Policy</Link>
          </p>

          <p className="text-sm">
            <Link to="/refunds-cancellations" className="text-gray-400 hover:text-gray-300">Refunds & Cancellations</Link>
          </p>
        </div>

        {/* Right Side Content */}
        <div className="text-right">
            <div className="text-xl sm:text-xl font-serif rounded-md">
              Dulari <span className="text-2xl sm:text-3xl font-bold">🏠 भवन</span>
            </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-6 pt-4">
        <p className="text-center text-sm text-gray-400">
          Made with &hearts; by <span className="text-gray-300">Ankit</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
