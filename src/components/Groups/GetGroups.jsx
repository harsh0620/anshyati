import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { MdGroupAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { groupsCategoryIcon, groupsColorShade } from "../../utils/constants";
import Spinner from "../Spinner";

const GetGroups = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // SETTING THE TITLE OF THE PAGE
    document.title = "Groups";
    // GETTING THE GROUPS OF THE USER
    async function fetchGroups() {
      try {
        setLoading(true);
        const groupRef = collection(db, "groups");
        const q = query(
          groupRef,
          where("groupMembers", "array-contains", auth.currentUser.uid)
        );
        const groupsData = await getDocs(q);
        setGroups(
          groupsData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Could not fetch groups, please try again later");
      }
    }
    // CALLING THE FUNCTION
    fetchGroups();
  }, [auth.currentUser.uid, auth.currentUser.displayName]);
  // RENDERING THE LOADING SPINNER
  if (loading || !groups) {
    return (
      <>
        <Spinner />
      </>
    );
  }
  return (
    <div className={`mt-8 md:px-16 px-4 ${!groups && "animate-pulse"}`}>
      {/* RENDERING NO GROUPS TEXT */}
      {groups.length === 0 && (
        <div className="mt-16 m-auto flex items-center justify-center md:text-2xl text-lg font-medium">
          No groups found. Create a group to get started.
        </div>
      )}
      {/* RENDERING GROUPS CARDS */}
      {groups?.map((group, index) => {
        return (
          <div
            key={index}
            onClick={() => navigate(`/dashboard/groups/info/${group.id}`)}
            className={`border flex overflow-x-auto outlet items-center mt-4 mb-4 rounded-md md:px-8 px-2 py-2 w-full justify-start bg-white hover:drop-shadow-xl shadow-lg cursor-pointer  `}
          >
            <div
              className="text-xl border-2 rounded-md p-2"
              style={{
                color: groupsColorShade.get(group.groupCategory),
              }}
            >
              {groupsCategoryIcon.get(group.groupCategory)}
            </div>

            <div className="ml-4 flex w-full flex-col">
              <div
                className={`text-lg font-bold 
                uppercase`}
                style={{ color: groupsColorShade.get(group.groupCategory) }}
              >
                {group.groupName}
              </div>
              <div className="text-sm text-gray-500">
                {group.groupTotal === 0 && "no expenses"}
                {group.groupTotal !== 0 && `Group Total: ${group.groupTotal}`}
              </div>
            </div>
          </div>
        );
      })}
      {/* RENDERING ADD GROUP BUTTON */}
      <div
        onClick={() => navigate("/dashboard/groups/create")}
        className="cursor-pointer border-2 mt-8 w-fit text-lg md:text-xl font-semibold border-gray-300 flex items-center justify-center mx-auto rounded-lg p-2 bg-white shadow-xl hover:drop-shadow-lg"
      >
        <div>
          <MdGroupAdd />
        </div>
        <div className="ml-2">Add Group</div>
      </div>
    </div>
  );
};

export default GetGroups;
