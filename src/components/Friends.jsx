import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { MdGroup } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import HeaderTitle from "./HeaderTitle";
import { useEffect } from "react";
import FriendsListItem from "./Friends/FriendsListItem";
import { toast } from "react-toastify";
import Modal from "react-modal";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "./Spinner";
import ShareModal from "./ShareModal";

const Friends = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // MODAL HANDLERS
  function handleCloseModal() {
    setShowModal(false);
  }
  function handleOpenModal() {
    setShowModal(true);
  }
  useEffect(() => {
    document.title = "Friends";
    async function getFriends() {
      try {
        setLoading(true);
        const docRef = doc(db, "users", auth.currentUser.uid);
        await getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            if (docSnap.data().friends.length === 0) {
              return;
            }
            const userRef = collection(db, "users");
            const q = query(
              userRef,
              where("userId", "in", docSnap.data().friends)
            );
            getDocs(q).then((querySnapshot) => {
              const users = [];
              querySnapshot.forEach((doc) => {
                users.push({
                  userId: doc?.data()?.userId,
                  name: doc?.data()?.name,
                  email: doc?.data()?.email,
                  photoURL: doc?.data()?.photoURL,
                });
              });
              setFriends(users);
            });
            setLoading(false);
          }
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("Something went wrong, please try again later");
      }
    }
    getFriends();
  }, [auth.currentUser.uid]);
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
  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      {/* COMPONENT:TITLE */}
      <HeaderTitle title="Friends" icon={<MdGroup />} />
      {/* COMPONENT:FRIENDS LIST */}
      <div className="md:px-16 px-4 mt-8">
        {friends.length > 0 ? (
          <div>
            {friends?.map((friend, index) => (
              <FriendsListItem friend={friend} key={index} comp="friend" />
            ))}
          </div>
        ) : (
          <div className="text-xl font-bold flex items-center justify-center ">
            NO FRIENDS....
          </div>
        )}
        {/*COMPONENT:ADD FRIEND BUTTON*/}
        <div
          onClick={handleOpenModal}
          className="border-2 mt-5 w-fit text-lg md:text-xl font-semibold border-gray-300 flex items-center justify-center mx-auto rounded-lg p-2"
        >
          <div>
            <IoMdPersonAdd />
          </div>
          <div className="ml-2">Add Friend</div>
        </div>
        <Modal
          isOpen={showModal}
          contentLabel="MY QR SCANNER"
          onRequestClose={handleCloseModal}
          style={customStyles}
        >
          <ShareModal
            URL={` https://www.anshyati.harshchandravanshi.live/dashboard/add-friend/${auth.currentUser.uid}`}
            TYPE="FRIEND"
          />
        </Modal>
      </div>
    </div>
  );
};

export default Friends;
