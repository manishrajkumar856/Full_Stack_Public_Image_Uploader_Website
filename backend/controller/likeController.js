import { ImageData } from "../models/imagePostModed.js";

export const likePost = async (req, res)=>{
    console.log(req.body, req.params.id);
    const imgId = req.params.id;
    const userId = req.body.userId;

    if(!imgId || !userId){
        return res.status(400).json({
            success: false,
            message: "Image Id or User Id is messing!"
        })
    }

    try {
        const imgPostData = await ImageData.findById(imgId);
        console.log(imgPostData);

        if(!imgPostData){
            return res.status(400).json({
            success: false,
            message: "Image Data Doesn't exist"
        })
        }

        if(imgPostData.likes.includes(userId)){
            console.log("already Exist");
            imgPostData.likeCount = imgPostData.likeCount - 1;
            imgPostData.likes = imgPostData.likes.filter((item)=> item.toString() != userId);
            console.log("Filter :", imgPostData);
            await imgPostData.save();
            return res.status(200).json({
                success: true,
                message: "Unlike Successfully!"
            })
        }
        else{
            console.log("Not already Exist");
            imgPostData.likeCount = imgPostData.likeCount + 1;
            imgPostData.likes.push(userId);
            await imgPostData.save();
            return res.status(200).json({
                success: true,
                message: "Like Successfully!"
            })
        }


        
    } catch (error) {
        console.log(error);
    }
}