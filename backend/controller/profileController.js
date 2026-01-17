
import { User } from "../models/userModel.js";

export const porfileInfo = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    // console.log(JSON.stringify(user));

    return res.status(200).json({
      success: true,
      message: "Now you can get the data...",
      userData: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error in Profile: " + error,
    });
  }
};

export const updatePorfile = async (req, res) => {
  const { getUserDetails, userId } = req.body;

  if (!userId || !getUserDetails) {
    return res.status(400).json({
      success: false,
      message: "UserId or User details is invalied!",
    });
  }

  try {
    const user = await User.findById(userId);

    // Update fields
    Object.assign(user, getUserDetails);
    await user.save();

    return res.status(200).json({
        success: true,
        message: "Profile Update Successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error! "+error,
    });
  }
};

export const uploadProfileImage = async (req, res)=>{
    const imgFilePath = req.file.filename;
    const userId = req.body.userId;

    if(!userId || !imgFilePath){
        return res.status(400).json({
                success: false,
                message: "Missing User Id or File!",
            })
    }
    
    console.log("Hello : ", imgFilePath, userId);
    try {
        const ProImgUrl =  `http://localhost:8000/upload/profileImages/${imgFilePath}`;
        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not exist!",
            })
        }

        user.profilePicUrl = ProImgUrl;
        await user.save();

        return res.status(200).json({
                success: true,
                message: "Profile Picture Upload Successfully!",
            })
    } catch (error) {
        return res.status(500).json({
                success: false,
                message: "Server Error!!"+error,
            })
        
    }
}

export const getProfileData = async (req, res) =>{
  console.log("User Id : ",req.params.id);

  const userId = req.params.id;
  if(!userId){
    return res.status(404).json({
      success: false,
      message: "User Id is Messing"
    })
  }

  try {
    const user =await User.findById(userId);
    if(!user){
      return res.status(404).json({
      success: false,
      message: "User not exist!"
    })
    }

    return res.status(200).json({
      success: false,
      message: "Here is your data",
      userData: user,
    });

  } catch (error) {
    
  }

}