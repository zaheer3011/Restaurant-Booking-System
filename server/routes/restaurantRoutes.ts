import { Router } from "express";
import { getRestaurant, getFeaturedRestaurants, getRestaurantBySlug, getRestaurantAvailability } from "../Controllers/restaurantController"

const restaurantRouter = Router();

restaurantRouter.get('/', getRestaurant)
restaurantRouter.get('/featured', getFeaturedRestaurants)
restaurantRouter.get('/:slug', getRestaurantBySlug)
restaurantRouter.get('/:id/availability', getRestaurantAvailability)

export default restaurantRouter;