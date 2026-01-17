import express from "express";
import 'dotenv/config';
import connectDb from "./database/db.js";
import userRouter from "./routes/userRoute.js";
import cors from "cors";  
import profileRouter from "./routes/profileRouter.js";
import uploadRouter from "./routes/uploadRouter.js";
import publicRouter from "./routes/publicRouter.js";
import FavouriteRouter from "./routes/favouriteRouter.js";
import LikeRouter from "./routes/likesRouter.js";

const app = express();

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow all origins 
app.use(cors());


app.use("/api/v1/user", userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/uploads', uploadRouter);
app.use('/api/post/', publicRouter);
app.use('/api/favourites/', FavouriteRouter)
app.use('/api/likes', LikeRouter);


// Serve uploaded files
app.use("/upload", express.static("upload"));


const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server Running at ${PORT} ....`);
    connectDb();
})