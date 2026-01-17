import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    imgTitle: {type: String, required: true},
    imgCategory: {type: String, default: null},
    imgTags: {type: Array, default: null},
    imgDesc: {type: String, default: null},
    imgFilePath: {type: String, requied: true},
    userId: {type: String, required: true},
    likeCount: {type: Number, default: 0},
    likes: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
        default: [],
    }
}, {timestamps: true})

export const ImageData = mongoose.model("ImageData", imageSchema);