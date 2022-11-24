import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./pages/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Expenses from "./components/Expenses";
import Friends from "./components/Friends";
import Settings from "./components/Settings";
import AddFriend from "./components/AddFriend";
import Groups from "./components/Groups";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/dashboard/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<Home />} />

            <Route path="expenses/*" element={<Expenses />} />
            <Route path="friends" element={<Friends />} />
            <Route path="settings" element={<Settings />} />
            <Route path="add-friend/:userId" element={<AddFriend />} />
            <Route path="profile" element={<Profile />} />
            <Route path="groups/*" element={<Groups />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Router>
    </>
  );
}

export default App;
