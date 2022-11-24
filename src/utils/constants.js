import {
  MdGroups,
  MdOutlineGroups,
  MdGroup,
  MdOutlineGroup,
  MdOutlineMovie,
  MdSportsSoccer,
  MdOutlineLocalGroceryStore,
  MdOutlineDining,
  MdOutlineLiquor,
  MdOutlineHome,
  MdOutlinePets,
  MdOutlineTrain,
  MdLocalFireDepartment,
  MdOutlineCleaningServices,
} from "react-icons/md";
import { IoMdPaper } from "react-icons/io";
import {
  IoSettingsOutline,
  IoSettings,
  IoMusicalNotesOutline,
  IoHammerOutline,
  IoGiftSharp,
  IoCarSportOutline,
  IoAirplaneOutline,
  IoBulbOutline,
  IoWater,
} from "react-icons/io5";
import { TiDivideOutline, TiDivide } from "react-icons/ti";
import { GrGamepad } from "react-icons/gr";
import { TbHanger, TbSofa } from "react-icons/tb";
import {
  FaBriefcase,
  FaConciergeBell,
  FaFootballBall,
  FaHome,
  FaHotel,
  FaListAlt,
  FaPlane,
  FaPumpSoap,
} from "react-icons/fa";
import { AiOutlineWifi } from "react-icons/ai";
import { BiTaxi } from "react-icons/bi";
import { CiParking1 } from "react-icons/ci";
import {
  GiElectric,
  GiGraduateCap,
  GiPodium,
  GiStethoscope,
} from "react-icons/gi";
import { RiGasStationFill } from "react-icons/ri";
import { BsBicycle, BsCalculator, BsPeopleFill, BsTrash } from "react-icons/bs";

// blue=#1a73e8
// yellow=#fbbc05
// green=#34a853
// redg: "#e04235",
const groupCategoryList = [
  {
    category: "Home",
  },
  {
    category: "Office",
  },
  {
    category: "Couple",
  },
  {
    category: "Trip",
  },
  {
    category: "Sports",
  },
  {
    category: "Other",
  },
];

