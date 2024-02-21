import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
   const [username, setUsername] = useState("");
   const navigate = useNavigate();
   const handleLogout = async () => {
      try {
         await axios.get("http://localhost:5000/logout", {
            withCredentials: true,
         });
         navigate("/login");
      } catch (error) {
         console.error("Logout failed", error);
      }
   };
   useEffect(() => {
      const verifyToken = async () => {
         try {
            const { data } = await axios.get(
               `http://localhost:5000/verify-token`,
               { withCredentials: true }
            );
            if (data.isAuthenticated) {
               setUsername(data.username);

            } else {
               navigate("/login");
            }
         } catch (error) {
            navigate("/register");
         }
      };

      verifyToken();
   }, [navigate]);

   return (
      <div>
         <div>
            <h1>Welcome Home {username}</h1>
            <button onClick={handleLogout}>Logout</button>
         </div>
      </div>
   );
};

export default Home;
