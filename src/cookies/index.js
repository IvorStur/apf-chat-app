import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import CookieHome from "./cookie_home";
import Switcher from "./switcher";
import Form from "./form";
import Login from "./Login";
import CookieLogin from "./cookie_login";
import CookieRegister from "./cookies_register";
import Dashboard from "./dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Axios_example from "./axios_example";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <Router>
         <Routes>
            <Route path="/" element={<CookieHome />} />
            <Route path="/Login" element={<CookieLogin />} />
            <Route path="/Register" element={<CookieRegister />} />
         </Routes>
      </Router>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
