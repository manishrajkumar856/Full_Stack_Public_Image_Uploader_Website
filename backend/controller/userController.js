import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { Session } from "../models/sessonModel.js";

// For register new User
export const registerUser = async (req, res) => {
  try {
    // console.log(req.body);
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    console.log()

    if(password !== confirmPassword){
      return res.status(400).json({
        success: false,
        message: "Please enter same password!"
      })
    }

    // Check required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // Check user exist or not
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    // Bcrypt Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    //  Save user to database
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User register successfully!",
    });


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! : ${error}`,
    });
  }
};

// For login
export const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    // Check All fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required !",
      });
    }
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Please! create your account first",
      });
    }

    // Bcrypt password & Check for password
    const isMatched = await bcrypt.compare(password, existingUser.password);
    console.log(isMatched);

    if (isMatched) {


      // Generate Access token and refersh token
      const accessToken = jwt.sign({id: existingUser._id}, process.env.SECRET_KEY, {expiresIn: '1d'});
      const refershToken = jwt.sign({id: existingUser._id}, process.env.SECRET_KEY, {expiresIn: '5d'});

      // Update user
      existingUser.isLoggedIn = true;
      await existingUser.save();


      // Find Session is already exist or not and delete it
      const existingSession = await Session.findOne({userId: existingUser._id});
      if(existingSession){
        console.log(existingSession);
        await Session.findOne({userId: existingUser._id});
      }

      // Create a new Session
      await Session.create({userId: existingUser._id})

      // Return to the server
      return res.status(202).json({
        success: true,
        message: "Thankyou! for visiting our website",
        user: existingUser,
        accessToken: accessToken,
        refershToken: refershToken,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Please enter password correctly!",
      });
    }
    // console.log(user);
  } catch (error) {
  console.error(error);
  return res.status(500).json({
    success: false,
    message: "Server error, please try again later",
  });
}

};

// For Logout
export const logoutUser = async (req, res)=>{
  try {
    const userId = req.id;
    await Session.deleteMany({userId: userId});
    await User.findByIdAndUpdate(userId, {isLoggedIn : false});

    res.status(200).json({
      success: true,
      message: "User Logged Out Successfully!"
    })
    
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Error! : "+error.message,
    })
    
  }
}