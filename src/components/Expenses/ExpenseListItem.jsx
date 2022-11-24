import React from "react";
import { useNavigate } from "react-router-dom";
import {
  expenseCategoriesColor,
  expenseCategoriesIcon,
} from "../../utils/constants";

const ExpenseListItem = ({ expense, auth }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/dashboard/expenses/info/${expense.id}`)}
      className="border flex overflow-x-auto outlet items-center mt-2 mb-4 rounded-lg md:px-8 px-2 py-2 w-full justify-start bg-white hover:drop-shadow-xl shadow-lg cursor-pointer "
    >
      {/* RENDERING DATE WITH MONTH */}
      <div className=" text-sm text-gray-500 flex items-center justify-center mr-2">
        {new Date(expense.createdAt.seconds * 1000).toLocaleDateString(
          "en-US",
          {
            month: "short",
          }
        )}
        <br />
        {new Date(expense.createdAt.seconds * 1000).getDate()}
      </div>
      <div className="flex sm:flex-row item-center w-full">
        {/* RENDERING CATEGORY ICON */}
        <div
          className="md:ml-2 p-2 text-3xl flex items-center justify-center bg-gray-300"
          style={{
            backgroundColor: expenseCategoriesColor.get(
              expense.expenseCategory
            ),
          }}
        >
          {expenseCategoriesIcon.get(expense.expenseCategory)}
        </div>
        <div className="flex flex-col justify-between ml-2">
          {/* RENDERING EXPENSE NAME */}
          <div className="text-md font-medium">{expense.expenseName}</div>
          {/* RENDERING EXPENSE AMOUNT */}
          <div className="text-xs sm:text-sm text-gray-600">
            {expense.expenseOwner === auth.currentUser.uid
              ? "You"
              : "Group Member"}{" "}
            Paid {expense.expenseCurrency}.
            {expense.expenseAmount < 0
              ? expense.expenseAmount * -1
              : expense.expenseAmount}
          </div>
        </div>
        {/* RENDERING EXPENSE TRANSACTION */}
        <div
          className={`ml-auto  text-sm items-center justify-items-end ${
            expense.expenseOwner === auth.currentUser.uid
              ? "text-green-600"
              : "text-orange-600"
          }`}
        >
          You
          {expense.expenseOwner === auth.currentUser.uid
            ? " lent "
            : " borrowed "}
          <br />
          {expense.expenseCurrency}.
          {expense.expenseSplit.map(
            (split) =>
              split.id === auth.currentUser.uid && (
                <> {split.amount < 0 ? split.amount * -1 : split.amount}</>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseListItem;
