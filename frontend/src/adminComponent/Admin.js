import React, { useState } from "react";
import AddRenter from "./AddRenter";
import AllRenter from "./AllRenter";
import UpdateRenter from "./UpdateRenter";
import AllocateRoom from "./AllocateRoom";
import CreateBill from "./Bill";
import UpdateRenterData from "./UpdateRenterData";
import SendNotification from "./SendNotification";

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case "addRenter":
        return <AddRenter />;
      case "allRenters":
        return <AllRenter />;
      case "updateRenter":
        return <UpdateRenter />;
      case "allocateroom":
        return <AllocateRoom />;
      case "createbill":
        return <CreateBill />;
      case "updatedata":
        return <UpdateRenterData />;
      case "sendNotification":
        return <SendNotification />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveComponent("addRenter")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Renter
        </button>
        <button
          onClick={() => setActiveComponent("allRenters")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          All Renters
        </button>
        <button
          onClick={() => setActiveComponent("updateRenter")}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
        >
          Update Bill
        </button>
        <button
          onClick={() => setActiveComponent("allocateroom")}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
        >
          Allocate Room
        </button>
        <button
          onClick={() => setActiveComponent("createbill")}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
        >
          Create Bill
        </button>
        <button
          onClick={() => setActiveComponent('updatedata')}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
        >
          Update Data
        </button>
        <button
          onClick={() => setActiveComponent("sendNotification")} // Add Send Notification button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Send Notification
        </button>
      </div>

      <div className="mt-4">
        {renderComponent()}
        {!activeComponent && <AllRenter />}
      </div>
    </div>
  );
};

export default Admin;
