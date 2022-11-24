import React from "react";
import { TiDivide } from "react-icons/ti";
import { Route, Routes } from "react-router-dom";
import AddExpense from "./Expenses/AddExpense";
import GetExpenseInfo from "./Expenses/GetExpenseInfo";
import GetExpenses from "./Expenses/GetExpenses";
import HeaderTitle from "./HeaderTitle";

const Expenses = () => {
  return (
    <div>
      <HeaderTitle title="Expenses" icon={<TiDivide />} />
      <Routes>
        <Route path="/" element={<GetExpenses />} />
        <Route path="/info/:expenseId" element={<GetExpenseInfo />} />
        <Route path="/add/:groupId" element={<AddExpense />} />
      </Routes>
    </div>
  );
};

export default Expenses;
