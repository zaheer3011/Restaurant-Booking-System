import { Router } from "express";
import { getRestaurant, getFeaturedRestaurant, getRestaurantBySlug, getRestaurantAvailability } from "../Controllers/restaurantController"

const restaurantRouter = Router();

restaurantRouter.get('/', getRestaurant)
restaurantRouter.get('/featured', getFeaturedRestaurant)
restaurantRouter.get('/:id/availability', getRestaurantAvailability)
restaurantRouter.get('/:slug', getRestaurantBySlug)

export default restaurantRouter;