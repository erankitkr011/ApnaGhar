import React from "react";

import UserHomeDetails from "../userComponents/UserHomeDetails";
import Profile from "../userComponents/Profile";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="bg-indigo-950 min-h-screen p-4">
      <Profile/>
      <UserHomeDetails />
      <div className=" mt-10">
      <Footer/>
      </div>
    </div>
  );
};

export default Home;
