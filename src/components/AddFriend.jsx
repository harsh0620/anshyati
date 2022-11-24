import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import Spinner from "./Spinner";

const AddFriend = () => {
  const params = useParams();
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function AddFriend() {
      try {
        setLoading(true);
        if (auth.currentUser.uid === params.userId) {
          setLoading(false);
          toast.error("You can't add yourself as a friend");
          return;
        }
        const docRef = doc(db, "users", params.userId);
        await getDoc(docRef).then(async (docSnap) => {
          if (docSnap.exists()) {
            await updateDoc(docRef, {
              friends: [...docSnap.data().friends, auth.currentUser.uid],
            });
            const userRef = doc(db, "users", auth.currentUser.uid);
            await getDoc(userRef).then(async (userSnap) => {
              updateDoc(userRef, {
                friends: [...userSnap.data().friends, params.userId],
              });
              toast.success("Friend added successfully");
              navigate("/dashboard/friends");
            });
          }
        });
      } catch (error) {
        setLoading(false);
        navigate("/dashboard");
        toast.error(error.message);
        return;
      }
    }
    AddFriend();
  }, [navigate, auth.currentUser.uid, params.userId]);
  if (loading) {
    return (
      <>
        <Spinner />
      </>
    );
  }
  return (
    <h1
      className="bg-black bg-opacity-50 flex items-center justify-center
  fixed left-0 right-0 bottom-0 top-0 z-50
  "
    >
      Adding Friend....
    </h1>
  );
};

export default AddFriend;
