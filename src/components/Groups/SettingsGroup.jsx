import { getAuth } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BiLinkAlt } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import USER from "../../assets/images/user.png";
import Modal from "react-modal";
import {
  groupCategoryList,
  groupsCategoryIcon,
  groupsColorShade,
} from "../../utils/constants";
import Loader from "../Loader";
import Spinner from "../Spinner";
import ShareModal from "../ShareModal";

const SettingsGroup = () => {
  const auth = getAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [groupInfo, setGroupInfo] = useState({});
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [changeDetail, setChangeDetail] = useState(false);
  const [groupMembersInfo, setGroupMembersInfo] = useState([]);
  const [formData, setFormData] = useState({
    groupName: "",
    groupCategory: "Other",
  });
  const { groupName, groupCategory } = formData;
  // MODAL HANDLERS
  function handleCloseModal() {
    setShowModal(false);
  }
  function handleOpenModal() {
    setShowModal(true);
  }
  // INPUT HANDLER
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  // DELETE GROUP FUNCTION
  const deleteGroup = async () => {
    try {
      setLoading(true);
      if (window.confirm("Are you sure you want to delete?")) {
        await deleteDoc(doc(db, "groups", params.groupId));
        navigate("/dashboard/groups");
        toast.success("Successfully deleted the group");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Could not delete the group");
    }
  };
  // LEAVE GROUP FUNCTION
  const leaveGroup = async () => {
    try {
      setLoading(true);
      const temp = [];
      for (let i = 0; i < groupInfo.groupMembers.length; i++) {
        if (groupInfo.groupMembers[i] !== auth.currentUser.uid) {
          temp.push(groupInfo.groupMembers[i]);
        }
      }
      groupInfo.groupMembers = temp;
      const docRef = doc(db, "groups", params.groupId);
      await updateDoc(docRef, {
        groupMembers: groupInfo.groupMembers,
      });
      setLoading(false);
      navigate("/dashboard/groups");
      toast.success("Leave the group successfully");
    } catch (error) {
      setLoading(false);
      toast.error("Could not leave group. Try Again.....");
    }
  };
  // UPDATE GROUP FUNCTION
  const onUpdate = async () => {
    try {
      setLoadingUpdate(true);
      const docRef = doc(db, "groups", params.groupId);
      await updateDoc(docRef, {
        groupName,
        groupCategory,
      });
      setLoadingUpdate(false);
      toast.success("Group details updated");
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } catch (error) {
      setLoadingUpdate(false);
      toast.error("Could not update the Group details");
    }
  };
  useEffect(() => {
    document.title = "Settings | Group";
    // FETCHING GROUP INFO FUNCTION
    async function fetchGroupsInfo() {
      try {
        setLoading(true);
        const docRef = doc(db, "groups", params.groupId);
        await getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            if (docSnap.data().groupMembers.includes(auth.currentUser.uid)) {
              setGroupInfo(docSnap.data());
              setGroupInfo({ id: docRef.id, ...docSnap.data() });
              setFormData((prevState) => ({
                ...prevState,
                groupName: docSnap.data().groupName,
                groupCategory: docSnap.data().groupCategory,
              }));
              const userRef = collection(db, "users");
              const q = query(
                userRef,
                where("userId", "in", docSnap.data().groupMembers)
              );
              getDocs(q).then((querySnapshot) => {
                const users = [];
                querySnapshot.forEach((doc) => {
                  users.push({
                    userId: doc.data().userId,
                    name: doc.data().name,
                    email: doc.data().email,
                    photoURL: doc.data().photoURL,
                  });
                });
                setGroupMembersInfo(users);
              });
            } else {
              setLoading(false);
              toast.error("You are not a member of this group");
              navigate("/dashboard/groups");
              return;
            }
          }
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Could not fetch group info, Try again");
      }
    }
    // CALLING THE FUNCTION
    fetchGroupsInfo();
  }, [params.groupId, navigate, auth.currentUser.uid]);
  // MODAL STYLES
  Modal.defaultStyles.overlay.backgroundColor = "rgba(0,0,0,0.502)";
  Modal.setAppElement("#root");
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "auto",
      height: "auto",
      backgroundColor: "white",
      boxShadow:
        "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
      borderRadius: " 8px",
      padding: "0px",
    },
  };
  // RENDERING THE LOADER SPINNER
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="md:px-16 px-4 flex flex-col">
      {/* RENDERING THE GROUP INFO WITH EDIT OPTIONS */}
      <div
        className="bg-white w-full rounded-lg 
      overflow-x-auto outlet shadow-lg sm:hover:drop-shadow-xl border-gray 
      border py-4 px-4 flex  flex-row items-center mt-8"
      >
        <div className="flex flex-row items-center justify-center">
          <div
            className={`md:text-3xl text-xl  flex items-center  justify-center border-4 border-white rounded-md p-4  ${
              groupInfo.groupCategory === "Home"
                ? "bg-blue-300"
                : groupInfo.groupCategory === "Office"
                ? "bg-blue-300"
                : groupInfo.groupCategory === "Couple"
                ? "bg-yellow-300"
                : groupInfo.groupCategory === "Trip"
                ? "bg-red-300"
                : groupInfo.groupCategory === "Sports"
                ? "bg-green-300"
                : groupInfo.groupCategory === "Other"
                ? "bg-orange-300"
                : ""
            }`}
            style={{
              color: groupsColorShade.get(groupInfo.groupCategory),
            }}
          >
            {groupsCategoryIcon.get(groupInfo.groupCategory)}
          </div>
          {/* GROUP INFO EDIT FORM */}
          <form className="mr-2 items-center flex flex-col sm:justify-start justify-center ml-4 md:ml-8">
            {/* GROUP NAME INPUT */}
            <input
              type="text"
              id="groupName"
              value={groupName}
              required
              onChange={onChange}
              disabled={!changeDetail || loadingUpdate}
              className={`
                w-full flex items-center bg-white sm:justify-start text-black justify-center sm:text-2xl text-sm font-semibold ${
                  !changeDetail && "border-none"
                }
                ${
                  changeDetail &&
                  " w-full text-sm text-gray-700  border border-gray-300 rounded transition ease-in-out bg-white focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                }`}
            />
            {/* GROUP CATEGORY SELECT */}
            <select
              type="text"
              id="groupCategory"
              value={groupCategory}
              onChange={onChange}
              required
              disabled={!changeDetail || loadingUpdate}
              className={`
                 flex items-center w-full bg-white sm:justify-start text-black justify-center sm:text-lg text-sm font-semibold ${
                   !changeDetail && "border-none appearance-none"
                 }
                ${
                  changeDetail &&
                  " w-full text-sm mt-2 text-gray-700  border border-gray-300 rounded transition ease-in-out bg-white focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                }`}
            >
              {groupCategoryList.map((type, index) => {
                return (
                  <option key={index} value={type.category}>
                    {type.category}
                  </option>
                );
              })}
            </select>
          </form>
        </div>
        {/* GROUP EDIT HANDLERS */}
        {groupInfo.groupOwner === auth.currentUser.uid ? (
          loadingUpdate ? (
            <Loader
              className="flex cursor-pointer items-center  ml-auto  justify-center md:text-2xl text-lg "
              textColor="text-gray-300"
              loaderColor="fill-black"
            />
          ) : changeDetail ? (
            <GrUpdate
              className="flex cursor-pointer items-center ml-auto  justify-center md:text-2xl text-lg "
              onClick={() => {
                changeDetail && onUpdate();
                setChangeDetail((prevState) => !prevState);
              }}
            />
          ) : (
            <MdEdit
              className="flex cursor-pointer items-center ml-auto  justify-center md:text-2xl text-lg "
              onClick={() => {
                changeDetail && onUpdate();
                setChangeDetail((prevState) => !prevState);
              }}
            />
          )
        ) : (
          <></>
        )}
      </div>
      {/* RENDERING GROUP MEMBERS */}
      <div
        className="bg-white w-full rounded-lg 
      overflow-x-auto outlet shadow-lg sm:hover:drop-shadow-xl border-gray 
      border py-4 px-4 flex flex-col items-center mt-8"
      >
        <div className=" flex  w-full  mb-2 p-2 ">
          <div className=" text-xl font-semibold   ">Group Members</div>
        </div>
        <div className=" transition duration-150 ease-in-out flex flex-row items-center p-2 w-full ">
          <div
            onClick={() => {
              handleOpenModal();
            }}
            data-bs-toggle="tooltip"
            title="Link Copied!!!"
            className="cursor-pointer text-blue-600 flex flex-row items-center text-xl border-2 border-gray300 rounded-md   p-2"
          >
            <BiLinkAlt />
            <span className=" ml-2">Invite using link</span>
          </div>
        </div>

        {/* GROUP MEMBERS CARDS */}
        {groupMembersInfo.map((member, index) => {
          return (
            <div
              key={index}
              className="p-2 overflow-x-auto outlet flex-row  items-center  w-full"
            >
              <div className="flex flex-row items-center  ">
                <img
                  src={
                    !member.photoURL || member?.photoURL?.length === 0
                      ? USER
                      : member?.photoURL
                  }
                  alt="profile"
                  className="sm:w-16 sm:h-16 w-12 h-12 rounded-full"
                />
                <div className="flex flex-col items-center  sm:ml-4 ml-2">
                  <p className="sm:text-lg text-md flex text-gray-800 w-full ">
                    {member.name}
                  </p>
                  <p className="text-xs sm:text-sm flex text-gray-500 w-full ">
                    {member.email}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* LEAVE OR DELETE GROUP BUTTONS */}
      <div
        className="bg-white w-full rounded-lg 
      overflow-x-auto outlet shadow-lg sm:hover:drop-shadow-xl border-gray 
      border py-4 px-4 flex sm:flex-row flex-col items-center mt-8"
      >
        {groupInfo.groupOwner !== auth.currentUser.uid && (
          <div
            onClick={leaveGroup}
            className=" sm:hover:drop-shadow-xl font-semibold mb-2 text-md sm:text-lg flex flex-row items-center sm:mr-0 cursor-pointer mr-auto border-2 border-red-500 text-red-500 p-2 rounded-lg"
          >
            <div className="items-center flex ">
              <TbLogout />
            </div>
            <div className="items-center flex justify-center sm:ml-4 ml-2">
              Leave Group
            </div>
          </div>
        )}
        {groupInfo.groupOwner === auth.currentUser.uid && (
          <div
            onClick={deleteGroup}
            className=" sm:hover:drop-shadow-xl font-semibold sm:ml-4 mb-2 text-md sm:text-lg flex flex-row items-center sm:mr-0 cursor-pointer mr-auto  border-2 border-red-500 text-red-500 p-2 rounded-lg"
          >
            <FaTrash className="items-center flex justify-center" />
            <div className="items-center flex justify-center sm:ml-4 ml-2">
              Delete Group
            </div>
          </div>
        )}
        <Modal
          isOpen={showModal}
          contentLabel="MY QR SCANNER"
          onRequestClose={handleCloseModal}
          style={customStyles}
        >
          <ShareModal
            URL={`https://www.anshyati.harshchandravanshi.live/dashboard/groups/join/${params.groupId}`}
            TYPE="GROUP"
          />
        </Modal>
      </div>
    </div>
  );
};

export default SettingsGroup;
