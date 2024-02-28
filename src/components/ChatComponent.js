// ChatComponent.js
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001/chat", {
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
         let username = localStorage.getItem("username")
         // setData((msgs) => [{username:[...msgs, {data}]}])

      });

      return () => {
         socket.off("chat message");
         socket.off("binary message");
      };
   }, []);

   const joinRoom = () => {
      
      if (room) {
         
      socket.emit("join room", room);
      
      
      }   
   };

   socket.on("current chat", (msg) => {
      console.log("test")
      setMessages((msgs) => [...msgs, msg]);
   });
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
         <button onClick={joinRoom} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Join Room</button>
         <button onClick={leaveRoom} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Leave Room</button>
         <input
            type="text"
            placeholder="Message"
            value={message}
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setMessage(e.target.value)}
         />
         <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Send Message</button>
         <input type="file" ref={fileInputRef} onChange={sendBinaryData} />
         
            <div >
               <ul >
                  {messages.map((msg, index) => (
                  // {messageData.map((data, index) => (


                     // <li key={index} className="chat-bubble">
                     //    {msg.url ? <img src={msg.url} alt="binary" /> : msg}
                     // </li>
                     
            <div className="flex items-start gap-2.5" key={index} >
               <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                     <span className="text-sm font-semibold text-gray-900 dark:text-white">data</span>
                     <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                  </div>
                  <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{msg.url ? <img src={msg.url} alt="binary" /> : msg}</p>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
               </div>
               {/* <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                     <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                  </svg>
               </button> */}
               {/* <div id="dropdownDots" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                     <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
                     </li>
                     <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</a>
                     </li>
                     <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
                     </li>
                     <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                     </li>
                     <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                     </li>
                  </ul>
               </div> */}
            </div>


                  ))}
               </ul>
            
         </div>
      </div>
   );
}

export default ChatComponent;
