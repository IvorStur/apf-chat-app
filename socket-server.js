const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
   cors: {
      origin: "http://localhost:3000", // Allow only the React app to connect
      methods: ["GET", "POST"], // Allowed request methods
      credentials: true, // Allow cookies and other credentials to be sent along with the request
   },
});

// Global middleware for authentication and logging
io.use((socket, next) => {
   console.log(`Global connection attempt by socket: ${socket.id}`);
   if (
      socket.handshake.query.token &&
      isValidToken(socket.handshake.query.token)
   ) {
      next();
   } else {
      next(new Error("Authentication error"));
   }
});

// Validate token (placeholder function)
function isValidToken(token) {
   // Implement real token validation logic here
   return true; // Simplified for example purposes
}

// Chat namespace
const chat = io.of("/chat").on("connection", (socket) => {
   console.log("User connected to chat", socket.id);

   // Middleware specific to the chat namespace for additional security or logging
   socket.use((packet, next) => {
      // You can add additional security checks here
      console.log(
         `Received packet in chat namespace from ${socket.id}:`,
         packet
      );
      next();
   });

   // Joining a room
   socket.on("join room", (room) => {
      console.log(`${socket.id} joined room: ${room}`);
      socket.join(room);
      chat.to(room).emit("notification", `${socket.id} joined ${room}`);
   });

   // Leaving a room
   socket.on("leave room", (room) => {
      console.log(`${socket.id} left room: ${room}`);
      socket.leave(room);
      chat.to(room).emit("notification", `${socket.id} left ${room}`);
   });

   // Sending a chat message to a room with event acknowledgment
   socket.on("chat message", (room, msg, ackFn) => {
      chat.to(room).emit("chat message", msg);
      if (typeof ackFn === "function") {
         ackFn(`Delivered message to ${room}`);
      }
   });

   // Handling binary data (e.g., for file transfers)
   socket.on("binary message", (room, data) => {
      // Emit binary data to a room
      chat.to(room).emit("binary message", data);
   });

   // Error handling within the chat namespace
   socket.on("error", (error) => {
      console.error(`Error from ${socket.id} in chat namespace:`, error);
   });
});

// News namespace
const news = io.of("/news").on("connection", (socket) => {
   console.log("User connected to news", socket.id);

   // Subscribe to a news topic
   socket.on("subscribe", (topic, callback) => {
      socket.join(topic);
      console.log(`${socket.id} subscribed to ${topic}`);
      news
         .to(topic)
         .emit("notification", `${socket.id} subscribed to ${topic}`);
      callback(`Subscribed to ${topic}`); // Acknowledge the subscription
   });
   // Unsubscribe from a news topic
   socket.on("unsubscribe", (topic) => {
      socket.leave(topic);
      news
         .to(topic)
         .emit("notification", `${socket.id} unsubscribed from ${topic}`);
   });

   // Publish a new article to a topic
   socket.on("publish article", (topic, article) => {
      news.to(topic).emit("new article", article);
   });

   // Dynamic room creation and deletion could be managed here based on user activity or admin actions

   // Error handling within the news namespace
   socket.on("error", (error) => {
      console.error(`Error from ${socket.id} in news namespace:`, error);
   });
});

// Example topics for news updates
const topics = ["news_updates", "technology", "sports"];

// Simulate sending news updates to each topic every 10 seconds
setInterval(() => {
   topics.forEach((topic) => {
      const newsUpdate = `${topic} update at ${new Date().toLocaleTimeString()}`;
      // Send updates with the topic name included
      news.to(topic).emit("new article", topic, newsUpdate);
      console.log(`Sent: ${newsUpdate}`);
   });
}, 10000);

server.listen(3001, () => {
   console.log("Server running on port 3001");
});
