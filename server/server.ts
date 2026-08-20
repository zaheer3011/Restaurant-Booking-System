import express  from "express";
import cors from "cors"
import authRouter from "./routes/authRoutes";
import {NextFunction, Request, Response} from "express"
import restaurantRouter from "./routes/restaurantRoutes";
import bookingRouter from "./routes/bookingRoutes";
import { connectDB } from "./config/db"
import ownerRouter from "./routes/ownerRouter";

const app = express();
const PORT = process.env.PORT || 3000;

// Connecting a database
connectDB();

// Middleware
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/restaurant", restaurantRouter);
// app.use("/api/booking", bookingRouter);
app.use('/api/owner', ownerRouter)

// Allow us to use JSON file
app.use(express.json());

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
