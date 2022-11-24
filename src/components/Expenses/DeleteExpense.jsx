import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import Spinner from "../Spinner";

const DeleteExpense = ({ expenseInfo }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // DELETE EXPENSE FUNCTION
  async function onDelete() {
    try {
      if (window.confirm("Are you sure you want to delete?")) {
        setLoading(true);
        const docRef = doc(db, "groups", expenseInfo.groupId);
        await getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            const tempMembers = docSnap.data().groupSplit;
            for (let i = 0; i < expenseInfo.expenseSplit.length; i++) {
              if (expenseInfo.expenseSplit[i].id !== expenseInfo.expenseOwner) {
                for (let j = 0; j < tempMembers.length; j++) {
                  if (
                    tempMembers[j].user1 === expenseInfo.expenseOwner &&
                    tempMembers[j].user2 === expenseInfo.expenseSplit[i].id
                  ) {
                    tempMembers[j].user1Value =
                      tempMembers[j].user1Value +
                      expenseInfo.expenseSplit[i].amount;
                    tempMembers[j].user2Value =
                      tempMembers[j].user2Value -
                      expenseInfo.expenseSplit[i].amount;
                  } else if (
                    tempMembers[j].user2 === expenseInfo.expenseOwner &&
                    tempMembers[j].user1 === expenseInfo.expenseSplit[i].id
                  ) {
                    tempMembers[j].user2Value =
                      tempMembers[j].user2Value +
                      expenseInfo.expenseSplit[i].amount;
                    tempMembers[j].user1Value =
                      tempMembers[j].user1Value -
                      expenseInfo.expenseSplit[i].amount;
                  }
                }
              }
            }
            console.log(tempMembers);
            updateDoc(docRef, {
              groupSplit: tempMembers,
              groupTotal: docSnap.data().groupTotal - expenseInfo.expenseAmount,
            });
            deleteDoc(doc(db, "expenses", expenseInfo.id));
            setLoading(false);
            navigate("/dashboard/groups");
            toast.success("Expense deleted successfully");
          }
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Internal Error,Try Again!!!");
    }
  }
  // RENDERING LOADING SPINNER
  if (loading) {
    return <Spinner />;
  }
  return (
    <div onClick={onDelete}>
      {/* RENDERING DELETE ICON */}
      <MdDelete />
    </div>
  );
};

export default DeleteExpense;
