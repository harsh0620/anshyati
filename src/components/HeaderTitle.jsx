import React from "react";
import BackButton from "./BackButton";

const HeaderTitle = ({ title, icon }) => {
  return (
    <div className="md:text-3xl text-2xl bg-white font-bold flex items-center py-2 w-full md:px-16 px-4 mb-5 ">
      <BackButton />
      <div className="ml-5">{icon}</div>
      <span className=" ml-2 flex items-center">{title}</span>
    </div>
  );
};

export default HeaderTitle;
