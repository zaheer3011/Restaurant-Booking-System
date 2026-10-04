import { Router } from "express";
import { getMe, loginUser, registerUser } from "../Controllers/authController";
import { protect } from "../middleware/auth";

const authRouter = Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser)
// authRouter.post('/logout', logoutUser),
authRouter.get('/me', protect, getMe);

export default authRouter