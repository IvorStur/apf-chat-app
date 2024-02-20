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
  "mongodb+srv://admin:admin@cluster0.ftbeo7u.mongodb.net/?retryWrites=true&w=majority/apf_users";
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("userLogin", (data) => {
    // console.log(data);
    run(data).catch(console.dir);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("newUser", async (data) => {
    try {
      // Handle the new user data here (e.g., save to MongoDB)
      console.log("New user data:", data);
      // You can emit events back to the client if needed
      // socket.emit("someEvent", someData);
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  });
});

const userSchema = new mongoose.Schema({
  id: ObjectId,
  name: String,
  password: String,
});

const UserModel = mongoose.model("users", userSchema, "users");

async function run(data) {
  try {
    await mongoose.connect(uri, clientOptions);
    // await mongoose.connection.db("apf_users");
    console.log("Connected to MongoDB!");
    // const User = connection.model("user", userSchema);
    console.log(UserModel.collection.collectionName);

    console.log(data);
    const result = await UserModel.findOne({
      username: data.username,
      password: data.password,
    }).catch((error) => {
      console.error("Error executing query:", error);
    });
    console.log(await UserModel.find());

    // const result = await mongoose.connection.db
    //   .collection("apf_users")
    //   .find({ username: data.username, password: data.password });

    console.log(result);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}

// run().catch(console.dir);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
