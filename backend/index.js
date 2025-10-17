import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoute from "../backend/routes/todo.route.js";
import userRoute from "../backend/routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
const PORT = process.env.PORT || 4002;
const DB_URI = process.env.MONGODB_URI;

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ exact frontend origin
    credentials: true,               // ✅ allow cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



app.use("/todo", todoRoute);
app.use("/user", userRoute);

const startServer = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Your app is running on ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  }
};

startServer();
