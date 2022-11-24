import React from "react";
import spinner from "../assets/svg/spinner.svg";
const Spinner = () => {
  return (
    <div
      className="bg-black bg-opacity-50 flex items-center justify-center
    fixed left-0 right-0 bottom-0 top-0 z-50
    "
    >
      <img src={spinner} alt="Loading..." className="h-24 z-100"></img>
    </div>
  );
};

export default Spinner;
