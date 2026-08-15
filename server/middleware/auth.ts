import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { IUser, User } from "../models/User";

export interface AuthRequest extends Request {
    user? : IUser;
}

export const protect = async (req : AuthRequest, res : Response, next : NextFunction) : Promise<void> => {

    if(req.headers.authorization && req.headers.authorization.startsWith("bearer")) {

        try {

            // Get token from header
            const token = req.headers.authorization.split(" ")[1];

            // Verfiy token
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id : string};

            // Get user from the token, exclude password
            const user = await User.findById(decoded.id).select("-password");

            if(!user) {
                res.status(401).json({message : "User Not found"});
                return;
            }

            if(!token) {
                res.status(401).json({message : "Not authorized, no token"});
                return;
            }

            req.user = user;
            next()
        }

        catch(err : any) {

            console.error(err.message);

            res.status(401).json({message : err.message})
        }
    }
} 

export const adminOnly = (req : AuthRequest, res : Response, next : NextFunction) : void => {

    if(req.user && req.user.role === "admin") {
        next();
    }

    else {
        res.status(401).json({message : "Access denied, Admin role required"})
    }
}

export const ownerOnly = (req : AuthRequest, res : Response, next : NextFunction) : void => {

    if(req.user && (req.user.role === "admin" || req.user.role === "owner")) {
        next();
    }

    else {
        res.status(401).json({message : "Access Denied, Restaurant Owner role required"});
    }
}