import ChatComponent from "./ChatComponent";
import NewsComponent from "./NewsComponent";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Home(props) {
  // const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/logout", {
        withCredentials: true,
      });

      props.userLogged();

      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/verify-token`, {
          withCredentials: true,
        });
        if (data.isAuthenticated) {
          //    setUsername(data.username);
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate]);
  return (
    <div>
      <h2>Chat</h2>
      <ChatComponent />
      <h2>News</h2>
      <NewsComponent />

      <button className="btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
