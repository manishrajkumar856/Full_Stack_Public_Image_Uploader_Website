import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        Dob: {type: Date},
        profilePicUrl: {type: String, default: ""},
        phoneNo: {type: Number},
        address: {type: String, default: ""},
        city: {type: String, default: ""},
        country: {type: String, default: ""},
        state: {type: String, default: ""},
        pincode: {type: Number},
        occupation: {type: String, default: ""},
        currentQualification: {type: String, default: ""},
        skills: {type: String, default: ""},
        password: {type:String, required: true},
        token: {type: String, default: null},
        isVarified: {type : Boolean, default: false},
        isLoggedIn: {type: Boolean, default: false},
        favouriteList: {type: Array, default: []},
    },
    { timestamps: true },
);

export const User = mongoose.model("User", userSchema);