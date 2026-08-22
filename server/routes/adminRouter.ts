import { Router } from "express";
import { getRestaurant } from "../Controllers/restaurantController";
import { approveRestaurant, getAdminStats } from "../Controllers/adminController";
import { adminOnly, protect } from "../middleware/auth";

const adminRouter = Router()

adminRouter.use(protect);
adminRouter.use(adminOnly)

adminRouter.get('/restaurants', getRestaurant);
adminRouter.get('/restaurants/:id/approve', approveRestaurant),
adminRouter.get('/stats', getAdminStats)

export default adminRouter;