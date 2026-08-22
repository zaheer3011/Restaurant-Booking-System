import { Router } from "express"
import { protect } from "../middleware/auth";
import { cancelBooking, createBooking, getMyBookings } from "../Controllers/bookingController";

const bookingRouter = Router();

bookingRouter.get("/", protect, getMyBookings);
bookingRouter.post("/my", protect, createBooking);
bookingRouter.put("/:id/cancel", protect, cancelBooking);

export default bookingRouter;