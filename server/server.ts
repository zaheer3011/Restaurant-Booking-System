import express  from "express";
import connectDB from "./db/mongoose"
import cors from "cors"
import authRouter from "./routes/authRoutes";
import {NextFunction, Request, Response} from "express"
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

app.use("/api/auth", authRouter);

// Allow us to use JSON file
app.use(express.json());

// Connecting a database
connectDB();

// Global Error handler
app.use((err : Error, req : Request, res : Response, next : NextFunction) => {
  console.log("Unhandled Error", err);

  res.status(500).json({
    message : err.message || "Internal Server Error",
    stack : process.env.NODE_ENV === 'production' ? undefined : err.stack
  })
})

app.listen(PORT, () => {
  console.log(`Server is running at PORT No : ${PORT}`);
});