const expenseCategories = [
  {
    title: "Entertainment",
    categories: [
      {
        category: "Games",
        value: "games",
        icon: <GrGamepad />,
      },
      {
        category: "Movies",
        value: "movies",
        icon: <MdOutlineMovie />,
      },
      {
        category: "Music",
        value: "music",
        icon: <IoMusicalNotesOutline />,
      },
      {
        category: "Sports",
        value: "sports",
        icon: <MdSportsSoccer />,
      },
    ],
  },

  {
    title: "Food And Drink",
    categories: [
      {
        category: "Groceries",
        value: "groceries",
        icon: <MdOutlineLocalGroceryStore />,
      },
      {
        category: "Dining Out",
        value: "dining",
        icon: <MdOutlineDining />,
      },
      {
        category: "Liquor",
        value: "liquor",
        icon: <MdOutlineLiquor />,
      },
    ],
  },
  {
    title: "Home",
    categories: [
      {
        category: "Rent",
        value: "rent",
        icon: <MdOutlineHome />,
      },
      {
        category: "Mortgage",
        value: "mortgage",
        icon: <MdOutlineHome />,
      },
      {
        category: "Household supplies",
        value: "household",
        icon: <FaPumpSoap />,
      },
      {
        category: "Furniture",
        value: "furniture",
        icon: <TbSofa />,
      },
      {
        category: "Maintenance",
        value: "maintenance",
        icon: <IoHammerOutline />,
      },
      {
        category: "Pets",
        value: "pets",
        icon: <MdOutlinePets />,
      },
      {
        category: "Services",
        value: "services",
        icon: <FaConciergeBell />,
      },
      {
        category: "Electronics",
        value: "electronics",
        icon: <GiElectric />,
      },
    ],
  },

  {
    title: "Life",
    categories: [
      {
        category: "Insurance",
        value: "insurance",
        icon: <IoMdPaper />,
      },
      {
        category: "CLothing",
        value: "clothing",
        icon: <TbHanger />,
      },
      {
        category: "Gifts",
        value: "gifts",
        icon: <IoGiftSharp />,
      },
      {
        category: "Medical Expenses",
        value: "medical",
        icon: <GiStethoscope />,
      },
      {
        category: "Taxes",
        value: "taxes",
        icon: <BsCalculator />,
      },
      {
        category: "Education",
        value: "education",
        icon: <GiGraduateCap />,
      },
      {
        category: "Childcare",
        value: "childcare",
        icon: <GiPodium />,
      },
    ],
  },

  {
    title: "Transportation",
    categories: [
      {
        category: "Parking",
        value: "parking",
        icon: <CiParking1 />,
      },
      {
        category: "Car",
        value: "car",
        icon: <IoCarSportOutline />,
      },
      {
        category: "Bus/Train",
        value: "bus",
        icon: <MdOutlineTrain />,
      },
      {
        category: "Gas/Fuel",
        value: "gas",
        icon: <RiGasStationFill />,
      },
      {
        category: "Plane",
        value: "plane",
        icon: <IoAirplaneOutline />,
      },
      {
        category: "Taxi",
        value: "taxi",
        icon: <BiTaxi />,
      },
      {
        category: "Bicycle",
        value: "bicycle",
        icon: <BsBicycle />,
      },
      {
        category: "Hotel",
        value: "hotel",
        icon: <FaHotel />,
      },
    ],
  },
  {
    title: "Utilities",
    categories: [
      {
        category: "Electricity",
        value: "electricity",
        icon: <IoBulbOutline />,
      },
      {
        category: "Heat/gas",
        value: "heat",
        icon: <MdLocalFireDepartment />,
      },
      {
        category: "Water",
        value: "water",
        icon: <IoWater />,
      },
      {
        category: "Tv/Phone/Internet",
        value: "tv",
        icon: <AiOutlineWifi />,
      },
      {
        category: "Trash",
        value: "trash",
        icon: <BsTrash />,
      },
      {
        category: "Cleaning",
        value: "cleaning",
        icon: <MdOutlineCleaningServices />,
      },
    ],
  },
];
var expenseCategoriesIcon = new Map([
  ["games", <GrGamepad />],
  ["movies", <MdOutlineMovie />],
  ["music", <IoMusicalNotesOutline />],
  ["sports", <MdSportsSoccer />],
  ["groceries", <MdOutlineLocalGroceryStore />],
  ["dining", <MdOutlineDining />],
  ["liquor", <MdOutlineLiquor />],
  ["rent", <MdOutlineHome />],
  ["mortgage", <MdOutlineHome />],
  ["household", <FaPumpSoap />],
  ["furniture", <TbSofa />],
  ["maintenance", <IoHammerOutline />],
  ["pets", <MdOutlinePets />],
  ["services", <FaConciergeBell />],
  ["electronics", <GiElectric />],
  ["insurance", <IoMdPaper />],
  ["clothing", <TbHanger />],
  ["gifts", <IoGiftSharp />],
  ["medical", <GiStethoscope />],
  ["taxes", <BsCalculator />],
  ["education", <GiGraduateCap />],
  ["childcare", <GiPodium />],
  ["parking", <CiParking1 />],
  ["car", <IoCarSportOutline />],
  ["bus", <MdOutlineTrain />],
  ["gas", <RiGasStationFill />],
  ["plane", <IoAirplaneOutline />],
  ["taxi", <BiTaxi />],
  ["bicycle", <BsBicycle />],
  ["hotel", <FaHotel />],
  ["electricity", <IoBulbOutline />],
  ["water", <IoWater />],
  ["tv", <AiOutlineWifi />],
  ["trash", <BsTrash />],
  ["cleaning", <MdOutlineCleaningServices />],
]);
var expenseCategoriesColor = new Map([
  ["games", "#CF9FFF"],
  ["movies", "#CF9FFF"],
  ["music", "#CF9FFF"],
  ["sports", "#CF9FFF"],
  ["groceries", "#DAF7A6"],
  ["dining", "#DAF7A6"],
  ["liquor", "#DAF7A6"],
  ["rent", "#90EE90"],
  ["mortgage", "#90EE90"],
  ["household", "#90EE90"],
  ["furniture", "#90EE90"],
  ["maintenance", "#90EE90"],
  ["pets", "#90EE90"],
  ["services", "#90EE90"],
  ["electronics", "#90EE90"],
  ["insurance", "#FFB6C1"],
  ["clothing", "#FFB6C1"],
  ["gifts", "#FFB6C1"],
  ["medical", "#FFB6C1"],
  ["taxes", "#FFB6C1"],
  ["education", "#FFB6C1"],
  ["childcare", "#FFB6C1"],
  ["parking", "#FD9BBF"],
  ["car", "#FD9BBF"],
  ["bus", "#FD9BBF"],
  ["gas", "#FD9BBF"],
  ["plane", "#FD9BBF"],
  ["taxi", "#FD9BBF"],
  ["bicycle", "#FD9BBF"],
  ["hotel", "#FD9BBF"],
  ["electricity", "#8AFEC7"],
  ["water", "#8AFEC7"],
  ["tv", "#8AFEC7"],
  ["trash", "#8AFEC7"],
  ["cleaning", "#8AFEC7"],
]);
const sidebarItems = [
  {
    title: "Groups",
    iconAbled: <MdGroups />,
    iconDisabled: <MdOutlineGroups />,
    link: "/dashboard/groups",
  },
  {
    title: "Expenses",
    iconAbled: <TiDivide />,
    iconDisabled: <TiDivideOutline />,
    link: "/dashboard/expenses",
  },
  {
    title: "Friends",
    iconAbled: <MdGroup />,
    iconDisabled: <MdOutlineGroup />,
    link: "/dashboard/friends",
  },
  {
    title: "Settings",
    iconAbled: <IoSettings />,
    iconDisabled: <IoSettingsOutline />,
    link: "/dashboard/settings",
  },
];
const contactData = {
  DEVELOPER_EMAIL: "harsh0111chandravanshi@gmail.com",
  FEEDBACK_FORM: "https://forms.gle/ajpKaYjKpWix6TNo9",
  HOST: "https://www.anshyati.harshchandravanshi.live/",
};

