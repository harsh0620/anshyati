import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { FaListAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { groupsCategoryIcon, groupsColorShade } from "../../utils/constants";
import ExpenseListItem from "../Expenses/ExpenseListItem";
import { IoSettings } from "react-icons/io5";
import { ExportJsonCsv } from "react-export-json-csv";
import Spinner from "../Spinner";
import Totals from "./Totals";
import Settle from "./Settle";

const GetGroupsInfo = () => {
  const auth = getAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [groupInfo, setGroupInfo] = useState({});
  const [showInfo, setShowInfo] = useState("expenses");
  const [headers] = useState([
    {
      key: "createdAt",
      name: "Date",
    },
    {
      key: "expenseAmount",
      name: "Amount",
    },
    {
      key: "expenseCategory",
      name: "Category",
    },
    {
      key: "expenseCurrency",
      name: "Currency",
    },
    {
      key: "expenseName",
      name: "Name",
    },
    {
      key: "expenseType",
      name: "Type",
    },
  ]);

  useEffect(() => {
    document.title = "Group Info";
    // GETTING THE GROUP INFO
    async function fetchGroupsInfo() {
      try {
        setLoading(true);
        const docRef = doc(db, "groups", params.groupId);
        await getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            if (docSnap.data().groupMembers.includes(auth.currentUser.uid)) {
              setGroupInfo(docSnap.data());
              setGroupInfo({ id: docRef.id, ...docSnap.data() });
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
        console.log(error);
        toast.error("Could not fetch group info, please try again later");
      }
    }
    // GETTING THE EXPENSES OF THE GROUP
    async function getGroupsExpenses() {
      try {
        const expenseRef = collection(db, "expenses");
        const q = query(
          expenseRef,
          where("expenseMembers", "array-contains", auth.currentUser.uid)
        );
        await getDocs(q).then((expensesDatas) => {
          for (let i = 0; i < expensesDatas.docs.length; i++) {
            if (expensesDatas.docs[i].data().groupId === params.groupId) {
              const newData = expensesDatas.docs[i].data();
              newData.id = expensesDatas.docs[i].id;
              setExpenses((expenses) => [...expenses, newData]);
            }
          }
        });

        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch expenses, please try again later");
      }
    }
    // CALLING THE FUNCTIONS
    fetchGroupsInfo();
    getGroupsExpenses();
  }, [params.groupId, navigate, auth.currentUser.uid]);

  // RENDERING THE LOADING SPINNER
  if (loading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <div
      className={`relative   pb-10 overflow-x-auto outlet ${
        !groupInfo && "animate-pulse"
      }`}
    >
      {/* RENDERING THE GROUP INFO HEADER */}
      <div
        className={`min-h-[80px] md:min-h-[120px]   ${
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
      ></div>
      {/* RENDERING THE GROUP CATEGORY ICON */}
      <div
        className={`md:text-5xl text-3xl top-12 md:top-16 bottom-auto right-auto left-12 md:left-16 flex items-center absolute justify-center border-4 border-white rounded-md p-4 w-16 h-16 md:w-24 md:h-24 ${
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
      {/* RENDERING THE GROUP SETTINGS BUTTON */}
      <div
        onClick={() => navigate(`/dashboard/groups/settings/${params.groupId}`)}
        className="absolute top-4 right-4 left-auto bottom-auto flex items-center justify-center bg-white rounded-full p-2 cursor-pointer mr-2"
      >
        <IoSettings />
      </div>
      {/* RENDERING THE GROUP NAME */}
      <div className="md:text-2xl text-lg font-bold ml-12 mt-12 md:ml-16">
        {groupInfo.groupName}
      </div>
      {/* RENDERING THE GROUP INFO OPTIONS TAB */}
      <div className="overflow-x-auto mt-5 md:px-16 px-4 text-sm md:text-lg font-medium outlet flex  items-center ">
        {/* EXPENSES TAB */}
        <div
          onClick={() => setShowInfo("expenses")}
          style={{
            backgroundColor:
              showInfo === "expenses"
                ? groupsColorShade.get(groupInfo.groupCategory)
                : "white",
          }}
          className={` flex m-1  cursor-pointer items-center justify-center border-2 border-gray-300 rounded-md w-full p-2`}
        >
          Expenses
        </div>
        {/* SETTLE TAB */}
        <div
          style={{
            backgroundColor:
              showInfo === "settle"
                ? groupsColorShade.get(groupInfo.groupCategory)
                : "white",
          }}
          onClick={() => setShowInfo("settle")}
          className={` flex m-1  cursor-pointer items-center justify-center border-2 border-gray-300 rounded-md w-full p-2`}
        >
          Settle
        </div>
        {/* TOTALS TAB */}
        <div
          style={{
            backgroundColor:
              showInfo === "totals"
                ? groupsColorShade.get(groupInfo.groupCategory)
                : "white",
          }}
          onClick={() => setShowInfo("totals")}
          className={` flex m-1  cursor-pointer items-center justify-center border-2 border-gray-300 rounded-md w-full p-2`}
        >
          Totals
        </div>
        {/* EXPORT TAB */}
        <div
          style={{
            backgroundColor:
              showInfo === "export"
                ? groupsColorShade.get(groupInfo.groupCategory)
                : "white",
          }}
          className={` flex m-1  cursor-pointer items-center justify-center border-2 border-gray-300 rounded-md w-full p-2`}
        >
          <ExportJsonCsv headers={headers} items={expenses}>
            Export
          </ExportJsonCsv>
        </div>
      </div>
      {/* RENDERING THE GROUP'S EXPENSES CARDS */}
      {showInfo === "expenses" && (
        <div className="flex flex-col items-center justify-center mt-5 w-full md:px-16 px-4">
          {expenses?.map((expense, index) => (
            <ExpenseListItem key={index} expense={expense} auth={auth} />
          ))}
        </div>
      )}
      {/* RENDERING THE GROUP'S SETTLE CARDS */}
      {showInfo === "settle" && <Settle />}
      {/* RENDERING THE GROUP'S TOTALS  */}
      {showInfo === "totals" && <Totals groupTotal={groupInfo.groupTotal} />}

      {/* RENDERING THE ADD EXPENSE BUTTON */}
      <div
        onClick={() => navigate(`/dashboard/expenses/add/${params.groupId}`)}
        className="w-fit fixed md:bottom-12 bottom-20 cursor-pointer top-auto left-auto md:right-16 right-4 flex items-center justify-center px-3 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        <FaListAlt /> <span className="ml-2">Add Expense</span>
      </div>
    </div>
  );
};

export default GetGroupsInfo;
