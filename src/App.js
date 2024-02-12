import React from "react";
import ChatComponent from "./components/ChatComponent";
import NewsComponent from "./components/NewsComponent";
import Login from "./components/Login";

function App() {
   return (
      <div>
        <h2>Login</h2>
        <Login />
         <h2>Chat</h2>
         <ChatComponent />
         <h2>News</h2>
         <NewsComponent />
      </div>
   );
}

export default App;
