import express from "express";
import { uploadImage } from "../controller/uploadController.js";
import multer from "multer";
import path from 'path'
import { isAuthencation } from "../middleware/isAuthenticated.js";


const uploadRouter = express.Router();


// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/images/"); // save files in /upload
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

const upload = multer({ storage });




uploadRouter.post('/image', isAuthencation, upload.single("imgFile"), uploadImage);


export default uploadRouter;