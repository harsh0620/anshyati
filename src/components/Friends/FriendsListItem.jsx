import React from "react";
import USER from "../../assets/images/user.png";
const FriendsListItem = ({ friend, amount, comp }) => {
  return (
    <div className="border bg-white  mb-2 rounded-lg px-4 py-2 flex items-center cursor-pointer shadow-md hover:drop-shadow-lg">
      <img
        src={
          !friend.photoURL || friend?.photoURL?.length === 0
            ? USER
            : friend?.photoURL
        }
        alt="friend-pic"
        className="sm:h-12 sm:w-12 h-8 w-8 rounded-full"
      />
      <div className="flex flex-col ml-2">
        <div className="sm:text-xl text-sm font-semibold ml-2">
          {friend.name}
        </div>

        <div className="sm:text-md text-sm font-semibold ml-2 text-gray-500">
          {friend.email}
        </div>
      </div>
      {comp !== "friend" && (
        <div
          className={`ml-auto sm:text-sm text-xs ${
            amount > 0 ? "text-red-500" : "text-green-500"
          }`}
        >
          {amount > 0 ? "You owes" : "You are owed"}
          <br />
          <span className="font-semibold">
            {amount < 0 ? amount * -1 : amount}
          </span>
        </div>
      )}
    </div>
  );
};

export default FriendsListItem;
