import express from "express";
import { getAllPost, getSinglePost } from "../controller/publicController.js";

const publicRouter = express.Router();

publicRouter.get('/allpost', getAllPost);
publicRouter.get('/singlepost/:id', getSinglePost);

export default publicRouter;
