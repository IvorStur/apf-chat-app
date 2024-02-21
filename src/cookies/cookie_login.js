import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await axios.post(
            `http://localhost:5000/login`,
            { username, password },
            { withCredentials: true }
         );
         navigate("/");
         
      } catch (error) {
         console.error("Login failed", error.response.data);
         alert("Wrong password");
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <h2>Login</h2>
         <div>
            <label>Username</label>
            <input
               type="text"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               required
            />
         </div>
         <div>
            <label>Password</label>
            <input
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
            />
         </div>
         <button type="submit">Login</button>
         <button
            style={{ marginLeft: "100px" }}
            onClick={() => navigate("/register")}
         >
            Register
         </button>
      </form>
   );
};

export default Login;
