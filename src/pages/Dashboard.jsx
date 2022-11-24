import React from "react";
import { Outlet } from "react-router-dom";
import Avatar from "../components/Avatar";
import BigSidebar from "../components/BigSidebar";
import SmallSidebar from "../components/SmallSidebar";

const Dashboard = () => {
  return (
    <main className="flex md:flex-row flex-col-reverse ">
      <div className="w-[25%] md:h-screen">
        <BigSidebar />
        <SmallSidebar />
      </div>
      <div className="md:h-screen pt-5 w-full scroll-smooth overflow-y-auto outlet  mx-auto pb-20">
        <Outlet />
        <Avatar />
      </div>
    </main>
  );
};

export default Dashboard;
