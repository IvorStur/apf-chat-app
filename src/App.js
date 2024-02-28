import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import { Home } from "./components/Home";
import Layout from "./components/Layout";
import CookieHome from "./cookies/cookie_home"
import Register from "./components/Register";

function App() {
   return (
      <div className="min-h-screen bg-pink-200">
        <BrowserRouter>
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route index element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/home" element={<Home />} />
               <Route path="/cookie" element={<CookieHome />} />
               <Route path="/register" element={<Register />} />
            </Route>
              
         </Routes>
        </BrowserRouter>      
      </div>
   );
}

export default App;
