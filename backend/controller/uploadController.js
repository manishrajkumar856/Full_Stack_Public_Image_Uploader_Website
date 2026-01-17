import { response } from "express";
import { ImageData } from "../models/imagePostModed.js";

export const uploadImage = async (req, res) => {
  try {
    const { imgTitle, imgCategory, imgTags, imgDesc, userId } = req.body;
    const imgFilePath = req.file.filename;


    if (!imgTitle || !imgCategory || !imgTags || !imgDesc || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const imgData = new ImageData({
        imgTitle,
        userId,
        imgTags: imgTags.split(", "),
        imgDesc,
        imgCategory,
        imgFilePath: `/upload/images/${req.file.filename}`,
    })

    // Saving Image Data to database
    await imgData.save();

    res.status(200).json({
        success: true,
        message: "Image Upload Successfully!",
    })

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Body is Empty!: " + error,
    });
  }
};
