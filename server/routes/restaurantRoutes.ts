import { Router } from "express";
import { getRestaurant, getFeaturedRestaurant, getRestaurantBySlug, getRestaurantAvailability } from "../Controllers/restaurantController"

const restaurantRouter = Router();

restaurantRouter.get('/', getRestaurant)
restaurantRouter.get('/featured', getFeaturedRestaurant)
restaurantRouter.get('/:slug', getRestaurantBySlug)
restaurantRouter.get('/:id/availability', getRestaurantAvailability)

export default restaurantRouter;