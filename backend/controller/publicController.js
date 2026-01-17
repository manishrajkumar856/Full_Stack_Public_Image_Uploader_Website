import { ImageData } from "../models/imagePostModed.js"

export const getAllPost = async (req, res)=>{

    const {id} = req.params;
    const allPost = await ImageData.find({});

    // console.log(allPost);

    return res.status(200).json({
        allPost,
    });
}

export const getSinglePost = async (req, res) =>{
    // console.log(req.params.id)
    const findPost = await ImageData.findById(req.params.id);
    return res.status(200).json({
        findPost,
    });
}