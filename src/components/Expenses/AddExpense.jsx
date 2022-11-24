import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { currencyList, expenseTypeList } from "../../utils/constants";
import { db } from "../../firebase";
import { expenseCategories } from "../../utils/constants";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spinner";
import SubTitle from "../SubTitle";

const AddExpense = () => {
  const auth = getAuth();
  const params = useParams();
  const navigate = useNavigate();
  let exactTotalValue = 0;
  const [loading, setLoading] = useState(false);
  const [splitType, setSplitType] = useState("equal");
  const [groupInfo, setGroupInfo] = useState({});
  const [groupMembersInfo, setGroupMembersInfo] = useState([]);
  const [exactExpenseMember, setExactExpenseMember] = useState([]);
  const [formData, setFormData] = useState({
    expenseName: "",
    expenseCategory: "",
    expenseAmount: 100,
    expenseCurrency: "INR",
    expenseType: "Cash",
    expenseOwner: auth.currentUser.uid,
    expenseMembers: [],
    groupId: params.groupId,
  });
  const {
    expenseName,
    expenseCategory,
    expenseAmount,
    expenseCurrency,
    expenseType,
    expenseOwner,
    expenseMembers,
  } = formData;
  function onChange(e) {
    setFormData({
      ...formData,
      [e.target.id]:
        e.target.id === "expenseAmount" ? +e.target.value : e.target.value,
    });
  }
  function onExactChange(e) {
    if (e.target.id === expenseOwner) {
      setExactExpenseMember([
        {
          ...exactExpenseMember,
          [e.target.id]: +e.target.value,
        },
      ]);
    } else {
      setExactExpenseMember([
        {
          ...exactExpenseMember,
          [e.target.id]: -e.target.value,
        },
      ]);
    }
  }
  function handleMultipleSelect(e) {
    let options = e.target.options;
    let values = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    setFormData({
      ...formData,
      expenseMembers: values,
    });
  }
  async function onSubmit(e) {
    e.preventDefault();
    if (
      !expenseName ||
      !expenseCategory ||
      !expenseAmount ||
      !expenseCurrency ||
      !expenseType ||
      !expenseOwner ||
      !expenseMembers
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      if (formData.expenseMembers.length === 0) {
        toast.error("Please select members");
        return;
      }
      if (splitType === "equal") {
        groupMembersInfo.forEach((member) => {
          if (member.userId !== expenseOwner) {
            exactExpenseMember.push({
              id: member.userId,
              amount: -(expenseAmount / formData.expenseMembers.length).toFixed(
                2
              ),
            });
          } else {
            exactExpenseMember.push({
              id: member.userId,
              amount:
                expenseAmount -
                expenseAmount / formData.expenseMembers.length.toFixed(2),
            });
          }
        });
      } else {
        // const value = exactExpenseMember.map((member) => {
        //   exactTotalValue += member[Object.keys(member)[0]];
        //   return exactTotalValue;
        // });

        if (exactTotalValue !== expenseAmount) {
          toast.error("Total amount should be equal to expense amount");
          return;
        }
        const val = exactExpenseMember[expenseOwner];
        setExactExpenseMember({
          ...exactExpenseMember,
          [expenseOwner]: +(expenseAmount - val),
        });
      }
      for (let i = 0; i < groupInfo.groupSplit.length; i++) {
        if (groupInfo.groupSplit[i].user1 === expenseOwner) {
          for (let j = 0; j < exactExpenseMember.length; j++) {
            if (groupInfo.groupSplit[i].user2 === exactExpenseMember[j].id) {
              groupInfo.groupSplit[i].user1Value =
                groupInfo.groupSplit[i].user1Value +
                -1 * exactExpenseMember[j].amount;
              groupInfo.groupSplit[i].user2Value =
                groupInfo.groupSplit[i].user2Value +
                exactExpenseMember[j].amount;
            }
          }
        } else if (groupInfo.groupSplit[i].user2 === expenseOwner) {
          for (let j = 0; j < exactExpenseMember.length; j++) {
            if (groupInfo.groupSplit[i].user1 === exactExpenseMember[j].id) {
              groupInfo.groupSplit[i].user1Value =
                groupInfo.groupSplit[i].user1Value +
                exactExpenseMember[j].amount;
              groupInfo.groupSplit[i].user2Value =
                groupInfo.groupSplit[i].user2Value +
                -1 * exactExpenseMember[j].amount;
            }
          }
        }
      }
      groupInfo.groupTotal = groupInfo.groupTotal + expenseAmount;
      const expenseData = {
        ...formData,
        expenseSplit: exactExpenseMember,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "expenses"), expenseData).then((docRef) => {
        const groupRef = doc(db, "groups", params.groupId);
        updateDoc(groupRef, groupInfo);

        setLoading(false);
        toast.success("Expense added successfully");
        navigate(`/dashboard/expenses/info/${docRef.id}`);
      });
    } catch (error) {
      setLoading(false);
      toast.error("Internal Error,Refresh or Try Again");
      navigate(`/dashboard/groups/info/${params.groupId}`);
    }
  }
  useEffect(() => {
    document.title = "Add Expense";
    // FETCHING GROUP INFO
    async function fetchGroupsInfo() {
      try {
        setLoading(true);
        const docRef = doc(db, "groups", params.groupId);
        await getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            if (docSnap.data().groupMembers.includes(auth.currentUser.uid)) {
              setGroupInfo({ id: docRef.id, ...docSnap.data() });
            } else {
              setLoading(false);
              toast.error("You are not a member of this group");
              navigate("/dashboard/groups");
              return;
            }
          }
          const userRef = collection(db, "users");
          const q = query(
            userRef,
            where("userId", "in", docSnap.data().groupMembers)
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
            setGroupMembersInfo(users);
          });
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Could not fetch group info,Refresh or Try Again");
      }
    }
    // FUNCTION CALL
    fetchGroupsInfo();
  }, [params.groupId, navigate, auth.currentUser.uid]);
  // RENDERING LOADING SPINNER
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="md:px-16 px-4">
      {/* RENDERING TITLE */}
      <SubTitle subTitle="Add Expense" />
      {/* RENDERING ADD EXPENSE FORM */}
      <form
        onSubmit={onSubmit}
        disabled={loading}
        className="flex flex-col w-full m-auto bg-white  rounded-lg 
      overflow-x-auto outlet shadow-lg hover:drop-shadow-xl py-4 px-4  justify-start"
      >
        <div className="flex md:flex-row flex-col w-full">
          {/* NAME INPUT */}
          <div className="flex flex-col w-full md:w-1/2 md:mr-2 ">
            <label className="text-lg font-semibold" htmlFor="expenseName">
              Name
            </label>
            <input
              type="text"
              id="expenseName"
              onChange={onChange}
              required
              value={expenseName}
              placeholder="Expense Name"
              className="w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />
          </div>
          {/* AMOUNT INPUT */}
          <div className="flex flex-col w-full md:w-1/2 md:ml-2">
            <label className="text-lg font-semibold" htmlFor="expenseAmount">
              Amount
            </label>
            <input
              type="number"
              id="expenseAmount"
              onChange={onChange}
              required
              min="10"
              value={expenseAmount}
              placeholder="Expense Amount"
              className="w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />
          </div>
        </div>
        {/* CATEGORY INPUT */}
        <div className="flex md:flex-row flex-col w-full">
          <div className="flex flex-col w-full md:w-1/2 md:mr-2">
            <label className="text-lg font-semibold" htmlFor="expenseCategory">
              Category
            </label>
            <select
              type="text"
              id="expenseCategory"
              onChange={onChange}
              required
              value={expenseCategory}
              className="w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            >
              {expenseCategories?.map((category, index) => (
                <optgroup label={category.title} key={index}>
                  {category?.categories?.map((val, ind) => (
                    <option key={ind} value={val.value}>
                      {val.category}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          {/* CURRENCY INPUT */}
          <div className="flex flex-col w-full md:w-1/2 md:ml-2">
            <label className="text-lg font-semibold" htmlFor="expenseCurrency">
              Currency
            </label>
            <select
              type="text"
              id="expenseCurrency"
              onChange={onChange}
              required
              value={expenseCurrency}
              className="w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            >
              {currencyList?.map((currency, index) => (
                <option key={index} value={currency.currencyCode}>
                  {currency.currencyCode}-{currency.currencyName}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* TYPE INPUT */}
        <div className="flex md:flex-row flex-col w-full ">
          <div className="flex flex-col w-full md:w-1/2 md:mr-2">
            <label className="text-lg font-semibold" htmlFor="expenseType">
              Type
            </label>
            <select
              type="text"
              id="expenseType"
              onChange={onChange}
              required
              value={expenseType}
              className="w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            >
              {expenseTypeList?.map((expenseway, index) => (
                <option key={index} value={expenseway.value}>
                  {expenseway.value}
                </option>
              ))}
            </select>
          </div>
          {/* PAID BY INPUT */}
          <div className="flex flex-col w-full md:w-1/2 md:ml-2">
            <label className="text-lg font-semibold" htmlFor="expenseOwner">
              Paid By
            </label>
            <select
              type="text"
              id="expenseOwner"
              onChange={onChange}
              required
              value={expenseOwner}
              className="w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            >
              {groupMembersInfo?.map((user, index) => (
                <option key={index} value={user.userId}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* SPLIT BETWEEN INPUT */}
        <div className="flex flex-col w-full ">
          <label className="text-lg font-semibold" htmlFor="expenseMembers">
            Split Between <span className="text-xs">(Select using ctrl)</span>
          </label>
          <select
            type="text"
            id="expenseMembers"
            onChange={handleMultipleSelect}
            required
            multiple
            className="w-full h-20 px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
          >
            {groupMembersInfo?.map((member, index) => (
              <option key={index} value={member.userId}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
        {/* NAME INPUT
        <div className="flex flex-col w-full mb-6">
          {formData?.expenseMembers?.length > 0 && (
            <div className="flex flex-col md:flex-row w-full ">
              <div
                onClick={() => {
                  setSplitType("equal");
                  setExactExpenseMember([]);
                }}
                className={`${
                  splitType === "equal" && "bg-green-400"
                } flex flex-col w-full md:w-1/2 md:mr-2 md:mb-0 mb-6  border-2 hover:bg-green-300 border-green-400 bg-white rounded-lg px-4 py-2 text-md md:text-lg`}
              >
                Equally
              </div>
              <div
                onClick={() => {
                  setSplitType("exact");
                  setExactExpenseMember([]);
                }}
                className={`${
                  splitType === "exact" && "bg-orange-400"
                } flex flex-col w-full md:w-1/2 md:ml-2 border-2 hover:bg-orange-300  border-orange-400 bg-white rounded-lg px-4 py-2 text-md md:text-lg`}
              >
                Exact
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col w-full mb-6">
          {splitType === "exact" && (
            <div>
              {groupMembersInfo?.map((member, index) => (
                <div key={index}>
                  <div className="flex md:flex-row flex-col w-full mb-2">
                    <label
                      className="text-md font-medium w-full"
                      htmlFor={member.userId}
                    >
                      {member.name}
                    </label>
                    <input
                      type="number"
                      id={member.userId}
                      onChange={onExactChange}
                      required
                      placeholder="Exact Amount"
                      className="px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div> */}
        <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
