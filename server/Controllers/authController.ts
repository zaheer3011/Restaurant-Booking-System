import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import {User} from "../models/User";
import { AuthRequest } from "../middleware/auth";

// generating jwt as a string and expires in 30 days
const generateToken = (id : string) => {
    return jwt.sign({id}, process.env.jWT_SECRET as string, {expiresIn : "30d"})
};

// POST api/auth/register
export const registerUser = async (req : Request, res : Response) : Promise<void> => {
  try {

    const { name, email, password, phone, role } = req.body;

    if(!name || !email || !password) {
      res.status(400).json({message : "Please fill al l the required details"})
      return;
    }

    const existingUser = await User.findOne({email});

    if(existingUser) {
      res.status(400).json({message : "User Already exists"})
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password : hashPassword,
      phone, 
      role
    })

    // If user exists
    if(user) {
      res.status(201).json({
        _id : user._id,
        name : user.name,
        email : user.email,
        password : user.password,
        phone : user.phone,
        role : user.role,
        token : generateToken(user._id.toString())
      })
    }

    else {
      res.status(400).json({message : "Invalid user date"})
    }

  } catch (err : any) {

    console.log(err.message);
    
    res.status(400).json({message : err.message})
  } 
};

// POST api/auth/login
export const loginUser = async (req : Request, res : Response) : Promise<void> => {
  try {

    const { email, password } = req.body;

    if(!email || !password) {
      res.status(400).json({message : "Please fill all required details"})
      return;
    }

    const user = await User.findOne({email})

    if(!user) {
      res.send(400).json({message : "Invalid User Details"});
      return;
    }

    if(!user.password) {
      res.status(400).json({message : "Password not found"});
      return;
    }

    // Compare user password 
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      res.status(401).json({message : "Invalid password"});
      return;
    }

    res.json({
      _id : user._id,
      name : user.name,
      email : user.email,
      password : user.password,
      role : user.role,
      token : generateToken(user._id.toString())
    })


  } catch (err : any) {

    console.error(err.message)

    res.status(400).json({message : err.message})
  }
};

// GET api/auth/me
// @acess private

export const getMe = async (req : AuthRequest, res : Response) => {
  try {

    if(!req.user) {

        res.status(401).json({message : "Not authorized"});
        return;
    }

    res.json(req.user);
  }

  catch(err : any) {

    console.error(err.message);

    res.status(400).json({message : err.message})
  }
}

// POST api/auth/logout
export const logoutUser = async (req : Request, res : Response) : Promise<void> => {
  try {
  } catch (err) {}
};
