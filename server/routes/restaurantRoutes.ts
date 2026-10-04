import { Router } from "express";
import { getRestaurant, getFeaturedRestaurant, getRestaurantBySlug, getRestaurantAvailability } from "../Controllers/restaurantController"

const restaurantRouter = Router();

restaurantRouter.get('/', getRestaurant)
restaurantRouter.get('/featured', getFeaturedRestaurant)
<<<<<<< HEAD
restaurantRouter.get('/:id/availability', getRestaurantAvailability)
restaurantRouter.get('/:slug', getRestaurantBySlug)
=======
restaurantRouter.get('/:slug', getRestaurantBySlug)
restaurantRouter.get('/:id/availability', getRestaurantAvailability)
>>>>>>> efb1102fa514fb7abed47a80c60ae8150449cb34

export default restaurantRouter;