import React, { useState } from "react";
import AddRenter from "./AddRenter";
import AllRenter from "./AllRenter";
import UpdateRenter from "./UpdateRenter";
import AllocateRoom from "./AllocateRoom";
import CreateBill from "./Bill";
import UpdateRenterData from "./UpdateRenterData";
import SendNotification from "./SendNotification";

const buttonStyles = {
  addRenter: "bg-blue-600 hover:bg-blue-700",
  allRenters: "bg-green-600 hover:bg-green-700",
  updateRenter: "bg-yellow-600 hover:bg-yellow-700",
  allocateroom: "bg-orange-600 hover:bg-orange-700",
  createbill: "bg-purple-600 hover:bg-purple-700",
  updatedata: "bg-teal-600 hover:bg-teal-700",
  sendNotification: "bg-red-600 hover:bg-red-700",
};

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
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => setActiveComponent("addRenter")}
          className={`${buttonStyles.addRenter} text-white w-full max-w-[150px] px-2 py-1 rounded transition`}
        >
          Add Renter
        </button>
        <button
          onClick={() => setActiveComponent("allRenters")}
          className={`${buttonStyles.allRenters} text-white w-full max-w-[150px] px-2 py-1 rounded transition`}
        >
          All Renters
        </button>
        <button
          onClick={() => setActiveComponent("updateRenter")}
          className={`${buttonStyles.updateRenter} text-white w-full max-w-[150px] px-2 py-1 rounded transition`}
        >
          Update Bill
        </button>
        <button
          onClick={() => setActiveComponent("allocateroom")}
          className={`${buttonStyles.allocateroom} text-white w-full max-w-[150px] px-2 py-1 rounded transition`}
        >
          Allocate Room
        </button>
        <button
          onClick={() => setActiveComponent("createbill")}
          className={`${buttonStyles.createbill} text-white w-full max-w-[150px] px-2 py-1 rounded transition`}
        >
          Create Bill
        </button>
        <button
          onClick={() => setActiveComponent("updatedata")}
          className={`${buttonStyles.updatedata} text-white w-full max-w-[150px] px-2 py-1 rounded transition`}
        >
          Update Data
        </button>
        <button
          onClick={() => setActiveComponent("sendNotification")}
          className={`${buttonStyles.sendNotification} text-white w-full max-w-[150px] px-2 py-1 rounded transition`}
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
