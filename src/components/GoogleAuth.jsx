import React from "react";
import { FcGoogle } from "react-icons/fc";
import { db } from "../firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
const GoogleAuth = () => {
  const navigate = useNavigate();
  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider).then(async (result) => {
        const user = result.user;
        console.log(user);
        //check for the user
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          await setDoc(docRef, {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            friends: [],
            timestamp: serverTimestamp(),
            userId: user.uid,
          });
          navigate("/dashboard");
        }
        navigate("/dashboard");
      });
    } catch (error) {
      toast.error("Could not authenticate with Google.Try Again..");
    }
  }
  return (
    <button
      type="button"
      onClick={onGoogleClick}
      className="flex w-full items-center justify-center mt-8
      bg-white text-black px-7 py-3 
      uppercase text-sm font-medium hover:bg-gray-300
       active:bg-gray-400 shadow-md hover:shadow-lg
       border-gray-300 border-2
    active:shadow-lg transition duration-150 ease-in-out rounded"
    >
      <FcGoogle className="text-2xl rounded-full mr-2" />
      Google
    </button>
  );
};

export default GoogleAuth;
