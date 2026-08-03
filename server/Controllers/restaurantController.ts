import { Request, Response } from "express";

// Get All Restaurant Search and Fields
// GET /api/restaurant
const getRestaurant = async (req : Request , res : Response) : Promise <void> => {

    try {

    }

    catch(err : any) {

        console.error(err.message);
        res.status(400).json({messsage : err.message})
    }

}

// Get All featuredRestaurant
// GET /api/restaurants/featured
const getFeaturedRestaurant = async (req : Request, res : Response) : Promise <void> => {

    try {

    }

    catch(err : any) {

        console.error(err.message);
        res.status(400).json({message : err.message})
    }
}

// Get Single restaurant by slug
// GET /api/restaurant/slug
const getRestaurantBySlug = async (req : Request, res : Response) : Promise <void> => {

    try {

    }

    catch(err : any) {

        console.error(err.message);
        res.status(400).json({message : err.message})
    }
}

// Get dynamic seat availabiliy for slots
// GET /api/restaurant/availability
const getRestaurantAvailability = async (req : Request, res : Response) => {

    try {

    }

    catch(err : any) {

        console.error(err.message);
        res.status(400).json({message : err.message});
    }
}