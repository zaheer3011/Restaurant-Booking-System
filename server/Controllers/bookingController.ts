import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { Restaurant } from "../models/Restaurant"
import { Booking } from "../models/Booking"

// Get logged in user bookings
// GET /api/bookings/my
// @access private

export const getMyBookings = async (req : AuthRequest , res : Response) : Promise <void> => {
    try {

        const bookings = await Booking.find({ user : req.user?._id }).populate("restaurant", "name location image address sing").sort({ date : -1, time : -1});

        res.json(bookings);
    }

    catch(err : any) {

        console.log(err.message);
        res.json({message : err.message})
    }
}

// Create Booking
// POST /api/bookings 
// @access private

export const createBooking = async (req : AuthRequest , res : Response) : Promise <void> => {
    try {

        const {restaurantId, date, time, guests, occasion, specialRequests} = req.body;

        if(!restaurantId || !date || !time || !occasion) {
            res.json({message : "Please fill all required details"});
            return;
        }

        // Check if restaurant exists
        const restaurant = await Restaurant.findById(restaurantId);

        if(!restaurant) {
            res.status(400).json({message : "Restaurant Not Found"});
            return;
        }

        // Check status approved or not
        if(restaurant.status !== 'approved') {
            res.status(400).json({message : "Restaurant are not open for this restaurant yet"});
            return;
        }

        // Verify Seat Availability
        const requestGuests = Number(guests);

        const existingBookings = await Booking.find({
            restaurant : restaurantId,
            date : new Date(date),
            time,
            status : "confirmed"
        })

        const bookedSeats = existingBookings.reduce((sum, b) => sum + b.guests, 0);

        const totalSeats = restaurant.totalSeats || 20;
        const availableSeats = totalSeats - bookedSeats;

        if(requestGuests > availableSeats) {
            res.status(400).json({message : `Unable to reserve. only ${availableSeats} seats are available for this time slot`});
            return;
        }

        const booking = await Booking.create({
            user : req.user?._id,
            restaurant : restaurantId,
            date : new Date(date),
            time,
            guests : Number(guests),
            occasion,
            specialRequests,
            status : "confirmed"
        });

        // Population restaurant into before returning
        const populatedBooking = await booking.populate("restaurant", "name location image address");

        res.status(201).json(populatedBooking);
    }

    catch(err : any) {

        console.log(err.message);
        res.json({message : err.message})
    }
}

// Cancel Booking
// PUT /api/bookings/id:/cancel
// @access private

export const cancelBooking = async (req : AuthRequest, res : Response) : Promise<void> => {

    try {

        const booking = await Booking.findById(req.params.id);

        if(!booking) {

            res.status(404).json({message : "Booking not found"});
            return;
        }

        // Verify user owns the booking
        if(booking.user.toString() !== req.user?._id.toString()) {
            res.status(401).json({message : "Not authorized to cancel this booking"});
            return;
        }

        booking.status = "cancelled";
        await booking.save();

        const populatedBooking = booking.populate("restaurant", "name location image address");
        res.json(populatedBooking);

    }

    catch(err : any) {

        console.error(err.message);
        res.json({message : err.message})
    }
}