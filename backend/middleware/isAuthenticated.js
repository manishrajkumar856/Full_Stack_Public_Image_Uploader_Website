import { User } from "../models/userModel.js";
import jwt from 'jsonwebtoken';

export const isAuthencation = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(400).json({
        success: false,
        message: "Authorization token is missing or invalied",
      });
    }

    const token = authHeader.split(" ")[1];

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "Registration token has expired",
        });
      }

      return res.status(400).json({
        success: false,
        message: "Access token is messing or invalied!",
      });
    }

    const user = await User.findById(decoded.id);

    if(!user) {
      return res.status(400).json({
        success: false,
        message: "User Not found!",
      });
    }

    req.id = user._id;
     next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
