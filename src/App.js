import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import { Home } from "./components/Home";
import Layout from "./components/Layout";
import CookieHome from "./cookies/cookie_home"
import CookieLogin from "./cookies/cookie_login"
import CookieRegister from "./cookies/cookies_register"

function App() {
   return (
      <div>
        <BrowserRouter>
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route index element={<Login />} />
               <Route path="home" element={<Home />} />
               <Route path="/Cookie" element={<CookieHome />} />
               <Route path="/Login" element={<CookieLogin />} />
               <Route path="/Register" element={<CookieRegister />} />
            </Route>
              
         </Routes>
        </BrowserRouter>      
      </div>
   );
}

export default App;