var groupsCategoryIcon = new Map([
  ["Home", <FaHome />],
  ["Office", <FaBriefcase />],
  ["Couple", <BsPeopleFill />],
  ["Trip", <FaPlane />],
  ["Sports", <FaFootballBall />],
  ["Other", <FaListAlt />],
]);
var groupsColorShade = new Map([
  ["Home", "#1a73e8"],
  ["Office", "#1a73e8"],
  ["Couple", "#fbbc05"],
  ["Trip", "#e04235"],
  ["Sports", "#34a853"],
  ["Other", "#FF8C00"],
]);
const expenseTypeList = [
  {
    value: "Cash",
  },
  {
    value: "UPI",
  },
  {
    value: "Card",
  },
];
const currencyList = [
  {
    currencyCode: "AED",
    currencyName: "United Arab Emirates Dirham",
  },
  {
    currencyCode: "ARS",
    currencyName: "Argentine Peso",
  },
  {
    currencyCode: "AUD",
    currencyName: "Australian Dollar",
  },
  {
    currencyCode: "BDT",
    currencyName: "Bangladeshi Taka",
  },
  {
    currencyCode: "BGN",
    currencyName: "Bulgarian Lev",
  },
  {
    currencyCode: "BHD",
    currencyName: "Bahraini Dinar",
  },
  {
    currencyCode: "BND",
    currencyName: "Brunei Dollar",
  },
  {
    currencyCode: "BOB",
    currencyName: "Bolivian Boliviano",
  },
  {
    currencyCode: "BRL",
    currencyName: "Brazilian Real",
  },
  {
    currencyCode: "BWP",
    currencyName: "Botswanan Pula",
  },
  {
    currencyCode: "BYN",
    currencyName: "Belarusian Ruble",
  },
  {
    currencyCode: "CAD",
    currencyName: "Canadian Dollar",
  },
  {
    currencyCode: "CHF",
    currencyName: "Swiss Franc",
  },
  {
    currencyCode: "CLP",
    currencyName: "Chilean Peso",
  },
  {
    currencyCode: "CNY",
    currencyName: "Chinese Yuan",
  },
  {
    currencyCode: "COP",
    currencyName: "Colombian Peso",
  },
  {
    currencyCode: "CRC",
    currencyName: "Costa Rican Colón",
  },
  {
    currencyCode: "CZK",
    currencyName: "Czech Koruna",
  },
  {
    currencyCode: "DKK",
    currencyName: "Danish Krone",
  },
  {
    currencyCode: "DOP",
    currencyName: "Dominican Peso",
  },
  {
    currencyCode: "DZD",
    currencyName: "Algerian Dinar",
  },
  {
    currencyCode: "EGP",
    currencyName: "Egyptian Pound",
  },
  {
    currencyCode: "EUR",
    currencyName: "Euro",
  },
  {
    currencyCode: "FJD",
    currencyName: "Fijian Dollar",
  },
  {
    currencyCode: "GBP",
    currencyName: "British Pound Sterling",
  },
  {
    currencyCode: "GEL",
    currencyName: "Georgian Lari",
  },
  {
    currencyCode: "GHS",
    currencyName: "Ghanaian Cedi",
  },
  {
    currencyCode: "HKD",
    currencyName: "Hong Kong Dollar",
  },
  {
    currencyCode: "HRK",
    currencyName: "Croatian Kuna",
  },
  {
    currencyCode: "HUF",
    currencyName: "Hungarian Forint",
  },
  {
    currencyCode: "IDR",
    currencyName: "Indonesian Rupiah",
  },
  {
    currencyCode: "ILS",
    currencyName: "Israeli New Sheqel",
  },
  {
    currencyCode: "INR",
    currencyName: "Indian Rupee",
  },
  {
    currencyCode: "IQD",
    currencyName: "Iraqi Dinar",
  },
  {
    currencyCode: "JOD",
    currencyName: "Jordanian Dinar",
  },
  {
    currencyCode: "JPY",
    currencyName: "Japanese Yen",
  },
  {
    currencyCode: "KES",
    currencyName: "Kenyan Shilling",
  },
  {
    currencyCode: "KRW",
    currencyName: "South Korean Won",
  },
  {
    currencyCode: "KWD",
    currencyName: "Kuwaiti Dinar",
  },
  {
    currencyCode: "KZT",
    currencyName: "Kazakhstani Tenge",
  },
  {
    currencyCode: "LBP",
    currencyName: "Lebanese Pound",
  },
  {
    currencyCode: "LKR",
    currencyName: "Sri Lankan Rupee",
  },
  {
    currencyCode: "LTL",
    currencyName: "Lithuanian Litas",
  },
  {
    currencyCode: "MAD",
    currencyName: "Moroccan Dirham",
  },
  {
    currencyCode: "MMK",
    currencyName: "Myanma Kyat",
  },
  {
    currencyCode: "MOP",
    currencyName: "Macanese Pataca",
  },
  {
    currencyCode: "MUR",
    currencyName: "Mauritian Rupee",
  },
  {
    currencyCode: "MXN",
    currencyName: "Mexican Peso",
  },
  {
    currencyCode: "MYR",
    currencyName: "Malaysian Ringgit",
  },
  {
    currencyCode: "NAD",
    currencyName: "Namibian Dollar",
  },
  {
    currencyCode: "NGN",
    currencyName: "Nigerian Naira",
  },
  {
    currencyCode: "NIO",
    currencyName: "Nicaraguan Córdoba",
  },
  {
    currencyCode: "NOK",
    currencyName: "Norwegian Krone",
  },
  {
    currencyCode: "NPR",
    currencyName: "Nepalese Rupee",
  },
  {
    currencyCode: "NZD",
    currencyName: "New Zealand Dollar",
  },
  {
    currencyCode: "OMR",
    currencyName: "Omani Rial",
  },
  {
    currencyCode: "PEN",
    currencyName: "Peruvian Nuevo Sol",
  },
  {
    currencyCode: "PHP",
    currencyName: "Philippine Peso",
  },
  {
    currencyCode: "PKR",
    currencyName: "Pakistani Rupee",
  },
  {
    currencyCode: "PLN",
    currencyName: "Polish Zloty",
  },
  {
    currencyCode: "PYG",
    currencyName: "Paraguayan Guarani",
  },
  {
    currencyCode: "QAR",
    currencyName: "Qatari Rial",
  },
  {
    currencyCode: "RON",
    currencyName: "Romanian Leu",
  },
  {
    currencyCode: "RSD",
    currencyName: "Serbian Dinar",
  },
  {
    currencyCode: "RUB",
    currencyName: "Russian Ruble",
  },
  {
    currencyCode: "SAR",
    currencyName: "Saudi Riyal",
  },
  {
    currencyCode: "SEK",
    currencyName: "Swedish Krona",
  },
  {
    currencyCode: "SGD",
    currencyName: "Singapore Dollar",
  },
  {
    currencyCode: "SVC",
    currencyName: "Salvadoran Colón",
  },
  {
    currencyCode: "THB",
    currencyName: "Thai Baht",
  },
  {
    currencyCode: "TND",
    currencyName: "Tunisian Dinar",
  },
  {
    currencyCode: "TRY",
    currencyName: "Turkish Lira",
  },
  {
    currencyCode: "TWD",
    currencyName: "New Taiwan Dollar",
  },
  {
    currencyCode: "TZS",
    currencyName: "Tanzanian Shilling",
  },
  {
    currencyCode: "UAH",
    currencyName: "Ukrainian Hryvnia",
  },
  {
    currencyCode: "UGX",
    currencyName: "Ugandan Shilling",
  },
  {
    currencyCode: "USD",
    currencyName: "US Dollar",
  },
  {
    currencyCode: "UYU",
    currencyName: "Uruguayan Peso",
  },
  {
    currencyCode: "UZS",
    currencyName: "Uzbekistan Som",
  },
  {
    currencyCode: "VEF",
    currencyName: "Venezuelan Bolívar (2008-2018)",
  },
  {
    currencyCode: "VES",
    currencyName: "Venezuelan Bolívar",
  },
  {
    currencyCode: "VND",
    currencyName: "Vietnamese Dong",
  },
  {
    currencyCode: "XOF",
    currencyName: "CFA Franc BCEAO",
  },
  {
    currencyCode: "ZAR",
    currencyName: "South African Rand",
  },
];
const COLORS = [
  "#1a73e8",
  "#fbbc05",
  "#e04235",
  "#34a853",
  "#FF8C00",
  "#00C49F",
];
const EXPENSECOLORS = [
  "#1a73e8",
  "#fbbc05",
  "#e04235",
  "#34a853",
  "#FF8C00",
  "#00C49F",
  "#5FE5CB",
  "#DACCA0",
  "#282A9B",
  "#E9B8A4",
  "#EE033C",
  "#2DF27A",
  "#5B60D6",
  "#603940",
  "#B56293",
  "#36DB0B",
  "#716036",
  "#2C3541",
  "#998E7C",
  "#32E667",
  "#CD238C",
  "#F56EDB",
  "#B22D02",
  "#303BB7",
  "#44383B",
  "#354DC6",
  "#E72209",
  "#CA0325",
  "#7A1532",
  "#0C732A",
  "#22F756",
  "#10928D",
  "#09C742",
  "#A4C992",
  "#36065D",
];
const monthName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export {
  currencyList,
  expenseTypeList,
  groupCategoryList,
  expenseCategories,
  sidebarItems,
  contactData,
  groupsCategoryIcon,
  groupsColorShade,
  expenseCategoriesIcon,
  expenseCategoriesColor,
  COLORS,
  monthName,
  EXPENSECOLORS,
};
