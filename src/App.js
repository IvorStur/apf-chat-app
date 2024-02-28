import { React, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { Home } from "./components/Home";
import Layout from "./components/Layout";
import CookieHome from "./cookies/cookie_home";
import Register from "./components/Register";

function App() {
  const [logged, setLogged] = useState(false);
  function userLogged() {
    setLogged(!logged);
  }
  return (
    <div className="min-h-screen bg-pink-200">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout userLogged={logged} />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login userLogged={userLogged} />} />
            <Route path="/home" element={<Home userLogged={userLogged} />} />
            <Route path="/cookie" element={<CookieHome />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
