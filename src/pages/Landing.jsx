import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import Typewriter from "typewriter-effect";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Hero1 from "../assets/images/mockups/phoneExpenses.png";
import AddExpenses from "../assets/images/mockups/phoneAddExpenses.png";
import AddFriend from "../assets/images/mockups/phoneAddFriend.png";
import Balances from "../assets/images/mockups/phoneBalances.png";
import Hero2 from "../assets/images/mockups/phoneSetting.png";
import logo192 from "../assets/images/logo192.png";
import logo from "../assets/images/anshyati-logo-white.png";
import laptopGroup from "../assets/images/mockups/desktopHome.png";
import { useState } from "react";
import { MdCategory, MdGroups } from "react-icons/md";
import { BsCurrencyExchange } from "react-icons/bs";
import { GiExpense } from "react-icons/gi";
import { FaFileCsv } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { contactData } from "../utils/constants";
const featuresData = [
  {
    title: " Organize expenses",
    subTitle:
      " Split expenses with any group: trips, housemates, friends, and family.",
    type: "organizeExpenses",
  },
  {
    title: "Add expenses easily",
    subTitle: "Quickly add expenses on the go before you forget who paid.",
    type: "addExpenses",
  },
  {
    title: "Track balances",
    subTitle: "Keep track of shared expenses, balances, and who owes who.",
    type: "trackBalances",
  },
  {
    title: "Add Friends Easily",
    subTitle: "Scan the QR or share link to any socials",
    type: "addFriend",
  },
];
const Landing = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const [feature, setFeature] = useState("organizeExpenses");
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Anshyati";
  }, []);
  if (checkingStatus) {
    return <Spinner />;
  }
  if (loggedIn) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="overflow-x-hidden outlet">
      <div className=" flex justify-between flex-wrap items-center px-4 py-12 max-w-6xl mx-auto">
        <div className="w-full md:w-[67%] lg:w-[40%] flex flex-col sm:justify-start justify-center sm:text-left text-center m-auto">
          <div className="flex items-center sm:justify-start justify-center mb-2">
            <img
              src={logo}
              className="text-center flex items-center justify-center h-[80px]"
              alt=" Logo"
            />
          </div>
          <div className="lg:text-6xl  md:text-4xl text-3xl font-bold text-black w-full">
            Organize expenses with your
            <span className="text-bluegg">
              <Typewriter
                options={{
                  strings: ["friends", "roommates", "partner", "colleagues"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </div>
          <div className="lg:text-3xl md:text-xl text-lg font-semibold text-gray-500 w-full md:mt-8 mt-4">
            Make sharing expenses simple for travel, activities and daily life.
          </div>
          <div
            onClick={() => navigate("/signin")}
            className="md:mt-8 mt-4 flex sm:mx-0 mx-auto items-center mb-6 w-[200px] justify-center px-7 py-3 bg-bluegg text-white font-medium text-sm uppercase rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Sign In
          </div>
        </div>
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 flex justify-center items-center m-auto">
          <img
            src={Hero1}
            alt="key"
            className="  w-[320px] h-[550px] rotate-[25deg] "
          />
          <img
            src={Hero2}
            alt="key"
            className="  w-[320px] h-[550px] rotate-[25deg]"
          />
        </div>
      </div>
      <div className="md:mt-16 mt-4 bg-bluegg py-8">
        <div className="max-w-6xl mx-auto px-4 py-12 ">
          <div className="lg:text-5xl  md:text-3xl text-2xl text-center font-extrabold text-white w-full flex justify-center">
            A better way to split your bill with
          </div>
          <div className="lg:text-3xl  md:text-2xl text-2xl text-center font-extrabold text-white w-full flex justify-center">
            <Typewriter
              options={{
                strings: ["friends", "roommates", "partner", "colleagues"],
                autoStart: true,
                loop: true,
              }}
            />
          </div>

          <div className="lg:text-2xl md:text-xl text-lg text-center  font-semibold text-white w-full md:mt-8 mt-4 flex justify-center">
            Create Groups,Expenses,Add Friends and Settle
          </div>
          <div className="mt-16 relative">
            <div className="md:w-full md:h-full md:ml-0 ml-[-200px]  w-[500px] h-[400px]">
              <img src={laptopGroup} alt="laptop"></img>
            </div>
            <div className="bg-blue-800  w-auto rounded-bl-none rounded-t-2xl rounded-br-2xl absolute p-4 md:top-[100px] top-0 left-auto  md:right-0 right-[100px] bottom-auto shadow-lg shadow-blue-600 hover:drop-shadow-xl ">
              <div className="md:text-2xl  text-ld font-semibold text-white">
                Simple
              </div>
              <div className="md:block hidden md:text-lg text-xs font-medium text-white">
                Just fill in the costs - and let the app do the <br />
                maths for you.
              </div>
            </div>
            <div className="bg-gray-700 rounded-bl-none  w-auto md:rounded-bl-2xl md:rounded-br-none rounded-t-2xl rounded-br-2xl absolute p-4 md:top-[300px] top-[100px] md:left-0 left-auto  md:right-auto right-[50px] bottom-auto shadow-lg shadow-gray-600 hover:drop-shadow-xl ">
              <div className="md:text-2xl text-lg  font-semibold text-white">
                Transparent
              </div>
              <div className="md:block hidden md:text-lg text-xs font-medium text-white">
                Nothing is hidden. All logged expenses are visible to <br />
                the group, and everyone can <br />
                add their own.
              </div>
            </div>
            <div className="bg-blue-800  w-auto rounded-bl-none rounded-t-2xl rounded-br-2xl absolute p-4 md:top-[450px] top-[200px] left-auto  md:right-0 right-[100px] bottom-auto shadow-lg shadow-blue-600 hover:drop-shadow-xl ">
              <div className="md:text-2xl  text-ld font-semibold text-white">
                Collaborative
              </div>
              <div className="md:block hidden md:text-lg text-xs font-medium text-white">
                Anshyati helps you share your lifestyle and <br />
                brings you closer to friends, family and flatmates.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex md:flex-row flex-col items-center">
          <div className="w-full flex flex-col  items-center justify-start">
            <div className="md:text-4xl text-2xl font-semibold">
              Everything you need to split the bill
            </div>
            <div className="mt-4">
              {featuresData?.map((data, index) => {
                return (
                  <div
                    key={index}
                    className={`${
                      feature === data.type ? "bg-bluegg" : "bg-gray-200 "
                    } rounded-xl p-3 md:mb-8 mb-4 hover:drop-shadow-lg shadow-md`}
                    onClick={() => setFeature(data.type)}
                  >
                    <div
                      className={`${
                        feature === data.type ? "text-white " : "text-bluegg"
                      } text-xl font-semibold`}
                    >
                      {data.title}
                    </div>
                    <div
                      className={`${
                        feature === data.type ? "text-white " : "text-gray-600"
                      } text-md`}
                    >
                      {data.subTitle}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-center">
            {feature === "organizeExpenses" && (
              <div>
                <img
                  src={Hero1}
                  alt="organize expenses"
                  className="w-[650px] h-[700px] transition  ease-linear "
                ></img>
              </div>
            )}
            {feature === "addExpenses" && (
              <div>
                <img
                  src={AddExpenses}
                  alt="organize expenses"
                  className="w-[650px] h-[700px] transition  ease-linear "
                ></img>
              </div>
            )}
            {feature === "trackBalances" && (
              <div>
                <img
                  src={Balances}
                  alt="organize expenses"
                  className="w-[650px] h-[700px] transition  ease-linear "
                ></img>
              </div>
            )}
            {feature === "addFriend" && (
              <div>
                <img
                  src={AddFriend}
                  alt="organize expenses"
                  className="w-[650px] h-[700px] transition  ease-linear "
                ></img>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="md:mt-16 mt-4 bg-bluegg py-8">
        <div className="max-w-6xl mx-auto px-4 py-12 ">
          <div className="md:text-4xl text-3xl font-semibold text-white mt-2 mb-8 text-center ">
            Key Features
          </div>
          <div className="flex md:flex-row flex-col justify-center items-center mx-4 ">
            <div className="flex flex-col items-center justify-center m-2 bg-white shadow-lg hover:drop-shadow-xl rounded-lg p-2 md:w-[320px] ">
              <div className="bg-white shadow-lg hover:drop-shadow-xl p-2 text-2xl text-bluegg rounded-full">
                <MdGroups />
              </div>
              <div className="text-bluegg text-xl font-medium">
                Everyone can add
              </div>
              <div className="text-gray-600 text-lg ">
                Your friends can join via their phones or online to add expenses
                and check their balances.
              </div>
            </div>
            <div className="flex flex-col items-center justify-center m-2 bg-white shadow-lg hover:drop-shadow-xl rounded-lg p-2 md:w-[320px] ">
              <div className="bg-white shadow-lg hover:drop-shadow-xl p-2 text-2xl text-bluegg rounded-full">
                <BsCurrencyExchange />
              </div>
              <div className="text-bluegg text-xl font-medium center">
                Use multiple currencies
              </div>
              <div className="text-gray-600 text-lg text-center">
                Convert every purchase to one currency, no matter where you go,
                for transparency across all your accounts.
              </div>
            </div>
            <div className="flex flex-col items-center justify-center m-2 bg-white shadow-lg hover:drop-shadow-xl rounded-lg p-2 md:w-[320px] ">
              <div className="bg-white shadow-lg hover:drop-shadow-xl p-2 text-2xl text-bluegg rounded-full">
                <GiExpense />
              </div>
              <div className="text-bluegg text-xl font-medium">
                Expense, income, transfer
              </div>
              <div className="text-gray-600 text-lg ">
                You paid or received money for the group? You advanced money to
                your friend? Track it all easily!
              </div>
            </div>
          </div>
          <div className="flex md:flex-row flex-col justify-center items-center mx-4 ">
            <div className="flex flex-col items-center justify-center m-2 bg-white shadow-lg hover:drop-shadow-xl rounded-lg p-2 md:w-[320px] ">
              <div className="bg-white shadow-lg hover:drop-shadow-xl p-2 text-2xl text-bluegg rounded-full">
                <FaFileCsv />
              </div>
              <div className="text-bluegg text-xl font-medium">
                Export your anshyati
              </div>
              <div className="text-gray-600 text-lg ">
                You prefer to print a anshyati or to dig into a deeper analysis?
                Export all expenses into CSV file.
              </div>
            </div>
            <div className="flex flex-col items-center justify-center m-2 bg-white shadow-lg hover:drop-shadow-xl rounded-lg p-2 md:w-[320px] ">
              <div className="bg-white shadow-lg hover:drop-shadow-xl p-2 text-2xl text-bluegg rounded-full">
                <MdCategory />
              </div>
              <div className="text-bluegg text-xl font-medium center">
                Expense categories
              </div>
              <div className="text-gray-600 text-lg text-center">
                Categories can help to see how much you're spending on
                particular items such as rent or groceries.
              </div>
            </div>
            <div className="flex flex-col items-center justify-center m-2 bg-white shadow-lg hover:drop-shadow-xl rounded-lg p-2 md:w-[320px] ">
              <div className="bg-white shadow-lg hover:drop-shadow-xl p-2 text-2xl text-bluegg rounded-full">
                <IoMdPersonAdd />
              </div>
              <div className="text-bluegg text-xl font-medium">Add Friend</div>
              <div className="text-gray-600 text-lg ">
                Use Qr Scanner to scan the qr and get added as friend or share
                the link on socials.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 py-24 px-4 flex flex-col items-center justify-center">
        <div className="md:text-5xl text-3xl text-center font-bold mb-2 ">
          Start your Anshyati Journey
        </div>
        <div className="md:text-3xl text-xl text-center font-semibold mt-2 ">
          It's simple and totally free.
        </div>
        <div
          onClick={() => navigate("/signup")}
          className="md:mt-8 mt-4 flex sm:mx-0 mx-auto items-center mb-6 w-[200px] justify-center px-7 py-3 bg-bluegg text-white font-medium text-sm uppercase rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Sign Up Here
        </div>
      </div>

      <footer className="p-4 bg-bluegg rounded-lg shadow md:px-6 md:py-8 ">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://www.anshyati.harshchandravanshi.live/"
            className="flex items-center mb-4 sm:mb-0"
          >
            <img src={logo192} className="mr-3 w-10 h-10" alt=" Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Anshyati
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm text-white sm:mb-0 ">
            <li>
              <a href="/about" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                className="mr-4 hover:underline md:mr-6 "
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://forms.gle/ajpKaYjKpWix6TNo9"
                target="__blank"
                className="mr-4 hover:underline md:mr-6"
              >
                Feedback
              </a>
            </li>

            <li>
              <a
                href={`mailto:${
                  contactData.DEVELOPER_EMAIL
                }?subject=For Developer Support &body=Time:${new Date()}%0DHi Developer.
              }.%0DQuery:%0DFeedback:%0D`}
                className="hover:underline"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        <span className="block text-sm text-white sm:text-center ">
          © 2022{" "}
          <a
            href="https://www.anshyati.harshchandravanshi.live/"
            className="hover:underline"
          >
            Anshyati™
          </a>
          . All Rights Reserved.
        </span>
        <span className="block text-sm text-white sm:text-center mt-2">
          Developed with ❤ by{" "}
          <a
            href="http://www.harshchandravanshi.live/"
            className="hover:underline text-yellow-300 font-bold text-lg"
          >
            Harsh Chandravanshi
          </a>
        </span>
      </footer>
    </div>
  );
};

export default Landing;
