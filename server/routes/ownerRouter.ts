import { Router } from "express";
import { createOwnerRestaurant, getOwnerBookings, getOwnerRestaurant, updateOwnerRestaurant, updateBookingStatus } from "../Controllers/ownerController";
import upload from "../config/multer.";
import { ownerOnly, protect } from "../middleware/auth";

const ownerRouter = Router();

ownerRouter.use(protect);
ownerRouter.use(ownerOnly);

ownerRouter.get("/restaurant", getOwnerRestaurant);
ownerRouter.post("/restaurant", upload.single("image"), createOwnerRestaurant);
ownerRouter.put("/restaurant", upload.single("image"), updateOwnerRestaurant);
ownerRouter.get("/bookings", getOwnerBookings),
ownerRouter.put("/bookings/:id/status", updateBookingStatus);

export default ownerRouter;