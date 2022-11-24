import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleAuth from "../components/GoogleAuth";
import Logo from "../assets/images/anshyati-logo-white.png";
import Login from "../assets/svg/login.svg";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    friends: [],
    photoURL: "",
  });
  const { name, email, password } = formData;
  function onChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      if (password.length < 6) {
        setLoading(false);
        toast.error("Password must be atleast 8 characters long");
        return;
      }
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      formDataCopy.userId = auth.currentUser.uid;

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      setLoading(false);
      navigate("/dashboard");
      toast.success("Sign Up was successful");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something Went Wrong");
    }
  }
  return (
    <section className="md:px-0 px-2 md:pt-4 py-4">
      <div className="md:ml-12  w-32 h-8 right-auto bottom-auto">
        <img src={Logo} alt="logo" className="cover"></img>
      </div>
      <div
        className="flex justify-between flex-wrap items-center
      px-6 py-2 max-w-6xl mx-auto"
      >
        <div className="lg:p-[36px]  p-4 lg:mt-8 mt-14   w-full  md:w-[100%] lg:w-[40%] md:mx-0 mx-auto right-auto bottom-auto border border-black rounded-lg shadow-xl">
          <div className="w-full h-full ">
            <div className="text-2xl flex items-center">
              <BackButton /> <span className="ml-2">Welcome !</span>
            </div>
            <div className="mt-4 font-medium text-2xl">Sign up to</div>
            <div className="mt-1 font-normal text-base">Split the bill</div>

            <GoogleAuth />
            <div
              className="flex items-center my-4 text-gray-400 text-md font-light
          before:border-t  before:flex-1 before:border-gray-300
          after:border-t  after:flex-1 after:border-gray-300"
            >
              <p className="text-center font-semibold mx-4">or</p>
            </div>
            <form
              className="flex flex-col items-center w-full "
              onSubmit={onSubmit}
            >
              <div className="flex flex-col items-center w-full mb-4">
                <label
                  className="text-left w-full text-black text-lg font-medium"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="mt-2 w-full h-10 border border-gray-300 rounded
                transition duration-150 ease-in-out focus:text-gray-700
                 focus:bg-white focus:border-slate-600 p-2"
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  required={true}
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div className="flex flex-col items-center w-full mb-4">
                <label
                  className="text-left w-full text-black text-lg font-medium"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="mt-2 w-full h-10 border border-gray-300 rounded
                transition duration-150 ease-in-out focus:text-gray-700
                 focus:bg-white focus:border-slate-600 p-2"
                  type="email"
                  id="email"
                  placeholder="Enter Email Address"
                  required={true}
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="relative flex flex-col items-center w-full">
                <label
                  className="text-left w-full text-black text-lg font-medium"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className=" mt-2 w-full h-10 border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700
                focus:bg-white focus:border-slate-600 p-2"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  required={true}
                  value={password}
                  onChange={onChange}
                />
                {showPassword ? (
                  <AiFillEyeInvisible
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-12 text-xl cursor-pointer"
                  />
                ) : (
                  <AiFillEye
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-12 text-xl cursor-pointer"
                  />
                )}
              </div>

              <button
                disabled={loading}
                className="mt-8 w-full bg-black text-white px-7 py-3 text-sm 
          font-medium uppercase rounded shadow-md
        hover:bg-gray-700 transition duration-150 
          ease-in-out hover:shadow-lg active:bg-gray-800"
                type="submit"
              >
                {loading && (
                  <Loader textColor="text-gray-300" loaderColor="fill-black" />
                )}
                {!loading && "Sign Up"}
              </button>

              <div className="mt-4 flex flex-col md:flex-row items-center w-full">
                <div className="flex items-center font-light text-base text-gray-500">
                  Have an account
                  <span
                    className="text-black ml-2 font-medium cursor-pointer"
                    onClick={() => navigate("/signin")}
                  >
                    Sign In
                  </span>
                </div>
                <div
                  className="cursor-pointer md:ml-auto flex items-center font-light text-base text-gray-500"
                  onClick={() => navigate("/forgotpassword")}
                >
                  Forgot Password?
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 lg:block hidden">
          <img src={Login} alt="key" className="w-full rounded-2xl" />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
