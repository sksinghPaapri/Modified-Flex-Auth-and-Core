import { React, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/login/Login";
import Accounts from "../pages/accounts/Accounts";
import { UserContext } from "../components/states/contexts/UserContext";
import Logout from "../pages/logout/Logout";
import ForgotPassword from "../pages/authentication/ForgotPassword";
import ResetPassword from "../pages/authentication/ResetPassword";

const AppRoutes = () => {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:id" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
