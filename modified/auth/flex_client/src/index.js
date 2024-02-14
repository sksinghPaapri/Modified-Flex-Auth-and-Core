import "bootstrap/dist/css/bootstrap.min.css";
import { CookiesProvider } from "react-cookie";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import ApiService from "./helpers/ApiServices";
import { UserContextProvider } from "./components/states/contexts/UserContext";

ApiService.init();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <UserContextProvider>
        <AppRoutes />
      </UserContextProvider>
    </CookiesProvider>
  </React.StrictMode>
);
