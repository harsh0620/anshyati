import React from "react";

const Totals = ({ groupTotal }) => {
  return (
    <div className="md:px-16 px-4">
      {/* RENDERING GROUP TOTAL*/}
      {/* TODO: MONTH WISE RENDERING */}
      {/* <form className="flex flex-col items-center justify-center mt-5 ">
        <select
          className="border-2 border-gray-300 rounded-md w-full p-2 mb-5"
          onChange={onChange}
          id="month"
          name="month"
          value={month}
        >
          <option value={currentMonth}>This Month</option>
          <option value={-1}>All time</option>
        </select>
        <button className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Submit
        </button>
      </form> */}
      <div className="flex flex-col items-center text-3xl font-semibold mt-8">
        Totals: {groupTotal}
      </div>
    </div>
  );
};

export default Totals;
