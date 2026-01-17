import express from "express";
import { isAuthencation } from "../middleware/isAuthenticated.js";
import { likePost } from "../controller/likeController.js";

const LikeRouter = express.Router();

LikeRouter.post('/likepost/:id', isAuthencation, likePost)

export default LikeRouter;