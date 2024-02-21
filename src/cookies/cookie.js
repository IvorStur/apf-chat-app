const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;
const JWT_SECRET = "asdagrseytjykiliytfdgfdmg[dfmgfdngogdfzgshfdkgjlkhkofsaSFfgdxf";

const MONGO_URI =
   "mongodb+srv://admin:admin@cluster0.ftbeo7u.mongodb.net/?retryWrites=true&w=majority";

mongoose
   .connect(MONGO_URI, {
      dbName: "apf_users",
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log("MongoDB connected"))
   .catch((err) => console.error("MongoDB connection error:", err));

const UserSchema = new mongoose.Schema({
   username: { type: String, required: true, unique: true },
   password: { type: String, required: true },
});
const User = mongoose.model("User", UserSchema);

app.use(
   cors({
      origin: "http://localhost:3000",
      credentials: true,
   })
);
app.use(express.json());
app.use(cookieParser());

app.post("/register", async (req, res) => {
   try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ username, password: hashedPassword });
      await user.save();

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
         expiresIn: "1d",
      });
      res.cookie("token", token, {
         httpOnly: true,
         sameSite: "strict",
         maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(201).send("User created successfully");
   } catch (error) {
      console.error(error);
      res.status(500).send("Error creating user");
   }
});

app.post("/login", async (req, res) => {
   const { username, password } = req.body;
   const user = await User.findOne({ username });
   if (!user) {
      return res.status(404).send("User not found");
   }

   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) {
      return res.status(400).send("Invalid credentials");
   }

   const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1d",
   });
   res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
   });
   res.send("Login successful");
});

app.get("/verify-token", (req, res) => {
   const token = req.cookies.token;
   if (!token) {
      return res.status(401).json({ message: "No token provided" });
   }

   jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
         return res
            .status(401)
            .json({ message: "Failed to authenticate token" });
      }

      try {
         const user = await User.findById(decoded.userId);
         if (!user) {
            return res.status(404).json({ message: "User not found" });
         }
         res.json({ isAuthenticated: true, username: user.username });
      } catch (error) {
         console.error("Database query failed", error);
         res.status(500).json({ message: "Internal server error" });
      }
   });
});

app.get("/logout", (req, res) => {
   res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
   });
   res.status(200).json({ message: "Logged out successfully" });
});

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
