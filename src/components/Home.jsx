import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaHome, FaMoneyBill } from "react-icons/fa";
import { toast } from "react-toastify";
import { db } from "../firebase";
import HeaderTitle from "./HeaderTitle";
import Spinner from "./Spinner";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { COLORS, EXPENSECOLORS, monthName } from "../utils/constants";

const Home = () => {
  const { widthView } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [groupCategoryMap, setGroupCategoryMap] = useState({
    Home: 0,
    Office: 0,
    Couple: 0,
    Trip: 0,
    Sports: 0,
    Other: 0,
  });
  const [expensesCategoryMap, setExpensesCategoryMap] = useState({
    games: 0,
    movies: 0,
    music: 0,
    sports: 0,
    groceries: 0,
    dining: 0,
    liquor: 0,
    rent: 0,
    mortgage: 0,
    household: 0,
    furniture: 0,
    maintenance: 0,
    pets: 0,
    services: 0,
    electronics: 0,
    insurance: 0,
    clothing: 0,
    gifts: 0,
    medical: 0,
    taxes: 0,
    education: 0,
    childcare: 0,
    parking: 0,
    car: 0,
    bus: 0,
    gas: 0,
    plane: 0,
    taxi: 0,
    bicycle: 0,
    hotel: 0,
    electricity: 0,
    water: 0,
    tv: 0,
    trash: 0,
    cleaning: 0,
  });
  const [groups, setGroups] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [expensePerMonth, setExpensePerMonth] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);
  const [owed, setOwed] = useState(0);
  const [owes, setOwes] = useState(0);
  const auth = getAuth();
  useEffect(() => {
    document.title = "Home";
    // STATSA FUNCTION
    async function fetchHomeStats() {
      try {
        setLoading(true);
        const groupRef = collection(db, "groups");
        const q = query(
          groupRef,
          where("groupMembers", "array-contains", auth.currentUser.uid)
        );
        let sum = 0,
          owesVar = 0,
          owedVar = 0;
        await getDocs(q).then(async (groupsData) => {
          setGroups(
            groupsData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );

          for (let i = 0; i < groupsData.docs.length; i++) {
            sum += groupsData.docs[i].data().groupTotal;
            setGroupCategoryMap((prevState) => ({
              ...prevState,
              [groupsData.docs[i].data().groupCategory]:
                groupCategoryMap[groupsData.docs[i].data().groupCategory] + 1,
            }));

            for (
              let j = 0;
              j < groupsData.docs[i].data().groupSplit.length;
              j++
            ) {
              if (
                groupsData.docs[i].data().groupSplit[j].user1 ===
                auth.currentUser.uid
              ) {
                if (groupsData.docs[i].data().groupSplit[j].user1Value > 0) {
                  owedVar += groupsData.docs[i].data().groupSplit[j].user1Value;
                } else {
                  owesVar +=
                    -1 * groupsData.docs[i].data().groupSplit[j].user1Value;
                }
              } else {
                if (groupsData.docs[i].data().groupSplit[j].user2Value > 0) {
                  owedVar += groupsData.docs[i].data().groupSplit[j].user2Value;
                } else {
                  owesVar +=
                    -1 * groupsData.docs[i].data().groupSplit[j].user2Value;
                }
              }
            }
          }
          const expenseRef = collection(db, "expenses");
          const q = query(
            expenseRef,
            where("expenseMembers", "array-contains", auth.currentUser.uid)
          );
          const expensesData = await getDocs(q);
          setExpenses(
            expensesData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
          const monthMap = new Map([]);
          for (let i = 0; i < expensesData.docs.length; i++) {
            if (
              monthMap.has(
                expensesData.docs[i].data().createdAt.toDate().getMonth()
              )
            ) {
              monthMap.set(
                expensesData.docs[i].data().createdAt.toDate().getMonth(),
                monthMap.get(
                  expensesData.docs[i].data().createdAt.toDate().getMonth()
                ) + 1
              );
            } else {
              monthMap.set(
                expensesData.docs[i].data().createdAt.toDate().getMonth(),
                1
              );
            }
            setExpensesCategoryMap((prevState) => ({
              ...prevState,
              [expensesData.docs[i].data().expenseCategory]:
                expensesCategoryMap[
                  expensesData.docs[i].data().expenseCategory
                ] + 1,
            }));
          }
          monthMap.forEach(function (value, key) {
            expensePerMonth.push({ month: key, count: value });
          });
        });
        setTotalMoney(sum);
        setOwes(owesVar);
        setOwed(owedVar);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Could not fetch data");
      }
    }
    fetchHomeStats();
  }, [auth.currentUser.uid, auth.currentUser.displayName, setGroupCategoryMap]);

  // CHECKING EVERY GROUPS CATEGORY POSSIBILITIES
  // TODO: MAKE IT DYNAMIC
  const groupCategoryData = [];
  if (groupCategoryMap.Home !== 0)
    groupCategoryData.push({ name: "Home", value: groupCategoryMap.Home });
  if (groupCategoryMap.Office !== 0)
    groupCategoryData.push({ name: "Office", value: groupCategoryMap.Office });
  if (groupCategoryMap.Couple !== 0)
    groupCategoryData.push({ name: "Couple", value: groupCategoryMap.Couple });
  if (groupCategoryMap.Trip !== 0)
    groupCategoryData.push({ name: "Trip", value: groupCategoryMap.Trip });
  if (groupCategoryMap.Sports !== 0)
    groupCategoryData.push({ name: "Sports", value: groupCategoryMap.Sports });
  if (groupCategoryMap.Other !== 0)
    groupCategoryData.push({ name: "Others", value: groupCategoryMap.Other });

  const expensesCategoryData = [];
  // CHECKING EVERY EXPENSE CATEGORY POSSIBILITIES
  // TODO: MAKE IT DYNAMIC
  if (expensesCategoryMap.games !== 0)
    expensesCategoryData.push({
      name: "games",
      value: expensesCategoryMap.games,
    });
  if (expensesCategoryMap.movies !== 0)
    expensesCategoryData.push({
      name: "movies",
      value: expensesCategoryMap.movies,
    });
  if (expensesCategoryMap.music !== 0)
    expensesCategoryData.push({
      name: "music",
      value: expensesCategoryMap.music,
    });
  if (expensesCategoryMap.sports !== 0)
    expensesCategoryData.push({
      name: "sports",
      value: expensesCategoryMap.sports,
    });
  if (expensesCategoryMap.groceries !== 0)
    expensesCategoryData.push({
      name: "groceries",
      value: expensesCategoryMap.groceries,
    });
  if (expensesCategoryMap.dining !== 0)
    expensesCategoryData.push({
      name: "dining",
      value: expensesCategoryMap.dining,
    });
  if (expensesCategoryMap.liquor !== 0)
    expensesCategoryData.push({
      name: "liquor",
      value: expensesCategoryMap.liquor,
    });
  if (expensesCategoryMap.rent !== 0)
    expensesCategoryData.push({
      name: "rent",
      value: expensesCategoryMap.rent,
    });
  if (expensesCategoryMap.mortgage !== 0)
    expensesCategoryData.push({
      name: "mortgage",
      value: expensesCategoryMap.mortgage,
    });
  if (expensesCategoryMap.household !== 0)
    expensesCategoryData.push({
      name: "household",
      value: expensesCategoryMap.household,
    });
  if (expensesCategoryMap.furniture !== 0)
    expensesCategoryData.push({
      name: "furniture",
      value: expensesCategoryMap.furniture,
    });
  if (expensesCategoryMap.maintenance !== 0)
    expensesCategoryData.push({
      name: "maintenance",
      value: expensesCategoryMap.maintenance,
    });
  if (expensesCategoryMap.pets !== 0)
    expensesCategoryData.push({
      name: "pets",
      value: expensesCategoryMap.pets,
    });
  if (expensesCategoryMap.services !== 0)
    expensesCategoryData.push({
      name: "services",
      value: expensesCategoryMap.services,
    });
  if (expensesCategoryMap.electronics !== 0)
    expensesCategoryData.push({
      name: "electronics",
      value: expensesCategoryMap.electronics,
    });
  if (expensesCategoryMap.insurance !== 0)
    expensesCategoryData.push({
      name: "insurance",
      value: expensesCategoryMap.insurance,
    });
  if (expensesCategoryMap.clothing !== 0)
    expensesCategoryData.push({
      name: "clothing",
      value: expensesCategoryMap.clothing,
    });
  if (expensesCategoryMap.gifts !== 0)
    expensesCategoryData.push({
      name: "gifts",
      value: expensesCategoryMap.gifts,
    });
  if (expensesCategoryMap.medical !== 0)
    expensesCategoryData.push({
      name: "medical",
      value: expensesCategoryMap.medical,
    });
  if (expensesCategoryMap.taxes !== 0)
    expensesCategoryData.push({
      name: "taxes",
      value: expensesCategoryMap.taxes,
    });
  if (expensesCategoryMap.education !== 0)
    expensesCategoryData.push({
      name: "education",
      value: expensesCategoryMap.education,
    });
  if (expensesCategoryMap.childcare !== 0)
    expensesCategoryData.push({
      name: "childcare",
      value: expensesCategoryMap.childcare,
    });
  if (expensesCategoryMap.parking !== 0)
    expensesCategoryData.push({
      name: "parking",
      value: expensesCategoryMap.parking,
    });
  if (expensesCategoryMap.car !== 0)
    expensesCategoryData.push({ name: "car", value: expensesCategoryMap.car });
  if (expensesCategoryMap.bus !== 0)
    expensesCategoryData.push({ name: "bus", value: expensesCategoryMap.bus });
  if (expensesCategoryMap.gas !== 0)
    expensesCategoryData.push({ name: "gas", value: expensesCategoryMap.gas });
  if (expensesCategoryMap.plane !== 0)
    expensesCategoryData.push({
      name: "plane",
      value: expensesCategoryMap.plane,
    });
  if (expensesCategoryMap.taxi !== 0)
    expensesCategoryData.push({
      name: "taxi",
      value: expensesCategoryMap.taxi,
    });
  if (expensesCategoryMap.bicycle !== 0)
    expensesCategoryData.push({
      name: "bicycle",
      value: expensesCategoryMap.bicycle,
    });
  if (expensesCategoryMap.hotel !== 0)
    expensesCategoryData.push({
      name: "hotel",
      value: expensesCategoryMap.hotel,
    });
  if (expensesCategoryMap.electricity !== 0)
    expensesCategoryData.push({
      name: "electricity",
      value: expensesCategoryMap.electricity,
    });
  if (expensesCategoryMap.water !== 0)
    expensesCategoryData.push({
      name: "water",
      value: expensesCategoryMap.water,
    });
  if (expensesCategoryMap.tv !== 0)
    expensesCategoryData.push({ name: "tv", value: expensesCategoryMap.tv });
  if (expensesCategoryMap.trash !== 0)
    expensesCategoryData.push({
      name: "trash",
      value: expensesCategoryMap.trash,
    });
  if (expensesCategoryMap.cleaning !== 0)
    expensesCategoryData.push({
      name: "cleaning",
      value: expensesCategoryMap.cleaning,
    });
  // STYLES FOR PIE CHARTS
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    text,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${text}-${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  // TOOLTIP FOR MONTHLY EXPENSES CHART
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${monthName[label]} : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };
  // RENDERING THE LOADING SPINNER
  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {/* RENDERING TITLE */}
      <HeaderTitle title="Home" icon={<FaHome />} />

      <div className="md:px-16 px-4">
        {/* RENDERING MONEY STATS */}
        <div className="flex sm:flex-row flex-col mt-8">
          <div className="p-4 flex overflow-x-auto outlet items-center mt-2 mb-4 rounded-lg  w-full justify-center bg-white hover:drop-shadow-xl shadow-lg    text-blue-500">
            <div className="md:text-2xl text-lg">
              <FaMoneyBill />
            </div>
            <div className="md:text-2xl text-lg ml-4">Total {totalMoney}</div>
          </div>
          <div className="p-4 md:ml-2 flex overflow-x-auto outlet items-center mt-2 mb-4 rounded-lg  w-full justify-center bg-white hover:drop-shadow-xl shadow-lg    text-green-500">
            <div className="md:text-2xl text-lg">
              <FaMoneyBill />
            </div>
            <div className="md:text-2xl text-lg ml-4">You are Owed {owed}</div>
          </div>
          <div className="p-4 md:ml-2 flex overflow-x-auto outlet items-center mt-2 mb-4 rounded-lg  w-full justify-center bg-white hover:drop-shadow-xl shadow-lg     text-red-500">
            <div className="md:text-2xl text-lg">
              <FaMoneyBill />
            </div>
            <div className="md:text-2xl text-lg ml-4">You Owe {owes}</div>
          </div>
        </div>
        {/* RENDERING CATEGORY WISE GROUPS STATS */}
        <div className="flex lg:flex-row flex-col  justify-between mt-4 w-full m-auto">
          <div className="md:mr-2 items-center w-full m-auto flex flex-col justify-center bg-white overflow-x-auto md:outlet  border-gray-300 hover:drop-shadow-xl shadow-lg  rounded-lg md:p-4 p-2 mb-4">
            <div className="flex items-center justify-center">
              <div className="md:text-2xl text-xl font-semibold">
                Category wise Groups
              </div>
            </div>
            {groupCategoryData.length > 0 ? (
              <PieChart
                width={
                  widthView >= 1160
                    ? 400
                    : widthView < 1160 && widthView >= 600
                    ? 350
                    : 300
                }
                height={300}
                style={{ margin: "auto" }}
              >
                <Pie
                  data={groupCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={
                    widthView >= 1160
                      ? 120
                      : widthView < 1160 && widthView >= 600
                      ? 90
                      : 80
                  }
                  fill="#8884d8"
                  dataKey="value"
                >
                  {groupCategoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      text={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            ) : (
              <div className="flex items-center justify-center">
                Create Groups to see the data
              </div>
            )}
          </div>
          {/* RENDERING CATEGORY WISE EXPENSES STATS */}
          <div className="md:ml-2 ml-0 w-full m-auto flex flex-col justify-center overflow-x-auto  border-gray-300 hover:drop-shadow-xl shadow-lg bg-white rounded-lg md:p-4 p-2 mb-4">
            <div className="flex items-center justify-center">
              <div className="md:text-2xl text-xl font-semibold">
                Category wise Expenses
              </div>
            </div>
            {expensesCategoryData.length > 0 ? (
              <PieChart
                width={
                  widthView >= 1100
                    ? 400
                    : widthView < 1160 && widthView >= 600
                    ? 350
                    : 300
                }
                height={300}
                style={{ margin: "auto" }}
              >
                <Pie
                  data={expensesCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={
                    widthView >= 1100
                      ? 120
                      : widthView < 1160 && widthView >= 600
                      ? 90
                      : 80
                  }
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expensesCategoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      text={entry.name}
                      fill={EXPENSECOLORS[index % EXPENSECOLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            ) : (
              <div className="flex items-center justify-center">
                Add Expenses to see the data
              </div>
            )}
          </div>
        </div>
        {/* RENDERING MONTHLY EXPENSES STATS */}
        <div className=" w-full m-auto flex flex-col justify-center overflow-x-auto  border-gray-300 hover:drop-shadow-xl shadow-lg  rounded-lg  bg-white md:p-4 p-2 mb-4">
          <div className="flex items-center justify-center">
            <div className="md:text-2xl text-xl font-semibold mb-4 ">
              Monthly Expenses
            </div>
          </div>
          {expensesCategoryData.length > 0 ? (
            <BarChart
              width={500}
              height={300}
              data={expensePerMonth}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              style={{ margin: "auto" }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis dataKey="count" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="count" barSize={20} fill="#1a73e8" />
            </BarChart>
          ) : (
            <div className="flex items-center justify-center">
              Add Expenses to see the data
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
