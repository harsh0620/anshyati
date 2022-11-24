import { getAuth, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { AiOutlineCamera, AiOutlineUpload } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import Modal from "react-modal";
import QRCode from "react-qr-code";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import USER from "../assets/images/user.png";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { MdEdit, MdFeedback, MdQrCode, MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { contactData } from "../utils/constants";
import HeaderTitle from "./HeaderTitle";
import { GrUpdate } from "react-icons/gr";
import QrScanner from "./Settings/QrScanner";

const Settings = () => {
  const auth = getAuth();
  const ADD_FRIEND = `${contactData.HOST}/dashboard/add-friend/${auth.currentUser.uid}`;
  const navigate = useNavigate();
  const [dp, setDp] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
  });
  const [changeDetail, setChangeDetail] = useState(false);
  const { name } = formData;
  // HANDLE INPUT CHANGE
  function onChangeInfo(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }
  // HANDLE DP CHANGE
  function onChange(e) {
    setDp(e.target.files[0]);
  }
  // MODAL HANDLERS
  function handleCloseModal() {
    setShowModal(false);
  }
  function handleOpenModal() {
    setShowModal(true);
  }
  function handleCloseModal2() {
    setShowModal2(false);
  }
  function handleOpenModal2() {
    setShowModal2(true);
  }
  // UPDATE PROFILE FUNCTION
  async function onUpdate() {
    try {
      setLoadingUpdate(true);
      if (auth.currentUser.displayName !== name) {
        //update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        // update name in the firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      setLoadingUpdate(false);
      toast.success("Profile details updated");
    } catch (error) {
      setLoadingUpdate(false);
      toast.error("Could not update the profile details");
    }
  }
  // upload dp to firebase storage
  async function onSubmit(e) {
    try {
      setLoading(true);
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `images/${dp.name}-${auth.currentUser.uid}-${Date.now()}`
      );

      const uploadTask = uploadBytesResumable(storageRef, dp);
      async function help(downloadUrl) {
        await updateProfile(auth.currentUser, {
          photoURL: downloadUrl,
        });

        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          photoURL: downloadUrl,
        });
        setLoading(false);
        toast.success("Dp updated successfully");
        setDp(null);
      }
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          setLoading(false);
          toast.error(error.message);
          return;
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            help(downloadURL);
          });
        }
      );
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  }
  // LOGOUT FUNCTION
  function onLogout() {
    auth.signOut();
    navigate("/");
  }
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
  useEffect(() => {
    // SETTING THE PAGE TITLE
    document.title = "Settings";
  }, []);
  return (
    <div>
      <HeaderTitle title="Settings" icon={<IoSettings />} />
      <div className="md:px-16 px-4">
        {/* RENDERING USER DETAILS WITH EDIT OPTION */}
        <div
          className="bg-white w-full rounded-lg 
      overflow-x-auto outlet shadow-lg sm:hover:drop-shadow-xl 
      border py-4 px-4 flex md:flex-row flex-col items-center "
        >
          <div className="relative">
            {auth?.currentUser?.photoURL?.length === 0 ||
            !auth?.currentUser?.photoURL ? (
              <div>
                <img
                  src={USER}
                  alt="displayPicture"
                  className="rounded-full  w-[100px] h-[100px]"
                />
              </div>
            ) : (
              <div>
                <img
                  src={
                    dp !== null
                      ? URL?.createObjectURL(dp)
                      : auth?.currentUser?.photoURL
                  }
                  alt="displayPicture"
                  className="rounded-full  w-[100px] h-[100px]"
                />
              </div>
            )}
            <form
              onSubmit={onSubmit}
              className="w-8 h-8 rouned-full absolute right-0 top-auto left-auto bottom-0"
            >
              {loading && (
                <label htmlFor="dp">
                  <div className=" bg-white  rounded-full w-8 h-8 object-cover">
                    <Loader
                      textColor="text-gray-300"
                      loaderColor="fill-black"
                    />
                  </div>
                </label>
              )}
              {!loading && (
                <label htmlFor="dp">
                  {dp !== null && (
                    <AiOutlineUpload
                      className="cursor-pointer  text-3xl bg-black text-white rounded-full p-1 "
                      onClick={onSubmit}
                    />
                  )}
                  {dp === null && (
                    <AiOutlineCamera className="cursor-pointer  text-3xl bg-black text-white rounded-full p-1 " />
                  )}
                </label>
              )}
              <input
                type="file"
                id="dp"
                accept=".jpg,.png,.jpeg"
                onChange={onChange}
                className="cursor-pointer  w-8 hidden rounded-full top-auto bottom-0 right-2 left-auto"
              />
            </form>
          </div>
          <div className="ml-5 flex flex-col">
            <form className="items-center flex md:justify-start justify-center">
              <input
                type="text"
                id="name"
                value={name}
                disabled={!changeDetail || loadingUpdate}
                onChange={onChangeInfo}
                className={`
                flex items-center bg-white md:justify-start justify-center md:text-2xl text-sm font-semibold ${
                  !changeDetail && "border-none"
                }
                ${
                  changeDetail &&
                  " w-full text-sm text-gray-700  border border-gray-300 rounded transition ease-in-out bg-white focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                }`}
              />
            </form>
            <div className="flex items-center min-w-full md:justify-start justify-center md:text-lg text-sm font-semibold text-gray-600">
              {auth?.currentUser?.email}
            </div>
          </div>
          {loadingUpdate ? (
            <Loader
              className="flex cursor-pointer items-center justify-center md:text-2xl text-lg md:ml-5"
              textColor="text-gray-300"
              loaderColor="fill-black"
            />
          ) : changeDetail ? (
            <GrUpdate
              className="flex cursor-pointer items-center justify-center md:text-2xl text-lg md:ml-5"
              onClick={() => {
                changeDetail && onUpdate();
                setChangeDetail((prevState) => !prevState);
              }}
            />
          ) : (
            <MdEdit
              className="flex cursor-pointer items-center justify-center md:text-2xl text-lg md:ml-5"
              onClick={() => {
                changeDetail && onUpdate();
                setChangeDetail((prevState) => !prevState);
              }}
            />
          )}
        </div>
        {/* RENDERING ADD FRIENDS CARD */}
        <div className="flex flex-col md:flex-row">
          <div
            className="bg-white w-full mt-5 md:mr-2 rounded-lg 
      overflow-x-auto outlet shadow-lg sm:hover:drop-shadow-xl 
      border py-4 px-4  items-center"
          >
            <div className="text-2xl font-semibold">Add Friends</div>
            <div
              onClick={handleOpenModal2}
              className="flex items-center ml-3 mt-3 text-lg text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <MdSearch />
              <div className="ml-2 text-lg font-semibold">Scan</div>
            </div>
            <Modal
              isOpen={showModal2}
              contentLabel="MY QR SCANNER"
              onRequestClose={handleCloseModal2}
              style={customStyles}
            >
              <QrScanner handleCloseModal2={handleCloseModal2} />
            </Modal>
            <div
              onClick={handleOpenModal}
              className="flex items-center ml-3 mt-3 text-lg text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <MdQrCode />
              <div className="ml-2 text-lg font-semibold">My Code</div>
            </div>
            <Modal
              isOpen={showModal}
              contentLabel="MY QR CODE"
              onRequestClose={handleCloseModal}
              style={customStyles}
            >
              <div className="flex flex-col items-center p-3">
                <div className="text-2xl font-semibold mb-5">My QR Code</div>
                <QRCode value={ADD_FRIEND} />
                <a
                  href={ADD_FRIEND}
                  className="border-2 border-gray-300 rounded-xl mt-5 p-2 text-center"
                >
                  {ADD_FRIEND}...
                </a>
              </div>
            </Modal>
          </div>
          {/* RENDERING FEEDBACK CARD */}
          <div
            className="bg-white w-full mt-5 md:ml-2 rounded-lg 
      overflow-x-auto outlet shadow-lg sm:hover:drop-shadow-xl 
      border py-4 px-4  items-center"
          >
            <div className="text-2xl font-semibold">Feedback</div>
            <a
              href={contactData.FEEDBACK_FORM}
              target="__blank"
              className="flex items-center ml-3 mt-3 text-lg text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <MdFeedback />
              <div className="ml-2 text-lg font-semibold">Rate Anshyati</div>
            </a>
            <a
              href={`mailto:${
                contactData.DEVELOPER_EMAIL
              }?subject=For Developer Support &body=Time:${new Date()}%0DHi Developer,This is ${
                auth.currentUser.displayName
              } and my mail is ${
                auth.currentUser.email
              }.%0DQuery:%0DFeedback:%0D`}
              className="flex items-center ml-3 mt-3 text-lg text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <BiSupport />
              <div className="ml-2 text-lg font-semibold">
                Contact Developer
              </div>
            </a>
          </div>
        </div>
        {/* RENDERING LOGOUT CARD */}
        <div
          className="flex items-center border border-gray-200 rounded-lg w-fit p-2 mt-3 text-xl text-black hover:text-gray-900 cursor-pointer"
          onClick={onLogout}
        >
          <TbLogout />
          <div className="ml-2 text-xl font-semibold">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
