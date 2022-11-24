import React from "react";
import { MdDashboard, MdOutlineDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/anshyati-logo-white.png";
import { sidebarItems } from "../utils/constants";
const BigSidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="md:block hidden h-full w-full border-r-2">
      {/* RENDERING THE APP LOGO */}
      <header className="pt-4">
        <div className="flex items-center">
          <img
            src={logo}
            alt="logo"
            className="w-64 h-16 object-cover"
            onClick={() => navigate("/dashboard")}
          ></img>
        </div>
      </header>
      {/* RENDERING ALL THE OPTIONS */}
      <main className="mt-5">
        {/* HOME OPTION */}
        <div
          onClick={() => {
            navigate("/dashboard");
          }}
          className={`flex items-center py-3 px-6 ${
            (window.location.pathname === "/dashboard" ||
              window.location.pathname === "/dashboard/") &&
            "bg-blue-200 rounded-r-[32px] text-black"
          }
              md:text-xl
              text-lg
              font-semibold
              hover:bg-gray-200 hover:rounded-r-[32px] cursor-pointer text-gray-600`}
        >
          <div className="mr-3 ">
            {window.location.pathname === "/dashboard" ||
            window.location.pathname === "/dashboard/" ? (
              <MdDashboard />
            ) : (
              <MdOutlineDashboard />
            )}
          </div>
          <div>Home</div>
        </div>
        {/* ALL OTHER OPTIONS */}
        {sidebarItems.map((item, index) => {
          const { iconAbled, iconDisabled, title, link } = item;

          return (
            <div
              onClick={() => {
                navigate(link);
              }}
              key={index}
              className={`flex items-center py-3 px-6 ${
                window.location.pathname.indexOf(link) !== -1 &&
                "bg-blue-200 rounded-r-[32px] text-black"
              }
              md:text-xl
              text-lg
              font-semibold
              hover:bg-gray-200 hover:rounded-r-[32px] cursor-pointer text-gray-600`}
            >
              <div className="mr-3 ">
                {window.location.pathname.indexOf(link) !== -1
                  ? iconAbled
                  : iconDisabled}
              </div>
              <div>{title}</div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default BigSidebar;
