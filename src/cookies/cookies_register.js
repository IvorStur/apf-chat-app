import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await axios.post(`http://localhost:5000/register`, {
            username,
            password,
         });
         navigate("/login"); // Redirect to login page after successful registration
      } catch (error) {
         console.error("Registration failed", error.response.data);
         alert("User already exist");
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <h2>Register</h2>
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
         <button type="submit">Register</button>
         <button
            style={{ marginLeft: "100px" }}
            onClick={() => navigate("/login")}
         >
            Login
         </button>
      </form>
   );
};

export default Register;
