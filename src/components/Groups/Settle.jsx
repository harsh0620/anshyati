import { getAuth } from "firebase/auth";
import React from "react";
import Modal from "react-modal";
import { useEffect } from "react";
import FriendsListItem from "../Friends/FriendsListItem";
import { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spinner";

const Settle = () => {
  const auth = getAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [groupInfo, setGroupInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [settleInfo, setSettleInfo] = useState([]);
  const [amount, setAmount] = useState(0);
  const [user1Data, setUser1Data] = useState("");
  const [user2Data, setUser2Data] = useState("");

  // MODAL CLOSE FUNCTION
  function handleCloseModal() {
    setShowModal(false);
  }
  // MODAL OPEN FUNCTION
  function handleOpenModal() {
    setShowModal(true);
  }
  // HANDLE SETTLE FUNCTION
  async function handleSettle() {
    handleCloseModal();
    try {
      setLoading(false);
      groupInfo?.groupSplit.forEach((split) => {
        if (split.user1 === user1Data && split.user2 === user2Data) {
          split.user1Value = 0;
          split.user2Value = 0;
        }
      });
      const docRef = doc(db, "groups", params.groupId);
      await updateDoc(docRef, groupInfo);
      setLoading(false);
      toast.success("Settled Successfully");
      navigate("/dashboard/groups/info/" + params.groupId);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      toast.error("Could not settle, try again");
      navigate("/dashboard/groups/info/" + params.groupId);
    }
  }
  useEffect(() => {
    // SETTING THE PAGE TITLE
    document.title = "Groups Info | Settle";
    async function settleInfo() {
      try {
        const docRef = doc(db, "groups", params.groupId);
        await getDoc(docRef).then(async (docSnap) => {
          if (docSnap.exists()) {
            setGroupInfo(docSnap.data());
            for (let i = 0; i < docSnap.data().groupSplit.length; i++) {
              if (
                docSnap.data().groupSplit[i].user1 === auth.currentUser.uid &&
                docSnap.data().groupSplit[i].user1Value !== 0 &&
                docSnap.data().groupSplit[i].user2Value !== 0
              ) {
                const docRef = doc(
                  db,
                  "users",
                  docSnap.data().groupSplit[i].user2
                );
                await getDoc(docRef).then((userSnap) => {
                  if (userSnap.exists()) {
                    console.log(userSnap.data());
                  }
                  setSettleInfo((prev) => [
                    ...prev,
                    {
                      user1: docSnap.data().groupSplit[i].user1,
                      user2: docSnap.data().groupSplit[i].user2,
                      user2Value: docSnap.data().groupSplit[i].user2Value,
                      user2Data: userSnap.data(),
                    },
                  ]);
                });
              } else if (
                docSnap.data().groupSplit[i].user2 === auth.currentUser.uid &&
                docSnap.data().groupSplit[i].user1Value !== 0 &&
                docSnap.data().groupSplit[i].user2Value !== 0
              ) {
                const docRef = doc(
                  db,
                  "users",
                  docSnap.data().groupSplit[i].user1
                );
                await getDoc(docRef).then((userSnap) => {
                  if (userSnap.exists()) {
                    console.log(userSnap.data());
                  }
                  setSettleInfo((prev) => [
                    ...prev,
                    {
                      user1: docSnap.data().groupSplit[i].user2,
                      user2: docSnap.data().groupSplit[i].user1,
                      user2Value: docSnap.data().groupSplit[i].user1Value,
                      user2Data: userSnap.data(),
                    },
                  ]);
                });
              }
            }
          }
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("Could not fetch settle info, try again");
      }
    }
    settleInfo();
  }, []);

  // MODAL STYLE CONTENT
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
  // RENDERING THE LOADING SPINNER
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="md:px-16 px-4 mt-8">
      {/* RENDERING THE MEMBERS LIST HAVING ANY BALANCES LEFT */}
      {settleInfo?.map((info) => (
        <div
          key={info?.user2}
          onClick={() => {
            setUser1Data(info?.user1);
            setUser2Data(info?.user2);
            setAmount(
              info?.user2Value < 0 ? info?.user2Value * -1 : info?.user2Value
            );
            handleOpenModal();
          }}
        >
          <FriendsListItem friend={info?.user2Data} amount={info?.user2Value} />
        </div>
      ))}
      {/* RENDERING THE SETTLE MODAL */}
      <Modal
        isOpen={showModal}
        contentLabel="Settle up"
        onRequestClose={handleCloseModal}
        style={customStyles}
      >
        <div className="flex flex-col p-8 justify-center mt-5 w-[300px] h-[300px]">
          <div className="text-2xl font-semibold text-center">Settle up</div>
          <div className="text-4xl font-semibold text-center mt-2">
            {amount}
          </div>
          <div className="flex flex-row items-center justify-between w-full mt-16">
            <button
              onClick={handleSettle}
              className="mr-2 mb-6 w-full px-5 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Settle
            </button>
            <button
              onClick={handleCloseModal}
              className="ml-2 mb-6 w-full px-5 py-3 bg-red-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settle;
