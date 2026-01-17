import express from "express";
import { isAuthencation } from "../middleware/isAuthenticated.js";
import { addToFavourite, removeFromFav } from "../controller/favouriteController.js";

const FavouriteRouter = express.Router();

FavouriteRouter.post('/fav', isAuthencation, addToFavourite);
FavouriteRouter.post('/remove', isAuthencation, removeFromFav)


export default FavouriteRouter;