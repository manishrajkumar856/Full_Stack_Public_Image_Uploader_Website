import express from "express";
import { loginUser, logoutUser, registerUser } from "../controller/userController.js";
import { isAuthencation } from "../middleware/isAuthenticated.js";

const userRouter = express.Router();


userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', isAuthencation, logoutUser)

export default userRouter;