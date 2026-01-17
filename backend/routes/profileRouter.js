import express from "express";
import { isAuthencation } from "../middleware/isAuthenticated.js";
import { getProfileData, porfileInfo, updatePorfile, uploadProfileImage } from "../controller/profileController.js";
import multer from "multer";
import path from 'path';

const profileRouter = express.Router();

// Multer Storage 
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "upload/profileImages/");  // save files in /upload
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname)); // Unique Filename
    }
})

const upload = multer({storage});

profileRouter.get('/profileInfo', isAuthencation, porfileInfo);
profileRouter.get('/user_profile/:id', getProfileData);
profileRouter.post('/update_profile', isAuthencation, updatePorfile);
profileRouter.post('/profileImage', isAuthencation, upload.single("profilePicUrl"),   uploadProfileImage);

export default profileRouter;