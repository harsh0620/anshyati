import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { groupCategoryList, groupsColorShade } from "../../utils/constants";
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";
import SubTitle from "../SubTitle";

const CreateGroup = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    groupName: "",
    groupCategory: "Other",
  });
  const { groupName, groupCategory } = formData;
  // HANDLING FORM INPUTS
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  // CREATE GROUP FUNCTION
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!groupName || !groupCategory) {
        setLoading(false);
        toast.error("Please fill all the fields");
        return;
      }
      const formDataCopy = {
        ...formData,
        groupOwner: auth.currentUser.uid,
        groupTotal: 0,
        groupColor: groupsColorShade.get(groupCategory),
        groupMembers: [auth.currentUser.uid],
        groupSplit: [],
        createdAt: serverTimestamp(),
      };
      console.log(formDataCopy);
      const docRef = await addDoc(collection(db, "groups"), formDataCopy);
      setLoading(false);
      toast.success("Group created successfully");
      navigate(`/dashboard/groups/info/${docRef.id}`);
    } catch (error) {
      setLoading(false);
      toast.error("Could not create group, please try again later");
    }
  };
  useEffect(() => {
    // SETTING THE PAGE TITLE
    document.title = "Create Group";
  }, []);
  // RENDERING THE LOADING SPINNER
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="md:px-16 px-4">
      {/* RENDERING THE TITLE */}
      <SubTitle subTitle="Create New Group" />
      {/* RENDERING THE CREATE GROUP FORM */}
      <form
        className="flex flex-col w-full m-auto bg-white  rounded-lg 
      overflow-x-auto outlet shadow-lg hover:drop-shadow-xl
       py-4 px-4 items-center "
        onSubmit={onSubmit}
      >
        {/* GROUP NAME INPUT */}
        <input
          type="text"
          id="groupName"
          value={groupName}
          required
          placeholder="Enter Group Name"
          onChange={onChange}
          className="w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />
        {/* GROUP CATEGORY SELECT */}
        <select
          type="text"
          id="groupCategory"
          value={groupCategory}
          onChange={onChange}
          required
          className="w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 "
        >
          {groupCategoryList.map((type, index) => {
            return (
              <option key={index} value={type.category}>
                {type.category}
              </option>
            );
          })}
        </select>
        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Create Group
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;
