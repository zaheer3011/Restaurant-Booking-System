import express from "express";
import "dotenv/config"
import cors from "cors"
import authRouter from "./routes/authRoutes";
import {NextFunction, Request, Response} from "express"
import restaurantRouter from "./routes/restaurantRoutes";
import bookingRouter from "./routes/bookingRoutes";
import { connectDB } from "./config/db"
import ownerRouter from "./routes/ownerRouter";
import adminRouter from "./routes/adminRouter";

const app = express();
const PORT = process.env.PORT || 3000;

// Connecting a database
connectDB();

// Middleware
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/booking", bookingRouter);
app.use('/api/owner', ownerRouter)
app.use('/api/admin', adminRouter)

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

app.get('/', (req, res) => {
  res.send('<h4>Server is LIve</h4>')
})

app.listen(PORT, () => {
  console.log(`Server is running at PORT No : ${PORT}`);
});
