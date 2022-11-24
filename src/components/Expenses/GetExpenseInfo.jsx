import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import {
  expenseCategoriesColor,
  expenseCategoriesIcon,
} from "../../utils/constants";
import Spinner from "../Spinner";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { HiDownload } from "react-icons/hi";
import DeleteExpense from "./DeleteExpense";

const ExpenseInfoElement = ({ title, value }) => {
  return (
    <div className="flex xs:flex-row flex-col w-full mb-4">
      <div className="flex items-center text-black w-full md:text-xl text-lg font-semibold">
        {title}:
      </div>
      <div className="flex items-center capitalize text-gray-500 w-full ml-auto md:text-lg text-md md:ml-4 font-medium">
        {value}
      </div>
    </div>
  );
};
const GetExpenseInfo = () => {
  const [loading, setLoading] = useState(false);
  const [expenseInfo, setExpenseInfo] = useState({});
  const [expenseMembersInfo, setExpenseMembersInfo] = useState([]);
  const auth = getAuth();
  const params = useParams();
  const navigate = useNavigate();
  const printRef = useRef();
  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };
  useEffect(() => {
    document.title = "Expense Info";
    async function fetchExpenseInfo() {
      try {
        setLoading(true);
        const docRef = doc(db, "expenses", params.expenseId);
        await getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            if (docSnap.data().expenseMembers.includes(auth.currentUser.uid)) {
              setExpenseInfo(docSnap.data());
              setExpenseInfo({ id: docRef.id, ...docSnap.data() });
              const userRef = collection(db, "users");
              const q = query(
                userRef,
                where("userId", "in", docSnap.data().expenseMembers)
              );
              getDocs(q).then((querySnapshot) => {
                const users = [];
                querySnapshot.forEach((doc) => {
                  users.push({
                    userId: doc.data().userId,
                    name: doc.data().name,
                    photoURL: doc.data().photoURL,
                  });
                });
                setExpenseMembersInfo(users);
              });
            } else {
              setLoading(false);
              toast.error("You are not a member of this expense");
              navigate("/dashboard/groups");
              return;
            }
          }
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("Could not fetch expense info");
      }
    }

    fetchExpenseInfo();
  }, [params.expenseId, navigate, auth.currentUser.uid]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="md:px-16 px-4 mt-8">
      <div ref={printRef}>
        <div
          className="flex flex-col border-2  rounded-lg relative"
          style={{
            borderColor: expenseCategoriesColor.get(
              expenseInfo?.expenseCategory
            ),
          }}
        >
          {/* RENDERING COLOR HEADER */}
          <div
            className="md:h-32 h-24  rounded-t-lg flex items-center justify-center"
            style={{
              backgroundColor: expenseCategoriesColor.get(
                expenseInfo?.expenseCategory
              ),
            }}
          ></div>
          {/* RENDERING EXPENSE CATEGORY ICON */}
          <div
            className="flex flex-col  justify-center border-4 border-white items-center absolute md:top-24 top-16 md:ml-20 ml-16 p-4 md:text-3xl text-xl  rounded-lg"
            style={{
              backgroundColor: expenseCategoriesColor.get(
                expenseInfo?.expenseCategory
              ),
            }}
          >
            {expenseCategoriesIcon.get(expenseInfo?.expenseCategory)}
          </div>
          {/* RENDERING DELETE AND DOWNLOAD BUTTON */}
          <div className="flex absolute top-4 left-auto right-2 bottom-auto">
            <div className="flex items-center justify-center bg-white rounded-full p-2 cursor-pointer mr-2">
              <DeleteExpense expenseInfo={expenseInfo} />
            </div>
            <div
              className="flex items-center justify-center bg-white rounded-full p-2 cursor-pointer mr-2"
              onClick={handleDownloadImage}
            >
              <HiDownload />
            </div>
          </div>
          {/* RENDERING EXPENSE INFO */}
          <div className="flex flex-col md:px-8 px-4 py-4 mt-8">
            <ExpenseInfoElement
              title="Expense Amount"
              value={`${expenseInfo?.expenseCurrency}-${expenseInfo?.expenseAmount}`}
            />
            <ExpenseInfoElement
              title="Expense Category"
              value={expenseInfo?.expenseCategory}
            />
            <ExpenseInfoElement
              title="Expense Date"
              value={new Date(
                expenseInfo?.createdAt?.seconds * 1000
              ).toLocaleDateString("en-US")}
            />
            <ExpenseInfoElement
              title="Expense Name"
              value={expenseInfo?.expenseName}
            />
            <ExpenseInfoElement
              title="Expense Type"
              value={expenseInfo?.expenseType}
            />
            {expenseMembersInfo?.length > 0 &&
              expenseMembersInfo?.map(
                (user, index) =>
                  user?.userId === expenseInfo?.expenseOwner && (
                    <ExpenseInfoElement
                      key={index}
                      title="Paid By"
                      value={user.name}
                    />
                  )
              )}

            <div className="flex xs:flex-row flex-col w-full mb-4">
              <div className="flex  text-black w-full md:text-xl text-lg font-semibold">
                Split As:
              </div>
              <div className="flex flex-col  text-gray-500 w-full ml-auto md:text-lg text-md md:ml-4 font-medium">
                {expenseInfo?.expenseSplit?.map((split, index) => (
                  <div key={index} className="flex flex-col mb-1">
                    {expenseMembersInfo?.length > 0 &&
                      expenseMembersInfo?.map(
                        (user, index) =>
                          user?.userId === split?.id && (
                            <div key={index}>
                              {user?.name} -{" "}
                              {user?.userId === expenseInfo.expenseOwner
                                ? Math.abs(
                                    expenseInfo.expenseAmount - split?.amount
                                  )
                                : Math.abs(split?.amount)}
                            </div>
                          )
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* RENDERING PRODUCT VISIBILITY */}
          <div className="mt-1 mb-4 flex items-center justify-center sm:text-lg text-sm text-gray-600">
            Powered by &nbsp;
            <span
              className="text-blue-400 font-semibold cursore-pointer"
              onClick={() => navigate("/")}
            >
              Anshyati
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetExpenseInfo;
