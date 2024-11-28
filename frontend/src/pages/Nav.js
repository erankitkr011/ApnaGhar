import React from "react";
import {
  Routes,
  Route,
  NavLink,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Home from "./Home";
import Login from "../components/Login";
import Admin from "../adminComponent/Admin";
import PaymentHis from "../userComponents/PaymentHis";
// import Paytm from "../Paytm/Paytm";
import { FiLogOut } from "react-icons/fi";
import Razorpay from "../Razorpay/Razorpay";
import TermsAndConditions from "./TermsAndConditions";
import PrivacyPolicy from "./PrivacyPolicy";
import RefundsCancellations from "./RefundsCancellations";

const Nav = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const role = userDetails ? userDetails.user.role : null;
  const token = userDetails ? userDetails.token : null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 bg-white/30 backdrop-blur-md border-b border-gray-200 shadow-md p-4 sm:p-6 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="text-xl sm:text-xl font-serif bg-indigo-400 border border-indigo-600 p-2 rounded-md">
              Dulari{" "}
              <span className="text-2xl sm:text-3xl font-bold">🏠 भवन</span>
            </div>
            {token && (
              <>
                {role === "renter" ? (
                  <>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? "text-md sm:text-lg font-semibold underline underline-offset-4 text-red-600"
                          : "text-md sm:text-lg font-semibold hover:underline"
                      }
                    >
                      Home
                    </NavLink>

                    <NavLink
                      to="/payment-history"
                      className={({ isActive }) =>
                        isActive
                          ? "text-md sm:text-lg font-semibold underline underline-offset-4 text-red-600"
                          : "text-md sm:text-lg font-semibold hover:underline"
                      }
                    >
                      Receipt
                    </NavLink>
                  </>
                ) : (
                  <NavLink
                    to="/admin"
                    className="text-md sm:text-lg font-semibold text-blue-600 hover:underline"
                  >
                    Admin
                  </NavLink>
                )}
              </>
            )}
          </div>
          {token ? (
            <button
              onClick={handleLogout}
              className="ml-2 text-2xl sm:text-3xl font-semibold text-red-600 hover:underline"
            >
              <FiLogOut />
            </button>
          ) : (
            <NavLink
              to="/login"
              className="text-md sm:text-lg font-semibold text-blue-600 hover:underline"
            >
              Login
            </NavLink>
          )}
        </div>
      </nav>

      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            token && role === "renter" ? <Home /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/payment-history"
          element={
            token && role === "renter" ? (
              <PaymentHis />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* <Route
          path="/paytm"
          element={
            token && role === "renter" ? <Paytm /> : <Navigate to="/login" />
          }
        /> */}
        <Route
          path="/razorpay"
          element={
            token && role === "renter" ? <Razorpay /> : <Navigate to="/login" />
          }
        />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Admin Route (Protected) */}
        <Route
          path="/admin"
          element={
            token && role === "admin" ? <Admin /> : <Navigate to="/login" />
          }
        />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
        <Route path="/refunds-cancellations" element={<RefundsCancellations/>} />
      </Routes>
    </div>
  );
};

export default Nav;
