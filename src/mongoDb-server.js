const express = require("express");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const http = require("http");
const { ObjectId } = require("mongodb");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000", // Change to the correct port of your React app
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 3002;

const uri =
  "mongodb+srv://admin:admin@cluster0.ftbeo7u.mongodb.net/?retryWrites=true&w=majority";
const clientOptions = {
  dbName: "apf_users",
  serverApi: { version: "1", },
};

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("userLogin", (data) => {
    // console.log(data);
    const res = run(data).catch(console.dir);
    socket.emit("userLogged", res? true : false)
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

});

const userSchema = new mongoose.Schema({
  id: ObjectId,
  name: String,
  password: String,
});



async function run(data) {
  try {
    await mongoose.connect(uri, clientOptions);
    console.log("Connected to MongoDB!");

    const UserModel = mongoose.model("users", userSchema, "users");

    const result = await UserModel.findOne({
      username: data.username,
      password: data.password,
    }).catch((error) => {
      console.error("Error executing query:", error);
    });

    // console.log(result);
    return result;

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}

// run().catch(console.dir);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
