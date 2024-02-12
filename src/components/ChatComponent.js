// ChatComponent.js
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000/chat", {
   query: { token: "securetoken" },
});

function ChatComponent() {
   const [room, setRoom] = useState("");
   const [message, setMessage] = useState("");
   const [messages, setMessages] = useState([]);
   const fileInputRef = useRef();

   useEffect(() => {
      socket.on("chat message", (msg) => {
         setMessages((msgs) => [...msgs, msg]);
      });

      socket.on("binary message", (data) => {
         // Assume data is an ArrayBuffer; convert it to Blob and create an ObjectURL
         const blob = new Blob([data]);
         const url = URL.createObjectURL(blob);
         setMessages((msgs) => [...msgs, { url }]);
      });

      return () => {
         socket.off("chat message");
         socket.off("binary message");
      };
   }, []);

   const joinRoom = () => {
      if (room) socket.emit("join room", room);
   };

   const leaveRoom = () => {
      if (room) socket.emit("leave room", room);
   };

   const sendMessage = () => {
      if (message) {
         socket.emit("chat message", room, message, (feedback) => {
            console.log(feedback); // Log the acknowledgment from the server
         });
         setMessage("");
      }
   };

   const sendBinaryData = (e) => {
      const file = e.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onload = function (event) {
            socket.emit("binary message", room, event.target.result);
         };
         reader.readAsArrayBuffer(file);
      }
   };

   return (
      <div>
         <input
            type="text"
            placeholder="Room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
         />
         <button onClick={joinRoom}>Join Room</button>
         <button onClick={leaveRoom}>Leave Room</button>
         <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
         />
         <button onClick={sendMessage}>Send Message</button>
         <input type="file" ref={fileInputRef} onChange={sendBinaryData} />
         <ul>
            {messages.map((msg, index) => (
               <li key={index}>
                  {msg.url ? <img src={msg.url} alt="binary" /> : msg}
               </li>
            ))}
         </ul>
      </div>
   );
}

export default ChatComponent;
