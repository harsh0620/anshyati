import React from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <MdArrowBack
      onClick={() => navigate(-1)}
      className="cursor-pointer bg-white hover:bg-gray-200 hover:p-1 rounded-full text-3xl"
    />
  );
};

export default BackButton;
