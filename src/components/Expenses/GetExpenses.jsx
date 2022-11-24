import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaMoneyCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import Spinner from "../Spinner";
import ExpenseListItem from "./ExpenseListItem";

const GetExpenses = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    // SETTING THE PAGE TITLE
    document.title = "Expenses";
    // FETCH EXPENSE FUNCTION
    async function fetchExpenses() {
      try {
        setLoading(true);
        const expenseRef = collection(db, "expenses");
        const q = query(
          expenseRef,
          where("expenseMembers", "array-contains", auth.currentUser.uid)
        );
        const expensesData = await getDocs(q);
        setExpenses(
          expensesData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Could not fetch expenses");
      }
    }
    fetchExpenses();
  }, [auth.currentUser.uid, auth.currentUser.displayName]);
  console.log(expenses);

  // RENDERING LOADING SPINNER
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="md:px-16 px-4 mt-8">
      {/* RENDERING IF NO EXPENSES */}
      {expenses.length === 0 && (
        <div className="mt-16 m-auto flex items-center justify-center md:text-2xl text-lg font-medium">
          No expenses found. Create a group and expense in it to get started.
        </div>
      )}
      {/* REDNERING EXPENSES CARD */}
      {expenses.map((expense, index) => (
        <div key={index}>
          <ExpenseListItem expense={expense} auth={auth} />
        </div>
      ))}
      {/* RENDERING ADD GROUP BUTTON */}
      <div
        onClick={() => navigate("/dashboard/groups")}
        className="cursor-pointer border-2 mt-8 w-fit text-lg md:text-xl font-semibold border-gray-300 flex items-center justify-center mx-auto rounded-lg p-2 bg-white shadow-xl hover:drop-shadow-lg"
      >
        <div>
          <FaMoneyCheck />
        </div>
        <div className="ml-2">Add Expenses</div>
      </div>
    </div>
  );
};

export default GetExpenses;
