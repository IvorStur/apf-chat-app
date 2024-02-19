import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import { Home } from "./components/Home";
import Layout from "./components/Layout";

function App() {
   return (
      <div>
        <BrowserRouter>
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route index element={<Login />} />
               <Route path="home" element={<Home />} />
            </Route>
              
         </Routes>
        </BrowserRouter>      
      </div>
   );
}

export default App;
