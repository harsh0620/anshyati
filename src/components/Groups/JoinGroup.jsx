import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import Spinner from "../Spinner";

const JoinGroup = () => {
  const params = useParams();
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // SETTING THE PAGE TITLE
    document.title = "Join Group";
    // JOIN GROUP FUNCTION
    async function joinGroup() {
      try {
        setLoading(true);
        const groupRef = doc(db, "groups", params.groupId);
        // GETTING THE GROUP INFO
        await getDoc(groupRef).then((docs) => {
          if (
            docs.exists() &&
            !docs.data().groupMembers.includes(auth.currentUser.uid)
          ) {
            const groupSplitArray = [];
            for (let i = 0; i < docs.data().groupMembers.length; i++) {
              groupSplitArray.push({
                user1: docs.data().groupMembers[i],
                user2: auth.currentUser.uid,
                user1Value: 0,
                user2Value: 0,
              });
            }
            // UPDATING THE GROUP INFO WITH MEMBERS AND SPLIT ARRAY
            updateDoc(groupRef, {
              groupMembers: [...docs.data().groupMembers, auth.currentUser.uid],
              groupSplit: [...docs.data().groupSplit, ...groupSplitArray],
            });
            // UPDATING THE GROUP MEMBER USER INFO WITH JOINING GROUP USER
            for (let i = 0; i < docs.data().groupMembers.length; i++) {
              const ownerRef = doc(db, "users", docs.data().groupMembers[i]);

              getDoc(ownerRef).then((owner) => {
                if (
                  owner.exists() &&
                  !owner.data().friends.includes(auth.currentUser.uid)
                ) {
                  updateDoc(ownerRef, {
                    friends: [...owner.data().friends, auth.currentUser.uid],
                  });
                }
              });
            }
            // UPDATING THE JOINING GROUP USER INFO WITH GROUP MEMBERS
            const userRef = doc(db, "users", auth.currentUser.uid);
            getDoc(userRef).then((user) => {
              docs.data().groupMembers.forEach((member) => {
                if (user.exists() && !user.data().friends.includes(member)) {
                  updateDoc(userRef, {
                    friends: [...user.data().friends, member],
                  });
                }
              });
            });
            setLoading(false);
            toast.success("Joined group successfully");
            navigate("/dashboard/groups/info/" + params.groupId);
          } else {
            navigate("/dashboard/groups");
            toast.error("You are already a member of this group");
            return;
          }
        });
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong, please try again later");
        navigate("/dashboard/groups/info/" + params.groupId);
      }
    }
    // CALLING THE FUNCTIONS
    joinGroup();
  }, [auth.currentUser.uid, navigate, params.groupId]);

  // RENDERING LOADING SPINNER
  if (loading) {
    return (
      <>
        <Spinner />
      </>
    );
  }
  return (
    // JOIN GROUP TITLE
    <div
      className="bg-black bg-opacity-50 flex items-center justify-center
  fixed left-0 right-0 bottom-0 top-0 z-50
  "
    >
      Joining Group....
    </div>
  );
};

export default JoinGroup;
