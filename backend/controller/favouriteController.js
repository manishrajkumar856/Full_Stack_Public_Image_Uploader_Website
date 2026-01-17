
import { response } from "express";
import { User } from "../models/userModel.js";

export const addToFavourite = async (req, res) => {
  const { imgId, userId } = req.body;
  const FavUrl = `http://localhost:8000/api/post/singlepost/${imgId}`;

  if (!imgId || !userId) {
    res.status(400).json({
      success: false,
      message: "Missing Image Id or User Id",
    });
  }

  try {
    const user = await User.findById(userId);

    if (!user.favouriteList.includes(FavUrl)) {
      user.favouriteList.push(FavUrl);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Add to Favourite Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Server Error!" + error,
    });
  }
};

export const removeFromFav = async (req, res)=>{
    console.log(req.body);
    const {postImgUrl, userId} =  req.body;

    if(!postImgUrl || !userId){
        return res.status(400).json({
            success: false,
            message: "Messing postImgUrl or userId"
        })
    }

    try {
        const user = await User.findById(userId);
        console.log("User",user.favouriteList);

        const newfavList = user.favouriteList.filter((item)=>item !== postImgUrl);
        user.favouriteList = newfavList;

        await user.save();

        res.status(200).json({
            success:true,
            message: "Item remove successfully!",
        })
    } catch (error) {
        
    }
}