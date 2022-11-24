import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import USER from "../assets/images/user.png";
const Avatar = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [openDialog, setOpenDialog] = useState(false);
  function onLogout() {
    setOpenDialog((prev) => !prev);
    auth.signOut();
    navigate("/");
  }
  return (
    <div
      className="z-100 fixed
    left-auto right-5 md:right-16 top-6 bottom-auto "
    >
      {auth?.currentUser?.photoURL &&
      auth?.currentUser?.photoURL?.length !== 0 ? (
        <div
          className="transition ease-in-out cursor-pointer z-100"
          onClick={() => setOpenDialog((prev) => !prev)}
        >
          <img
            src={auth?.currentUser?.photoURL}
            alt="avatar"
            className="w-[48px] h-[48px] rounded-full z-100"
          ></img>
        </div>
      ) : (
        <div
          className="transition ease-in-out cursor-pointer z-100"
          onClick={() => setOpenDialog((prev) => !prev)}
        >
          <img
            src={USER}
            alt="avatar"
            className="w-[48px] h-[48px] rounded-full z-100"
          ></img>
        </div>
      )}

      {openDialog && (
        <div className="absolute right-5 top-12 bg-white w-36 rounded-lg z-100 shadow-md border-slate-100 border hover:shadow-lg">
          <div className="flex flex-col h-full ">
            <div
              onClick={() => {
                navigate("/dashboard/settings");
                setOpenDialog((prev) => !prev);
              }}
              className="text-md font-semibold text-gray-600 w-full flex items-center justify-center border-b border-slate-300 cursor-pointer p-2"
            >
              Profile
            </div>
            <div
              onClick={() => {
                navigate("/dashboard/friends");
                setOpenDialog((prev) => !prev);
              }}
              className="text-md font-semibold text-gray-600 w-full flex items-center justify-center border-b border-slate-300 cursor-pointer p-2"
            >
              Add Friend
            </div>
            <div
              className="text-md font-semibold text-gray-600 w-full flex items-center justify-center cursor-pointer p-2"
              onClick={onLogout}
            >
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
