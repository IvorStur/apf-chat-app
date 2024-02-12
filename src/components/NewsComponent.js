import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// Assuming your server is running on localhost:3001
const socket = io("http://localhost:3001/news", {
   query: { token: "securetoken" },
});

function NewsComponent() {
   const [topic, setTopic] = useState("");
   const [articles, setArticles] = useState({}); // Using an object to store articles by topic

   useEffect(() => {
      socket.on("new article", (receivedTopic, article) => {
         // Update articles state with the new article under the correct topic
         setArticles((prevArticles) => ({
            ...prevArticles,
            [receivedTopic]: [...(prevArticles[receivedTopic] || []), article],
         }));
      });

      return () => {
         socket.off("new article");
      };
   }, []);

   const subscribeToTopic = () => {
      if (topic) {
         socket.emit("subscribe", topic, (response) => {
            console.log(response); // Log server's acknowledgment
            // Initialize the topic in the articles state if not already present
            setArticles((prevArticles) => ({
               ...prevArticles,
               [topic]: prevArticles[topic] || [],
            }));
         });
      }
   };

   const unsubscribeFromTopic = () => {
      if (topic) {
         socket.emit("unsubscribe", topic);
         // Optionally, remove the topic from the articles state
      }
   };

   return (
      <div>
         <input
            type="text"
            placeholder="Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
         />
         <button onClick={subscribeToTopic}>Subscribe</button>
         <button onClick={unsubscribeFromTopic}>Unsubscribe</button>
         <div>
            {Object.keys(articles).map((topic) => (
               <div key={topic}>
                  <h3>{topic}</h3>
                  <ul>
                     {articles[topic].map((article, index) => (
                        <li key={index}>{article}</li>
                     ))}
                  </ul>
               </div>
            ))}
         </div>
      </div>
   );
}

export default NewsComponent;
